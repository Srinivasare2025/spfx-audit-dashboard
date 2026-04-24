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

    return (
      <section className={`${styles.auditdashboard} ${hasTeamsContext ? styles.teams : ''}`}>
         <div className={styles.container}>
          <h1>{title}</h1>
          <div>
            <h3>Total Audits</h3>
            <p>10</p>
          </div>
          <div>
            <h3>Pending</h3>
            <p>4</p>
          </div>
          <div>
            <h3>Completed</h3>
            <p>6</p>
          </div>
        
        </div>
      </section>
    );
  }
}
