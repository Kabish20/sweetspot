import logging
import re
from django.core.mail import send_mail
from .models import *
from .serializers import *
from django.db import transaction
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.decorators import action 
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema  
from datetime import datetime
from django.shortcuts import get_object_or_404, redirect
from .utils import get_distance_and_duration


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    @action(detail=False, methods=['post'])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            # Check if the customer exists
            customer = Customer.objects.get(email=email)
            if customer.password == password:  # Check password (consider using hashing in production)
                return Response({"message": "Login Successful"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)
        except Customer.DoesNotExist:
            return Response({"message": "Customer does not exist"}, status=status.HTTP_404_NOT_FOUND)


class CakeViewSet(viewsets.ModelViewSet):
    queryset = Cake.objects.all()
    serializer_class = CakeSerializer


class CakeCustomizationViewSet(viewsets.ModelViewSet):
    queryset = CakeCustomization.objects.all()
    serializer_class = CakeCustomizationSerializer


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def create(self, request, *args, **kwargs):
        customer_id = request.data.get('customer')
        
        # Check if customer already has an active cart
        existing_cart = Cart.objects.filter(
            customer_id=customer_id, 
            is_active=True
        ).first()
        
        if existing_cart:
            return Response(
                CartSerializer(existing_cart).data,
                status=status.HTTP_200_OK
            )

        # If no active cart exists, create a new one
        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        try:
            cart = self.get_object()
            
            # Check if cart is active
            if not cart.is_active:
                return Response(
                    {'error': 'This cart is no longer active'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            cake_id = request.data.get('cake_id')
            quantity = request.data.get('quantity', 1)
            customization_data = request.data.get('customization')

            # Get the cake
            cake = get_object_or_404(Cake, id=cake_id)
            
            # Check if cake is available
            if not cake.available:
                return Response(
                    {'error': 'This cake is not available'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create customization if provided
            customization = None
            if customization_data:
                customization = CakeCustomization.objects.create(
                    cake=cake,
                    customer=cart.customer,
                    **customization_data
                )

            # Create or update cart item
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                cake=cake,
                defaults={
                    'quantity': quantity,
                    'customization': customization
                }
            )

            if not created:
                cart_item.quantity += quantity
                cart_item.save()

            return Response(
                CartSerializer(cart).data,
                status=status.HTTP_200_OK
            )

        except Cart.DoesNotExist:
            return Response(
                {'error': 'Cart not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
class AddToCartView(APIView):
    def post(self, request, *args, **kwargs):
        # Your logic to add an item to the cart
        return Response({'message': 'Item added to cart'}, status=status.HTTP_201_CREATED)

    # If you want to support GET for some reason, add a get method
    def get(self, request, *args, **kwargs):
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


    
def validate_card_details(card_number, expiration_date, cvv):
    # Luhn algorithm for card number validation
    def luhn_checksum(card_num):
        def digits_of(n):
            return [int(d) for d in str(n)]
        digits = digits_of(card_num)
        odd_digits = digits[-1::-2]
        even_digits = digits[-2::-2]
        checksum = sum(odd_digits)
        for d in even_digits:
            checksum += sum(digits_of(d * 2))
        return checksum % 10

    # Check if card number passes Luhn algorithm
    if luhn_checksum(card_number) != 0:
        return False, "Invalid card number"

    # Expiry date format MM/YY and should be valid in the future
    if not re.match(r"(0[1-9]|1[0-2])/[0-9]{2}", expiration_date):
        return False, "Invalid expiration date format. Expected MM/YY."

    # Expiration date should not be in the past
    exp_month, exp_year = expiration_date.split('/')
    current_year = datetime.now().year % 100  # last two digits of current year
    current_month = datetime.now().month

    if int(exp_year) < current_year or (int(exp_year) == current_year and int(exp_month) < current_month):
        return False, "Card expiration date is invalid or expired."

    # CVV should be 3 or 4 digits
    if not re.match(r"^[0-9]{3}$", cvv):
        return False, "Invalid CVV."

    return True, None
# Order CRUD operations
logger = logging.getLogger('sweetspot_app')

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class PlaceOrderView(APIView):
    def post(self, request, *args, **kwargs):
        cart_id = request.data.get("cart_id")
        cake_ids = request.data.get("cake_ids", [])

        # Fetch cart and validate
        try:
            cart = Cart.objects.get(id=cart_id)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if all requested cakes are in the cart
        cart_items = CartItem.objects.filter(cart=cart, cake__id__in=cake_ids)
        if len(cart_items) != len(cake_ids):
            return Response({"error": "Some cakes are not in the cart or unavailable."}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate total price
        total_price = sum(item.total_price for item in cart_items)

        # Create the order
        order = Order.objects.create(cart=cart, total_price=total_price)

        # Serialize and return the created order
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)    

class UpdateOrderView(APIView):
    def patch(self, request, order_id, *args, **kwargs):
        # Find the existing order
        try:
            order = Order.objects.get(order_id=order_id)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

       # Partially update the order using the serializer
        serializer = OrderUpdateSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            updated_order = serializer.save()  # Save updated fields
            
            # Check if payment status is completed and send an email
            if 'payment_status' in request.data and request.data['payment_status'] == 'Completed':
                # Assuming you have a customer_email field in your Order model or a way to get it
                customer_email = order.cart.customer.email  # Adjust as needed to get the customer's email
                send_order_confirmation_email(customer_email, updated_order.order_id)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['post'])
    def place_order(self, request):
        # Step 1: Retrieve data from the request
        customer_id = request.data.get('customer_id')
        cake_id = request.data.get('cake_id')

        # Step 2: Validate the customer
        try:
            customer = Customer.objects.get(id=customer_id)
        except Customer.DoesNotExist:
            return Response({"message": "Customer does not exist"}, status=status.HTTP_404_NOT_FOUND)

        # Step 3: Validate the cake
        try:
            cake = Cake.objects.get(id=cake_id)
            if not cake.available:
                return Response({"message": "Cake is not available for ordering"}, status=status.HTTP_400_BAD_REQUEST)
        except Cake.DoesNotExist:
            return Response({"message": "Cake does not exist"}, status=status.HTTP_404_NOT_FOUND)

        # Step 4: Check if the cake is present in the customer's cart
        try:
            cart = Cart.objects.get(customer=customer)
            if cake not in cart.cake.all():
                return Response({"message": "Cake is not in the cart"}, status=status.HTTP_400_BAD_REQUEST)
        except Cart.DoesNotExist:
            return Response({"message": "Cart does not exist for the customer"}, status=status.HTTP_404_NOT_FOUND)

        # Step 5: Create an order
        order = Order.objects.create(
            customer=customer,
            total_price=cart.total_amount,
            order_date=timezone.now(),
            delivery_address=customer.address,
            order_status="Pending",
            payment_status="Unpaid",
            payment_method="Cash On Delivery"  # This can be customized based on user input
        )
        order.items.set(cart.cake.all())  # Set the cakes in the order
        order.save()

        # Step 6: Clear the cart
        cart.cake.clear()
        cart.total_amount = 0
        cart.save()

        # Step 7: Serialize and return the order data
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)   
    

    @action(detail=True, methods=['post'])
    def place_order(self, request, pk=None):
        # Step 1: Fetch the order using the order ID (pk)
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"message": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

        # Step 2: Update the order status and payment status
        order.payment_status = "Paid"  # Example: set payment status to "Paid"
        order.order_status = "Placed"   # Example: set order status to "Placed"
        order.save()

        # Step 3: Send email to customer
        send_payment_success_email(order.customer.email)

        # Step 4: Return a response
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class DeliveryTrackingView(APIView):
    def get(self, request):
        order_id = request.query_params.get('order_id')
        
        if not order_id:
            return Response({"error": "Order ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the order
            order = Order.objects.get(order_id=order_id)
            delivery_address = order.delivery_address

            # Define the current location (hardcoded for testing)
            current_location = "Your Store Address"  # Replace with your actual store address
            api_key = settings.GOOGLE_DISTANCE_MATRIX_API_KEY

            # Call the Google Distance Matrix API
            url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={current_location}&destinations={delivery_address}&key={api_key}"
            response = requests.get(url)
            data = response.json()

            if data['status'] != 'OK':
                return Response({"error": "Failed to retrieve data from Google API."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Parse the response
            elements = data.get('rows')[0].get('elements')[0]
            if elements['status'] == 'OK':
                distance = elements['distance']['text']
                duration = elements['duration']['text']
                return Response({
                    "order_id": order_id,
                    "delivery_address": delivery_address,
                    "distance": distance,
                    "duration": duration,
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Could not calculate delivery information."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Order.DoesNotExist:
            return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
