import React from "react";
import { Navigation } from "../Navigation";
import styles from './Layout.module.scss';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Navigation />
      <div className={styles.content}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
};
