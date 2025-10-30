import React, { useMemo } from "react";
import styles from "./Portfolio.module.scss";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";

const holdings = [
  { symbol: "AAPL", name: "Apple", shares: 150, price: 175.23, change: 2.34, value: 26284.5, allocation: 25.2 },
  { symbol: "GOOGL", name: "Alphabet", shares: 75, price: 138.45, change: -1.12, value: 10383.75, allocation: 15.8 },
  { symbol: "MSFT", name: "Microsoft", shares: 100, price: 334.78, change: 0.89, value: 33478, allocation: 32.1 },
  { symbol: "TSLA", name: "Tesla", shares: 50, price: 248.92, change: 5.67, value: 12446, allocation: 11.9 },
  { symbol: "AMZN", name: "Amazon", shares: 25, price: 142.33, change: -0.45, value: 3558.25, allocation: 3.4 },
  { symbol: "NVDA", name: "NVIDIA", shares: 40, price: 456.78, change: 3.21, value: 18271.2, allocation: 17.5 },
];

const tags = [
  { label: "Рост", value: 46 },
  { label: "Стоимость", value: 32 },
  { label: "Дивиденды", value: 22 },
];

const usdFormatter = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const Portfolio: React.FC = () => {
  const totalValue = useMemo(() => holdings.reduce((sum, item) => sum + item.value, 0), []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Портфель</h1>
        <div className={styles.actions}>
          <Button variant="secondary" size="sm">Фильтр</Button>
          <Button size="sm">Добавить актив</Button>
        </div>
      </div>

      <div className={styles.sectionStack}>
        <div className={styles.summaryRow}>
          <Card className={styles.summaryCard}>
            <span>Итоговая стоимость</span>
            <strong className={styles.summaryValue}>{usdFormatter.format(totalValue)}</strong>
            <span className={styles.muted}>Обновлено несколько секунд назад</span>
          </Card>
          <Card className={styles.summaryCard}>
            <span>Изменение за день</span>
            <strong className={styles.gain}>+1 540 ₽</strong>
            <span className={styles.muted}>+0,54% к предыдущей сессии</span>
          </Card>
          <Card className={styles.summaryCard}>
            <span>Лидер роста</span>
            <strong>TSLA</strong>
            <span className={styles.gain}>+5,67%</span>
          </Card>
          <Card className={styles.summaryCard}>
            <span>Список наблюдения</span>
            <strong>6 активов</strong>
            <span className={styles.muted}>3 сигнала на покупку</span>
          </Card>
        </div>

        <Card>
          <div className={styles.tableWrap}>
            <h3>Структура портфеля</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Тикер</th>
                  <th>Компания</th>
                  <th className={styles.textRight}>Кол-во</th>
                  <th className={styles.textRight}>Цена</th>
                  <th className={styles.textRight}>Изм.</th>
                  <th className={styles.textRight}>Стоимость</th>
                  <th className={styles.textRight}>Доля</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((item) => (
                  <tr key={item.symbol}>
                    <td>{item.symbol}</td>
                    <td>{item.name}</td>
                    <td className={styles.textRight}>{item.shares}</td>
                    <td className={styles.textRight}>{usdFormatter.format(item.price)}</td>
                    <td className={`${styles.textRight} ${item.change >= 0 ? styles.gain : styles.loss}`}>
                      {item.change >= 0 ? "+" : ""}{item.change.toFixed(2)}%
                    </td>
                    <td className={styles.textRight}>{usdFormatter.format(item.value)}</td>
                    <td className={styles.textRight}>{item.allocation.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className={styles.flexSplit}>
          <div className={styles.column}>
            <Card>
              <h3>Лидеры движения</h3>
              {holdings
                .filter((item) => item.change > 0)
                .slice()
                .sort((a, b) => b.change - a.change)
                .slice(0, 3)
                .map((item) => (
                  <div key={item.symbol} className={styles.listItem}>
                    <div>
                      <strong>{item.symbol}</strong>
                      <div className={styles.muted}>{item.name}</div>
                    </div>
                    <div className={styles.textRight}>
                      <div className={styles.gain}>+{item.change.toFixed(2)}%</div>
                      <div className={styles.muted}>{usdFormatter.format(item.price)}</div>
                    </div>
                  </div>
                ))}
            </Card>

            <Card>
              <h3>Тематические корзины</h3>
              {tags.map((tag) => (
                <div key={tag.label} className={styles.listItem}>
                  <div>{tag.label}</div>
                  <div>{tag.value}%</div>
                </div>
              ))}
            </Card>
          </div>

          <div className={styles.column}>
            <Card>
              <h3>Крупнейшие позиции</h3>
              {holdings
                .slice()
                .sort((a, b) => b.value - a.value)
                .slice(0, 3)
                .map((item) => (
                  <div key={item.symbol} className={styles.listItem}>
                    <div>
                      <strong>{item.symbol}</strong>
                      <div className={styles.muted}>{item.name}</div>
                    </div>
                    <div className={styles.textRight}>
                      <div>{item.allocation.toFixed(1)}%</div>
                      <div className={styles.muted}>{usdFormatter.format(item.value)}</div>
                    </div>
                  </div>
                ))}
            </Card>

            <Card>
              <h3>Предложения по ребалансировке</h3>
              <div className={styles.listItem}>
                <span>Снизить долю техсектора</span>
                <span>-2,5%</span>
              </div>
              <div className={styles.listItem}>
                <span>Увеличить облигации</span>
                <span>+1,8%</span>
              </div>
              <div className={styles.listItem}>
                <span>Пополнить кэш-позицию</span>
                <span>+0,7%</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

