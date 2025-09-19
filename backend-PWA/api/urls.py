from django.urls import path
from .views import (
    TransactionCreateView, TransactionListView, SummaryView,
    LatestTransactionsView, InvestmentSummaryView,
    InvestmentPricesView, InvestmentHistoryView
)

urlpatterns = [
    path('transactions/', TransactionListView.as_view()),
    path('transactions/create/', TransactionCreateView.as_view()),
    path('transactions/latest/', LatestTransactionsView.as_view()),
    path('summary/', SummaryView.as_view()),
    path('investments/summary/', InvestmentSummaryView.as_view()),
    path('investments/prices/', InvestmentPricesView.as_view()),
    path('investments/history/', InvestmentHistoryView.as_view()),
]
