from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, CakeViewSet, CakeCustomizationViewSet, CartViewSet, OrderViewSet
from .views import DeliveryTrackingView

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'cakes', CakeViewSet)
router.register(r'customizations', CakeCustomizationViewSet)
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
    path('api/customers/login/', CustomerViewSet.as_view({'post': 'login'}), name='customer-login'),
    path('api/cart/add-to-cart/', CartViewSet.as_view({'post': 'add_to_cart'}), name='add-to-cart'),
    path('api/orders/<int:pk>/update-order/', OrderViewSet.as_view({'post': 'update_order'}), name='update-order'),
    path('api/delivery_track/', DeliveryTrackingView.as_view(), name='track_delivery'),
]
