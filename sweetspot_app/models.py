from django.db import models
from django.utils import timezone




class Customer(models.Model):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    password = models.CharField(max_length=128)  # Consider using Django's authentication system
    phone_no = models.CharField(max_length=15)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Cake(models.Model):
    name = models.CharField(max_length=100)
    flavour = models.CharField(max_length=100)
    size = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='cakes/')
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class CakeCustomization(models.Model):
    message = models.TextField()
    egg_version = models.BooleanField(default=False)  # True if egg version, False if eggless
    toppings = models.CharField(max_length=200)
    shape = models.CharField(max_length=50)
    cake = models.ForeignKey(Cake, on_delete=models.CASCADE, related_name='customizations')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customizations')

    def __str__(self):
        return f"Customization for {self.cake.name} by {self.customer.first_name}"


class CartItem(models.Model):
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE, related_name='items')
    cake = models.ForeignKey(Cake, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    customization = models.OneToOneField(
        CakeCustomization, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )
    created_at = models.DateTimeField(default=timezone.now)  
    @property
    def subtotal(self):
        return self.cake.price * self.quantity

class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)  
    updated_at = models.DateTimeField(auto_now=True)  
    is_active = models.BooleanField(default=True)  # Added to track active carts

    @property
    def total_amount(self):
        return sum(item.subtotal for item in self.items.all())



class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    cake_customization = models.ForeignKey(CakeCustomization, on_delete=models.CASCADE, related_name='orders')
    items = models.ManyToManyField(Cake, related_name='orders')
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(default=timezone.now)
    delivery_address = models.TextField()
    order_status = models.CharField(max_length=50, default='Pending')
    payment_status = models.CharField(max_length=50, default='Pending')
    payment_method = models.CharField(max_length=50)

    def __str__(self):
        return f"Order {self.id} by {self.customer.first_name}"

