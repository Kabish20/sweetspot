from django.core.management.base import BaseCommand
from sweetspot_app.models import Cake


class Command(BaseCommand):
    help = 'Updates cake images with placeholder URLs for testing'

    def handle(self, *args, **options):
        # Map of cake names to image URLs (using placeholder service)
        # In production, these would be actual uploaded images
        image_mapping = {
            'Chocolate Delight': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
            'Red Velvet': 'https://images.unsplash.com/photo-1606312619070-d48b4bdc5e3b?w=400&h=400&fit=crop',
            'Black Forest': 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=400&fit=crop',
            'Vanilla Bliss': 'https://images.unsplash.com/photo-1565958011703-14f05864507a?w=400&h=400&fit=crop',
            'Strawberry Dream': 'https://images.unsplash.com/photo-1563805042-7688c019e1cb?w=400&h=400&fit=crop',
            'Butterscotch Delight': 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop',
            'Mango Tango': 'https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?w=400&h=400&fit=crop',
            'Caramel Nut Crunch': 'https://images.unsplash.com/photo-1606312619070-d48b4bdc5e3b?w=400&h=400&fit=crop',
            'Pineapple Paradise': 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop',
            'Coffee Crunch': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
            'Lemon Zest': 'https://images.unsplash.com/photo-1565958011703-14f05864507a?w=400&h=400&fit=crop',
            'Blueberry Burst': 'https://images.unsplash.com/photo-1563805042-7688c019e1cb?w=400&h=400&fit=crop',
            'Tiramisu Classic': 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=400&fit=crop',
            'Oreo Cookie': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
            'Raspberry Ripple': 'https://images.unsplash.com/photo-1563805042-7688c019e1cb?w=400&h=400&fit=crop',
            'Hazelnut Heaven': 'https://images.unsplash.com/photo-1606312619070-d48b4bdc5e3b?w=400&h=400&fit=crop',
            'Coconut Cream': 'https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?w=400&h=400&fit=crop',
            'Pistachio Perfection': 'https://images.unsplash.com/photo-1565958011703-14f05864507a?w=400&h=400&fit=crop',
            'Carrot Cake': 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop',
            'Fruit Fantasy': 'https://images.unsplash.com/photo-1563805042-7688c019e1cb?w=400&h=400&fit=crop',
        }

        updated_count = 0
        for cake in Cake.objects.all():
            if cake.name in image_mapping:
                # For now, we'll store the URL in the image field
                # In production, you'd download and save the image file
                cake.image = image_mapping[cake.name]
                cake.save(update_fields=['image'])
                updated_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Updated image for: {cake.name}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'\nTotal cakes updated: {updated_count}')
        )
