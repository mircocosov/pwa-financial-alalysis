import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { AddTransactionModal } from "../../components/AddTransactionModal";
import type { TransactionForm } from "../../components/AddTransactionModal";

const summaryMetrics = [
  { title: "Совокупный баланс", value: "2 150 000 ₽", delta: "+7,2%", trend: "up" as const },
  { title: "Доход за месяц", value: "195 400 ₽", delta: "+3,4%", trend: "up" as const },
  { title: "Расходы за месяц", value: "132 250 ₽", delta: "-2,1%", trend: "down" as const },
  { title: "Активных уведомлений", value: "5", delta: "стабильно", trend: "neutral" as const },
];

const capitalTrend = [
  { label: "Янв", value: 420 },
  { label: "Фев", value: 455 },
  { label: "Мар", value: 468 },
  { label: "Апр", value: 492 },
  { label: "Май", value: 508 },
  { label: "Июн", value: 540 },
  { label: "Июл", value: 575 },
  { label: "Авг", value: 602 },
  { label: "Сен", value: 618 },
  { label: "Окт", value: 640 },
  { label: "Ноя", value: 658 },
  { label: "Дек", value: 685 },
];

const cashflow = [
  { label: "Доходы", value: 195_400, className: "cashflowValueIncome" as const },
  { label: "Расходы", value: 132_250, className: "cashflowValueExpense" as const },
  { label: "Инвестиции", value: 68_400, className: "cashflowValueInvest" as const },
];

const initialTransactions = [
  { id: "1", name: "Зарплата", category: "Доход", amount: "+95 400 ₽", time: "12 дек" },
  { id: "2", name: "Продукты", category: "Расходы", amount: "-3 200 ₽", time: "11 дек" },
  { id: "3", name: "Погашение кредита", category: "Финансы", amount: "-12 450 ₽", time: "10 дек" },
  { id: "4", name: "Дивиденды", category: "Инвестиции", amount: "+8 200 ₽", time: "08 дек" },
  { id: "5", name: "Офис", category: "Операционные", amount: "-5 600 ₽", time: "06 дек" },
];

const goals = [
  { title: "Резервный фонд", progress: 74, target: "700 000 ₽" },
  { title: "План инвестиций", progress: 52, target: "1 200 000 ₽" },
];

const insights = [
  { title: "Рынок", body: "Технологический сектор вырос на 5,4% за квартал и лидирует по доходности.", tag: "Портфель" },
  { title: "Контроль расходов", body: "Статья 'Транспорт' выросла на 12% к прошлому месяцу — пересмотрите маршруты.", tag: "Расходы" },
  { title: "Внимание", body: "Завтра выходит отчёт по инфляции США. Проверьте план хеджирования.", tag: "Оповещения" },
];

const riskControls = [
  { label: "Запас ликвидности", value: "4,6 месяца" },
  { label: "Диверсификация", value: "Сбалансированно" },
  { label: "Волатильность", value: "Низкая" },
];

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "short" });

const cashflowClassMap: Record<typeof cashflow[number]["className"], string> = {
  cashflowValueIncome: styles.cashflowValueIncome,
  cashflowValueExpense: styles.cashflowValueExpense,
  cashflowValueInvest: styles.cashflowValueInvest,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [feed, setFeed] = useState(initialTransactions);

  const chartScale = useMemo(() => {
    const values = capitalTrend.map((point) => point.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    return { max, min, delta: max - min || 1 };
  }, []);

  const handleAddTransaction = (form: TransactionForm) => {
    const amountPrefix = form.type === "income" ? "+" : "-";
    const formattedDate = form.date ? dateFormatter.format(new Date(form.date)) : "";
    const item = {
      id: String(Date.now()),
      name: form.description || "Новая операция",
      category: form.category,
      amount: `${amountPrefix}${form.amount.toLocaleString("ru-RU")} ₽`,
      time: formattedDate,
    };
    setFeed((current) => [item, ...current].slice(0, 6));
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Финансовая панель</h1>
          <span className={styles.subtitle}>Сводка по балансу · активность · быстрые действия</span>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => navigate("/reports")}>Перейти в отчёты</Button>
          <Button onClick={() => setModalOpen(true)}>Добавить транзакцию</Button>
        </div>
      </div>
      <div className={styles.summaryRow}>
        {summaryMetrics.map((metric) => (
          <Card key={metric.title} className={styles.summaryCard}>
            <span>{metric.title}</span>
            <span className={styles.metricValue}>{metric.value}</span>
            <span
              className={`${styles.metricDelta} ${
                metric.trend === "up" ? styles.deltaUp : metric.trend === "down" ? styles.deltaDown : styles.deltaNeutral
              }`}
            >
              {metric.delta}
            </span>
          </Card>
        ))}
      </div>

      <div className={styles.layoutRow}>
        <div className={styles.columnLarge}>
          <Card className={styles.chartWrap}>
            <div>
              <h3>Динамика капитала</h3>
              <span className={styles.subtitle}>Помещённый баланс портфеля за 2024 год</span>
            </div>
            <div className={styles.chartBody}>
              {capitalTrend.map((point) => {
                const heightRatio = (point.value - chartScale.min) / chartScale.delta;
                const height = Math.max(heightRatio * 100, 8);
                return (
                  <div key={point.label} className={styles.chartColumn}>
                    <div className={styles.chartBar} style={{ height: `${height}%` }} data-value={`${point.value}k`} />
                    <span className={styles.chartLabel}>{point.label}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className={styles.cardSection}>
            <div>
              <h3>Недавние операции</h3>
              <span className={styles.subtitle}>История счёта за последнюю неделю</span>
            </div>
            <div className={styles.list}>
              {feed.map((item) => (
                <div key={item.id} className={styles.listItem}>
                  <div>
                    <strong>{item.name}</strong>
                    <div className={styles.subtitle}>{item.category}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div>{item.amount}</div>
                    <div className={styles.subtitle}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className={styles.columnSmall}>
          <Card className={styles.cardSection}>
            <h3>Движение средств</h3>
            {cashflow.map((row) => (
              <div key={row.label} className={styles.listItem}>
                <div>{row.label}</div>
                <div className={cashflowClassMap[row.className]}>{row.value.toLocaleString("ru-RU")} ₽</div>
              </div>
            ))}
          </Card>

          <Card className={styles.cardSection}>
            <h3>Цели</h3>
            {goals.map((goal) => (
              <div key={goal.title}>
                <div className={styles.listItem}>
                  <div>{goal.title}</div>
                  <div>{goal.progress}%</div>
                </div>
                <div className={styles.progressTrack}>
                  <span className={styles.progressValue} style={{ width: `${goal.progress}%` }} />
                </div>
                <div className={styles.subtitle}>Цель: {goal.target}</div>
              </div>
            ))}
          </Card>

          <Card className={styles.cardSection}>
            <h3>Контроль рисков</h3>
            <div className={styles.riskRow}>
              {riskControls.map((item) => (
                <div key={item.label} className={styles.listItem}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className={styles.cardSection}>
        <h3>Замечания и рекомендации</h3>
        <div className={styles.insightsRow}>
          {insights.map((note) => (
            <Card key={note.title} className={styles.insightCard}>
              <div className={styles.tagList}>
                <span className={styles.tag}>{note.tag}</span>
              </div>
              <strong>{note.title}</strong>
              <p style={{ margin: 0 }}>{note.body}</p>
            </Card>
          ))}
        </div>
      </div>

      <AddTransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(form) => {
          handleAddTransaction(form);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
