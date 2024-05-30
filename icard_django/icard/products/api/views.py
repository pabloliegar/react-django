from rest_framework.viewsets import ModelViewSet
from products.models import Products
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from products.api.serializer import ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend


class ProductApiViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProductSerializer
    queryset = Products.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'active']
