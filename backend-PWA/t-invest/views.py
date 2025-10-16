from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import StockPosition
from .services import update_portfolio_prices


@api_view(["POST"])
def refresh_portfolio(request):
    """
    Обновляет цены всех акций в портфеле и возвращает прибыль
    """
    positions = list(StockPosition.objects.all())
    update_portfolio_prices(positions)

    data = [
        {
            "ticker": p.ticker,
            "buy_price": p.buy_price,
            "current_price": p.current_price,
            "quantity": p.quantity,
            "profit": p.profit,
        }
        for p in positions
    ]
    return Response({"portfolio": data})
