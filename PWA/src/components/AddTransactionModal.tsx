import React, { useState } from "react";
import styles from "./AddTransactionModal.module.scss";
import { Button } from "./Button";
import { Input } from "./Input";

export type TransactionForm = {
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
  date: string;
};

export const AddTransactionModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (tx: TransactionForm) => void;
}> = ({ open, onClose, onSubmit }) => {
  const [type, setType] = useState<TransactionForm["type"]>("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = parseFloat(amount);
    if (Number.isNaN(value)) return;
    onSubmit({ type, category, amount: value, description, date });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.title}>Добавить транзакцию</div>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div>
              <span className={styles.label}>Тип</span>
              <div className={styles.typeSwitch}>
                <button
                  type="button"
                  className={`${styles.chip} ${type === "expense" ? styles.chipActive : ""}`}
                  onClick={() => setType("expense")}
                >
                  Расход
                </button>
                <button
                  type="button"
                  className={`${styles.chip} ${type === "income" ? styles.chipActive : ""}`}
                  onClick={() => setType("income")}
                >
                  Доход
                </button>
              </div>
            </div>

            <div className={styles.row}>
              <div>
                <label className={styles.label} htmlFor="category">Категория</label>
                <select
                  id="category"
                  className={styles.select}
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  required
                >
                  <option value="" disabled>Выберите категорию</option>
                  <option value="доход">Доход</option>
                  <option value="питание">Питание</option>
                  <option value="транспорт">Транспорт</option>
                  <option value="покупки">Покупки</option>
                  <option value="услуги">Услуги</option>
                </select>
              </div>
              <div>
                <label className={styles.label} htmlFor="amount">Сумма</label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className={styles.label} htmlFor="description">Описание</label>
              <textarea
                id="description"
                className={styles.textarea}
                placeholder="Добавьте комментарий"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="date">Дата</label>
              <Input id="date" type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
            </div>
          </div>
          <div className={styles.actions}>
            <Button type="button" variant="ghost" onClick={onClose}>Отмена</Button>
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;

