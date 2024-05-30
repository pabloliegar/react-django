from rest_framework.serializers import ModelSerializer
from products.models import Products
from categories.api.serializers import CategorySerializer


class ProductSerializer(ModelSerializer):
    category_data = CategorySerializer(source='category', read_only=True)

    class Meta:
        model = Products
        fields = ['id', 'title', 'image', 'price',
                  'active', 'category', 'category_data']
