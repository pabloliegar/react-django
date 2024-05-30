from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from payments.models import Payment
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from payments.api.serializers import PaymentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class PaymentApiViewSet(ModelViewSet):

    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['table', 'statusPayment']
    ordering_fields = '__all__'
