from django.db import models

class Transaction(models.Model):
    CATEGORY_CHOICES = [
        ('groceries', 'Продукты'),
        ('transport', 'Транспорт'),
        ('entertainment', 'Развлечения'),
        ('health', 'Здоровье'),
        ('utilities', 'Коммунальные'),
        ('education', 'Образование'),
        ('other', 'Другое'),
    ]

    TYPE_CHOICES = [
        ('income', 'Доход'),
        ('expense', 'Расход'),
    ]

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.get_type_display()} - {self.amount} ({self.get_category_display()})"


class Investment(models.Model):
    symbol = models.CharField(max_length=10)  # Название акции, например AAPL
    invested_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_value = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.symbol} | {self.invested_amount} => {self.current_value}"


class PortfolioSnapshot(models.Model):
    date = models.DateField()
    value = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.date}: {self.value}"
