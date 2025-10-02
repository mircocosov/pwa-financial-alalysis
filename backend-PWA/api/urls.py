from django.urls import path
from .views import (
    TransactionCreateView, TransactionListView, SummaryView,
    LatestTransactionsView, InvestmentSummaryView, InvestmentPricesView,
    InvestmentHistoryView, TransactionDeleteView
)

urlpatterns = [
    path('api/transactions/', TransactionCreateView.as_view(), name='transaction-create'),
    path('api/transactions/list/', TransactionListView.as_view(), name='transaction-list'),
    path('api/transactions/latest/', LatestTransactionsView.as_view(), name='latest-transactions'),
    path('api/transactions/<int:pk>/', TransactionDeleteView.as_view(), name='transaction-delete'),
    path('api/summary/', SummaryView.as_view(), name='summary'),
    path('api/investments/summary/', InvestmentSummaryView.as_view(), name='investment-summary'),
    path('api/investments/prices/', InvestmentPricesView.as_view(), name='investment-prices'),
    path('api/investments/history/', InvestmentHistoryView.as_view(), name='investment-history'),
]
