from django.db import models


class StockPosition(models.Model):
    ticker = models.CharField(max_length=20)
    figi = models.CharField(max_length=20, blank=True, null=True)
    buy_price = models.FloatField()
    quantity = models.IntegerField()
    current_price = models.FloatField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def profit(self):
        if self.current_price is None:
            return 0
        return round((self.current_price - self.buy_price) * self.quantity, 2)

    def __str__(self):
        return f"{self.ticker} ({self.quantity} шт)"
