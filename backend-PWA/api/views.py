from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Sum, Q
from datetime import date, datetime
from .models import Transaction, Investment, PortfolioSnapshot
from .serializers import TransactionSerializer, InvestmentSerializer, PortfolioSnapshotSerializer


# 1. POST /api/transactions/
class TransactionCreateView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


# 2. GET /api/transactions/?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&type=income&category=health
class TransactionListView(generics.ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        queryset = Transaction.objects.all()
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        trans_type = self.request.query_params.get('type')
        category = self.request.query_params.get('category')

        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        if trans_type:
            queryset = queryset.filter(type=trans_type)
        if category:
            queryset = queryset.filter(category=category)

        return queryset


# 3. GET /api/summary/
class SummaryView(APIView):
    def get(self, request):
        today = date.today()
        month_start = today.replace(day=1)

        transactions = Transaction.objects.filter(date__gte=month_start)

        income = transactions.filter(type='income').aggregate(total=Sum('amount'))['total'] or 0
        expense = transactions.filter(type='expense').aggregate(total=Sum('amount'))['total'] or 0
        capital = Transaction.objects.filter(type='income').aggregate(Sum('amount'))['amount__sum'] or 0
        capital -= Transaction.objects.filter(type='expense').aggregate(Sum('amount'))['amount__sum'] or 0

        return Response({
            "income": income,
            "expense": expense,
            "net_month": income - expense,
            "capital": capital
        })


# 4. GET /api/transactions/latest/
class LatestTransactionsView(generics.ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.order_by('-date')[:8]


# 5. GET /api/investments/summary/
class InvestmentSummaryView(APIView):
    def get(self, request):
        investments = Investment.objects.all()
        total_invested = sum(i.invested_amount for i in investments)
        total_current = sum(i.current_value for i in investments)
        profit = total_current - total_invested
        percent = (profit / total_invested) * 100 if total_invested > 0 else 0

        return Response({
            "invested": total_invested,
            "current_value": total_current,
            "profit": profit,
            "percent": round(percent, 2)
        })


# 6. GET /api/investments/prices/
class InvestmentPricesView(APIView):
    def get(self, request):
        # Здесь можно подгрузить данные с биржи, пока - заглушка
        investments = Investment.objects.all()
        return Response([
            {
                "symbol": i.symbol,
                "current_price": i.current_value  # Заменить на реальные данные
            }
            for i in investments
        ])


# 7. GET /api/investments/history/
class InvestmentHistoryView(APIView):
    def get(self, request):
        snapshots = PortfolioSnapshot.objects.all().order_by('date')
        values = [s.value for s in snapshots]
        max_drawdown = min(values) if values else 0
        max_growth = max(values) if values else 0
        current_value = values[-1] if values else 0

        serializer = PortfolioSnapshotSerializer(snapshots, many=True)
        return Response({
            "history": serializer.data,
            "max_drawdown": max_drawdown,
            "max_growth": max_growth,
            "current_value": current_value
        })


# 8. DELETE /api/transactions/<int:pk>/
class TransactionDeleteView(generics.DestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'pk'