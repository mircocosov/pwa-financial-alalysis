from tinkoff.invest import Client
from django.conf import settings


def update_portfolio_prices(positions):
    """
    Обновляет цены всех акций в портфеле по FIGI или тикеру
    """
    with Client(settings.TINKOFF_TOKEN) as client:
        # Добавляем FIGI, если его ещё нет
        for pos in positions:
            if not pos.figi:
                found = client.instruments.find_instrument(query=pos.ticker)
                if not found.instruments:
                    print(f"⚠️ Не найден FIGI для {pos.ticker}")
                    continue
                pos.figi = found.instruments[0].figi
                pos.save(update_fields=["figi"])

        figis = [p.figi for p in positions if p.figi]

        if not figis:
            return

        last_prices = client.market_data.get_last_prices(figi=figis).last_prices
        price_map = {
            lp.figi: lp.price.units + lp.price.nano / 1e9 for lp in last_prices
        }

        for pos in positions:
            if pos.figi in price_map:
                pos.current_price = price_map[pos.figi]
                pos.save(update_fields=["current_price", "updated_at"])
