import re
from rest_framework import serializers
from .models import *
from django.core.validators import RegexValidator
from django.contrib.auth.hashers import make_password


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'email', 'first_name', 'last_name', 'password', 'phone_no', 'address', 'city', 'state', 'pincode']

    def create(self, validated_data):
        # Hash the password before creating a new Customer
        validated_data['password'] = make_password(validated_data['password'])
        return super(CustomerSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        # Hash the password if it is being updated
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super(CustomerSerializer, self).update(instance, validated_data)   


class CakeSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Cake
        fields = '__all__'
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        
        # Return placeholder image URL if no image is set
        # Using Unsplash placeholder service for demo
        placeholder_images = [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1606312619070-d48b4bdc5e3b?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1565958011703-14f05864507a?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1563805042-7688c019e1cb?w=400&h=400&fit=crop',
        ]
        # Use cake ID to consistently assign placeholder
        return placeholder_images[obj.id % len(placeholder_images)]   


class CakeCustomizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CakeCustomization
        fields = '__all__'   


 

class CartItemSerializer(serializers.ModelSerializer):
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'cake', 'quantity', 'customization', 'subtotal']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'customer', 'items', 'total_amount', 'created_at', 'updated_at']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'   

        
