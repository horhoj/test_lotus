import { Router } from '@router/router';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getRoutePath } from '@router/helpers';
import classNames from 'classnames';
import styles from './App.module.scss';
import { Spinner } from './Spinner';

const getLinkClassNames = ({ isActive }: { isActive: boolean }) =>
  classNames(isActive && styles.headerLinkActive, styles.headerLink);

export const App: React.FC = () => {
  return (
    <>
      <Spinner />
      <div className={styles.wrap}>
        <header className={styles.header}>
          <NavLink to={getRoutePath('main')} className={getLinkClassNames}>
            Аукцион
          </NavLink>
          <NavLink to={getRoutePath('about')} className={getLinkClassNames}>
            О программе
          </NavLink>
        </header>
        <main className={styles.main}>
          <Router />
        </main>
      </div>
    </>
  );
};
