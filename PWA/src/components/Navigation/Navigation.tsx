import React from "react";
import { NavLink } from "react-router-dom";
// @ts-ignore
import styles from './Navigation.module.scss';

interface NavItem {
  to: string;
  label: string;
}


const NAV_ITEMS: NavItem[] = [
  { to: "/dashboard", label: "Главная" },
  { to: "/transactions", label: "Транзакции" },
  { to: "/portfolio", label: "Портфель" },
  { to: "/reports", label: "Отчёты" },
  { to: "/settings", label: "Настройки" },
];

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>FinAnalyst</div>
        <div className={styles.menu}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? `${styles.menuItem} ${styles.menuItemActive}` : styles.menuItem
              }
            >
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
