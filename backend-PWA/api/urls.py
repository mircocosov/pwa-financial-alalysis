from django.urls import path
from .views import (
    TransactionCreateView, TransactionListView, SummaryView,
    LatestTransactionsView, InvestmentSummaryView, InvestmentPricesView,
    InvestmentHistoryView, TransactionDeleteView
)

urlpatterns = [
    path('transactions/', TransactionCreateView.as_view(), name='transaction-create'),
    path('transactions/list/', TransactionListView.as_view(), name='transaction-list'),
    path('transactions/latest/', LatestTransactionsView.as_view(), name='latest-transactions'),
    path('transactions/<int:pk>/', TransactionDeleteView.as_view(), name='transaction-delete'),
    path('summary/', SummaryView.as_view(), name='summary'),
    path('investments/summary/', InvestmentSummaryView.as_view(), name='investment-summary'),
    path('investments/prices/', InvestmentPricesView.as_view(), name='investment-prices'),
    path('investments/history/', InvestmentHistoryView.as_view(), name='investment-history'),
]
