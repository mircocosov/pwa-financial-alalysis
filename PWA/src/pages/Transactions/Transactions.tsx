import React, { useMemo, useState } from "react";
import styles from "./Transactions.module.scss";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AddTransactionModal } from "../../components/AddTransactionModal";
import type { TransactionForm } from "../../components/AddTransactionModal";

type Tx = {
  id: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
};

const initialTransactions: Tx[] = [
  { id: "1", description: "Зарплата", category: "Доход", amount: 95_400, type: "income", date: "2024-12-15" },
  { id: "2", description: "Продукты", category: "Быт", amount: 3_200, type: "expense", date: "2024-12-14" },
  { id: "3", description: "Такси", category: "Транспорт", amount: 1_250, type: "expense", date: "2024-12-13" },
  { id: "4", description: "Бонус", category: "Доход", amount: 25_000, type: "income", date: "2024-12-12" },
  { id: "5", description: "Офис", category: "Операционные", amount: 5_600, type: "expense", date: "2024-12-10" },
];

const scheduled = [
  { title: "Аренда", due: "01 янв", amount: "-65 000 ₽" },
  { title: "Инвестиции", due: "05 янв", amount: "-20 000 ₽" },
  { title: "Зарплата", due: "28 дек", amount: "+95 400 ₽" },
];

const categories = [
  { title: "Питание", value: 18 },
  { title: "Транспорт", value: 12 },
  { title: "Шопинг", value: 22 },
  { title: "Образ жизни", value: 16 },
];

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "short" });

const Transactions: React.FC = () => {
  const [items, setItems] = useState(initialTransactions);
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (typeFilter !== "all" && item.type !== typeFilter) return false;
      if (query && !`${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [items, typeFilter, query]);

  const totals = useMemo(() => {
    const base = { income: 0, expense: 0 };
    filtered.forEach((item) => {
      if (item.type === "income") base.income += item.amount;
      if (item.type === "expense") base.expense += item.amount;
    });
    return base;
  }, [filtered]);

  const handleSubmit = (form: TransactionForm) => {
    const storedDate = form.date || new Date().toISOString();
    const next: Tx = {
      id: String(Date.now()),
      description: form.description || "Новая операция",
      category: form.category,
      amount: form.amount,
      type: form.type,
      date: storedDate,
    };
    setItems((current) => [next, ...current]);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Транзакции</h1>
        <div className={styles.controls}>
          <Button variant="secondary" size="sm" onClick={() => setModalOpen(true)}>Добавить транзакцию</Button>
        </div>
      </div>

      <Card>
        <div className={styles.toolbar}>
          <Input
            placeholder="Поиск по описанию или категории"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            style={{ maxWidth: 260 }}
          />
          <Button size="sm" variant={typeFilter === "all" ? "primary" : "secondary"} onClick={() => setTypeFilter("all")}>
            Все
          </Button>
          <Button size="sm" variant={typeFilter === "income" ? "primary" : "secondary"} onClick={() => setTypeFilter("income")}>
            Доходы
          </Button>
          <Button size="sm" variant={typeFilter === "expense" ? "primary" : "secondary"} onClick={() => setTypeFilter("expense")}>
            Расходы
          </Button>
        </div>
      </Card>

      <div className={styles.contentRow}>
        <div className={styles.mainColumn}>
          <Card>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Описание</th>
                    <th>Категория</th>
                    <th>Дата</th>
                    <th className={styles.textRight}>Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id}>
                      <td>{item.description}</td>
                      <td>{item.category}</td>
                      <td>{item.date ? dateFormatter.format(new Date(item.date)) : ""}</td>
                      <td className={`${styles.textRight} ${item.type === "income" ? styles.income : styles.expense}`}>
                        {item.type === "income" ? "+" : "-"}
                        {item.amount.toLocaleString("ru-RU")} ₽
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <h3>Итоги</h3>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <span>Доходы</span>
                <strong className={styles.income}>{totals.income.toLocaleString("ru-RU")} ₽</strong>
              </div>
              <div className={styles.listItem}>
                <span>Расходы</span>
                <strong className={styles.expense}>{totals.expense.toLocaleString("ru-RU")} ₽</strong>
              </div>
              <div className={styles.listItem}>
                <span>Чистый поток</span>
                <strong>{(totals.income - totals.expense).toLocaleString("ru-RU")} ₽</strong>
              </div>
            </div>
          </Card>
        </div>

        <div className={styles.sideColumn}>
          <Card>
            <h3>Запланировано</h3>
            <div className={styles.list}>
              {scheduled.map((item) => (
                <div key={item.title} className={styles.listItem}>
                  <div>
                    <strong>{item.title}</strong>
                    <div className={styles.muted}>{item.due}</div>
                  </div>
                  <span>{item.amount}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3>Расходы по категориям</h3>
            <div className={styles.list}>
              {categories.map((item) => (
                <div key={item.title}>
                  <div className={styles.listItem}>
                    <span>{item.title}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <span className={styles.progressValue} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <AddTransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(form) => {
          handleSubmit(form);
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default Transactions;
