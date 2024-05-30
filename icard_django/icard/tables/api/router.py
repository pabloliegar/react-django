from rest_framework.routers import DefaultRouter
from tables.api.views import TableApiViewSet


router_tables = DefaultRouter()

router_tables.register(
    prefix='tables', basename='tables', viewset=TableApiViewSet
)
