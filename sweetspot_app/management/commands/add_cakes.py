from django.core.management.base import BaseCommand
from sweetspot_app.models import Cake
from decimal import Decimal


class Command(BaseCommand):
    help = 'Adds 20 different types of cakes to the database'

    def handle(self, *args, **options):
        cakes_data = [
            {
                'name': 'Chocolate Delight',
                'flavour': 'Chocolate',
                'size': 'Medium',
                'price': Decimal('850.00'),
                'description': 'Rich and creamy chocolate cake with layers of chocolate frosting. Perfect for chocolate lovers.',
                'image': 'cakes/chocolate_delight.png',
                'available': True
            },
            {
                'name': 'Red Velvet',
                'flavour': 'Red Velvet',
                'size': 'Large',
                'price': Decimal('1200.00'),
                'description': 'Classic red velvet cake with cream cheese frosting. Elegant and delicious.',
                'image': 'cakes/red_velvet.png',
                'available': True
            },
            {
                'name': 'Black Forest',
                'flavour': 'Chocolate Cherry',
                'size': 'Large',
                'price': Decimal('1100.00'),
                'description': 'Traditional German cake with layers of chocolate, cherries, and whipped cream.',
                'image': 'cakes/black_forest.png',
                'available': True
            },
            {
                'name': 'Vanilla Bliss',
                'flavour': 'Vanilla',
                'size': 'Medium',
                'price': Decimal('750.00'),
                'description': 'Light and fluffy vanilla cake with vanilla buttercream. Simple yet delightful.',
                'image': 'cakes/Vanilla_Bliss.png',
                'available': True
            },
            {
                'name': 'Strawberry Dream',
                'flavour': 'Strawberry',
                'size': 'Medium',
                'price': Decimal('900.00'),
                'description': 'Fresh strawberry cake with real strawberry pieces and cream frosting.',
                'image': 'cakes/strawberry.png',
                'available': True
            },
            {
                'name': 'Butterscotch Delight',
                'flavour': 'Butterscotch',
                'size': 'Large',
                'price': Decimal('1000.00'),
                'description': 'Decadent butterscotch cake with caramel layers and butterscotch cream.',
                'image': 'cakes/Butterscotch.png',
                'available': True
            },
            {
                'name': 'Mango Tango',
                'flavour': 'Mango',
                'size': 'Medium',
                'price': Decimal('950.00'),
                'description': 'Tropical mango cake with fresh mango pieces and mango cream frosting.',
                'image': 'cakes/mango.png',
                'available': True
            },
            {
                'name': 'Caramel Nut Crunch',
                'flavour': 'Caramel',
                'size': 'Large',
                'price': Decimal('1300.00'),
                'description': 'Rich caramel cake topped with mixed nuts and caramel drizzle.',
                'image': 'cakes/Caramel_with_Nuts.png',
                'available': True
            },
            {
                'name': 'Pineapple Paradise',
                'flavour': 'Pineapple',
                'size': 'Medium',
                'price': Decimal('880.00'),
                'description': 'Tropical pineapple cake with pineapple chunks and coconut cream.',
                'image': 'cakes/download_1.png',
                'available': True
            },
            {
                'name': 'Coffee Crunch',
                'flavour': 'Coffee',
                'size': 'Medium',
                'price': Decimal('920.00'),
                'description': 'Rich coffee-flavored cake with coffee buttercream and chocolate chips.',
                'image': 'cakes/download_2.png',
                'available': True
            },
            {
                'name': 'Lemon Zest',
                'flavour': 'Lemon',
                'size': 'Small',
                'price': Decimal('650.00'),
                'description': 'Tangy lemon cake with lemon curd filling and lemon glaze.',
                'image': 'cakes/chocolate_delight.png',
                'available': True
            },
            {
                'name': 'Blueberry Burst',
                'flavour': 'Blueberry',
                'size': 'Medium',
                'price': Decimal('980.00'),
                'description': 'Moist blueberry cake with fresh blueberries and vanilla cream.',
                'image': 'cakes/strawberry.png',
                'available': True
            },
            {
                'name': 'Tiramisu Classic',
                'flavour': 'Coffee Mascarpone',
                'size': 'Large',
                'price': Decimal('1400.00'),
                'description': 'Italian classic with coffee-soaked layers and mascarpone cream.',
                'image': 'cakes/red_velvet.png',
                'available': True
            },
            {
                'name': 'Oreo Cookie',
                'flavour': 'Chocolate Cookie',
                'size': 'Medium',
                'price': Decimal('1050.00'),
                'description': 'Chocolate cake with crushed Oreo cookies and Oreo cream frosting.',
                'image': 'cakes/black_forest.png',
                'available': True
            },
            {
                'name': 'Raspberry Ripple',
                'flavour': 'Raspberry',
                'size': 'Medium',
                'price': Decimal('920.00'),
                'description': 'Vanilla cake with raspberry swirls and fresh raspberry topping.',
                'image': 'cakes/mango.png',
                'available': True
            },
            {
                'name': 'Hazelnut Heaven',
                'flavour': 'Hazelnut',
                'size': 'Large',
                'price': Decimal('1250.00'),
                'description': 'Rich hazelnut cake with Nutella frosting and hazelnut pieces.',
                'image': 'cakes/Caramel_with_Nuts.png',
                'available': True
            },
            {
                'name': 'Coconut Cream',
                'flavour': 'Coconut',
                'size': 'Medium',
                'price': Decimal('890.00'),
                'description': 'Tropical coconut cake with coconut cream and shredded coconut.',
                'image': 'cakes/Vanilla_Bliss.png',
                'available': True
            },
            {
                'name': 'Pistachio Perfection',
                'flavour': 'Pistachio',
                'size': 'Large',
                'price': Decimal('1350.00'),
                'description': 'Premium pistachio cake with pistachio cream and pistachio pieces.',
                'image': 'cakes/Butterscotch.png',
                'available': True
            },
            {
                'name': 'Carrot Cake',
                'flavour': 'Carrot Spice',
                'size': 'Medium',
                'price': Decimal('850.00'),
                'description': 'Moist carrot cake with cream cheese frosting and walnuts.',
                'image': 'cakes/chocolate_delight.png',
                'available': True
            },
            {
                'name': 'Fruit Fantasy',
                'flavour': 'Mixed Fruit',
                'size': 'Large',
                'price': Decimal('1100.00'),
                'description': 'Vanilla cake loaded with fresh seasonal fruits and whipped cream.',
                'image': 'cakes/strawberry.png',
                'available': True
            }
        ]

        created_count = 0
        for cake_data in cakes_data:
            cake, created = Cake.objects.get_or_create(
                name=cake_data['name'],
                defaults=cake_data
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created cake: {cake.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Cake already exists: {cake.name}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'\nTotal cakes created: {created_count} out of {len(cakes_data)}')
        )
