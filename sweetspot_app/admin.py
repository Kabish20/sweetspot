from django.contrib import admin
from django.contrib.admin import AdminSite
from .models import Cake, CakeCustomization, Cart, Customer, Order

# Step 1: Create a custom AdminSite class
class Admin(AdminSite):
    site_header = "SweetSpot Administration"  # Customize the header
    site_title = "SweetSpot Admin"
    index_title = "Welcome to SweetSpot Admin Portal"
    
    # Step 2: Override the get_app_list method to order the models
    def get_app_list(self, request):
        app_list = super().get_app_list(request)

        # Find the app that has the models (usually it will be your app)
        for app in app_list:
            if app['name'] == 'Sweetspot_App':  # Replace with the actual app name
                # Custom order of models
                app['models'].sort(key=lambda x: ['Customer','CartItem', 'Cake', 'CakeCustomization', 'Cart', 'Order'].index(x['object_name']))
        
        return app_list

# Step 3: Instantiate the custom admin site
my_adminsite = Admin(name='my_admin')

# Step 4: Register your models with the custom admin site
my_adminsite.register(Customer)
my_adminsite.register(Cake)
my_adminsite.register(CakeCustomization)
my_adminsite.register(Cart)
my_adminsite.register(Order)