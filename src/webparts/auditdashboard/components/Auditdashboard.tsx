import * as React from 'react';
import styles from './Auditdashboard.module.scss';
import type { IAuditdashboardProps } from './IAuditdashboardProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Auditdashboard extends React.Component<IAuditdashboardProps> {
  public render(): React.ReactElement<IAuditdashboardProps> {
    const {
      description,
      title,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;
/*
    return (
      <section className={`${styles.auditdashboard} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
          <div>Web part title: <strong>{escape(title)}</strong></div>
        </div>
      </section>
    );
    */
    return (
      <div className={styles.auditDashboard}>

        <h1>{this.props.title}</h1>

        <div className={styles.cardContainer}>

          <div className={styles.card}>
            <h3>Total Audits</h3>
            <p>25</p>
          </div>

          <div className={styles.card}>
            <h3>Pending</h3>
            <p>10</p>
          </div>

          <div className={styles.card}>
            <h3>Approved</h3>
            <p>12</p>
          </div>

          <div className={styles.card}>
            <h3>Rejected</h3>
            <p>3</p>
          </div>

        </div>

      </div>
    );
  }
}
