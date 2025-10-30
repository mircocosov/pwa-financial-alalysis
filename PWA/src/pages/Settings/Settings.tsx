import React from "react";
import styles from "./Settings.module.scss";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";

const toggles = [
  { title: "Тёмная тема", description: "Использовать тёмное оформление интерфейса", enabled: true },
  { title: "Компактная сетка", description: "Уменьшить отступы и показывать больше данных", enabled: false },
  { title: "Email-уведомления", description: "Получать еженедельные сводки по почте", enabled: true },
  { title: "Анимации", description: "Включить плавные переходы и микроанимации", enabled: true },
];

const Settings: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Настройки</h1>

      <div className={styles.sections}>
        <Card className={styles.panel}>
          <h3>Профиль</h3>
          <div className={styles.row}>
            <div className={styles.rowColumn}>
              <strong>Отображаемое имя</strong>
              <span className={styles.muted}>Fin Analyst Pro</span>
            </div>
            <Button variant="secondary" size="sm">Изменить</Button>
          </div>
          <div className={styles.row}>
            <div className={styles.rowColumn}>
              <strong>Электронная почта</strong>
              <span className={styles.muted}>team@finanalyst.com</span>
            </div>
            <Button variant="secondary" size="sm">Сменить</Button>
          </div>
          <div className={styles.row}>
            <div className={styles.rowColumn}>
              <strong>Пароль</strong>
              <span className={styles.muted}>Обновлён 30 дней назад</span>
            </div>
            <Button variant="secondary" size="sm">Обновить</Button>
          </div>
        </Card>

        <Card className={styles.panel}>
          <h3>Предпочтения</h3>
          <div className={styles.preferences}>
            {toggles.map((item) => (
              <div key={item.title} className={styles.row}>
                <div className={styles.rowColumn}>
                  <strong>{item.title}</strong>
                  <span className={styles.muted}>{item.description}</span>
                </div>
                <label className={styles.toggle}>
                  <input type="checkbox" defaultChecked={item.enabled} />
                </label>
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.panel}>
          <h3>Безопасность</h3>
          <div className={styles.row}>
            <div className={styles.rowColumn}>
              <strong>Двухфакторная авторизация</strong>
              <span className={styles.muted}>Добавьте дополнительный уровень защиты</span>
            </div>
            <Button size="sm">Включить</Button>
          </div>
          <div className={styles.row}>
            <div className={styles.rowColumn}>
              <strong>Устройства входа</strong>
              <span className={styles.muted}>3 активные сессии</span>
            </div>
            <Button variant="secondary" size="sm">Управлять</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
