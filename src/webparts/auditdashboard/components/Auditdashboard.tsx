import * as React from 'react';
import styles from './Auditdashboard.module.scss';
import type { IAuditdashboardProps } from './IAuditdashboardProps';
import AuditService from '../Services/AuditService';
import { IAuditRequest } from '../models/IAuditRequest';

interface IAuditdashboardState {
  auditRequests: IAuditRequest[];
}

export default class Auditdashboard extends React.Component<IAuditdashboardProps, IAuditdashboardState> {
  constructor(props: IAuditdashboardProps) {
    super(props);
    this.state = {
      auditRequests: []
    };
  }

  public async componentDidMount(): Promise<void> {
    const auditService = new AuditService(this.props.sp);
    const auditRequests = await auditService.getAuditRequests();
    this.setState({ auditRequests });
  }

  public render(): React.ReactElement<IAuditdashboardProps> {
    const { title } = this.props;
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

    const totalAudits=this.state.auditRequests.length || 0;
    const completedAudits=this.state.auditRequests.filter(request=>request.AuditStatus==="Completed").length || 0;
    const rejectedAudits=this.state.auditRequests.filter(request=>request.AuditStatus==="Rejected").length || 0;
    const pendingAudits=totalAudits - completedAudits - rejectedAudits;

    return (
      <div className={styles.auditDashboard}>

        <h1>{title}</h1>

        <div className={styles.cardContainer}>

          <div className={styles.card}>
            <h3>Total Audits</h3>
            <p>{totalAudits}</p>
          </div>

          <div className={styles.card}>
            <h3>Pending</h3>
            <p>{pendingAudits}</p>
          </div>

          <div className={styles.card}>
            <h3>Approved</h3>
            <p>{completedAudits}</p>
          </div>

          <div className={styles.card}>
            <h3>Rejected</h3>
            <p>{rejectedAudits}</p>
          </div>

        </div>

      </div>
    );
  }

 
}
