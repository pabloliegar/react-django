from django.db import models

paymentTypeEnum = (
    ("CARD", "card"),
    ("CASH", "cash")
)
statusPaymentEnum = (
    ("PENDING", "pending"),
    ("PAID", "paid")
)


class Payment(models.Model):
    table = models.ForeignKey(
        "tables.Table", null=True, on_delete=models.SET_NULL)
    totalPayment = models.DecimalField(max_digits=10, decimal_places=2)
    paymentType = models.CharField(
        max_length=255, choices=paymentTypeEnum)
    statusPayment = models.CharField(
        max_length=255, choices=statusPaymentEnum)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.table)
