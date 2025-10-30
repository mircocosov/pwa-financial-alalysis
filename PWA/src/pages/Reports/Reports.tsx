import React from "react";
import styles from "./Reports.module.scss";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";

const spending = [
  { label: "Жильё", value: 34 },
  { label: "Питание", value: 22 },
  { label: "Транспорт", value: 12 },
  { label: "Покупки", value: 18 },
  { label: "Образ жизни", value: 14 },
];

const incomeVsExpense = [
  { period: "Текущий месяц", income: 195_400, expenses: 132_250 },
  { period: "Прошлый месяц", income: 182_100, expenses: 128_900 },
];

const highlights = [
  { title: "Расходы снизились на 4%", detail: "Транспортные траты сократились после оптимизации маршрутов." },
  { title: "Доходы выросли на 7%", detail: "Квартальная премия выплачена в декабре." },
];

const upcoming = [
  { title: "Квартальная отчётность по налогам", date: "23 дек", tag: "Напоминание" },
  { title: "Совет директоров", date: "04 янв", tag: "Событие" },
  { title: "Пересмотр бюджета", date: "09 янв", tag: "Планирование" },
];

const Reports: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Отчёты</h1>
        <Button size="sm">Скачать PDF</Button>
      </div>

      <div className={styles.sections}>
        <Card className={styles.panel}>
          <h3>Расходы по категориям</h3>
          <div className={styles.list}>
            {spending.map((item) => (
              <div key={item.label} className={styles.listItem}>
                <div className={styles.compareRow}>
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className={styles.barTrack}>
                  <span className={styles.barFill} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.panel}>
          <h3>Доходы и расходы</h3>
          <div className={styles.list}>
            {incomeVsExpense.map((row) => (
              <div key={row.period} className={styles.listItem}>
                <div className={styles.compareRow}>
                  <strong>{row.period}</strong>
                  <span>{(row.income - row.expenses).toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className={styles.twoColumn}>
                  <div>
                    <span className={styles.muted}>Доходы</span>
                    <strong className={styles.incomeValue}>{row.income.toLocaleString("ru-RU")} ₽</strong>
                  </div>
                  <div>
                    <span className={styles.muted}>Расходы</span>
                    <strong className={styles.expenseValue}>{row.expenses.toLocaleString("ru-RU")} ₽</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.panel}>
          <h3>Ключевые события</h3>
          <div className={styles.list}>
            {highlights.map((item) => (
              <div key={item.title} className={styles.listItem}>
                <strong>{item.title}</strong>
                <span className={styles.muted}>{item.detail}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.panel}>
          <h3>Предстоящие задачи</h3>
          <div className={styles.timeline}>
            {upcoming.map((item) => (
              <div key={item.title} className={styles.timelineItem}>
                <div>
                  <div className={styles.tagRow}>{item.tag}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <strong>{item.title}</strong>
                  <div className={styles.muted}>{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;

