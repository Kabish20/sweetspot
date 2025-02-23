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
    class Meta:
        model = Cake
        fields ='__all__'   


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

        
