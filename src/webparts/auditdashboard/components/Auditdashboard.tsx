import * as React from 'react';
import styles from './Auditdashboard.module.scss';
import type { IAuditdashboardProps } from './IAuditdashboardProps';
import AuditService from '../Services/AuditService';
import { IAuditRequest } from '../models/IAuditRequest';


interface IAuditdashboardState {
  auditRequests: IAuditRequest[];
  loading: boolean;
  errorMessage: string | null;
}

export default class Auditdashboard extends React.Component<IAuditdashboardProps, IAuditdashboardState> {
  constructor(props: IAuditdashboardProps) {
    super(props);
    this.state = {
      auditRequests: [],
      loading: true,
      errorMessage: ''
    };
  }

  public async componentDidMount(): Promise<void> {
    const auditService = new AuditService(this.props.sp);
    try {

      const auditRequests = await auditService.getAuditRequests();
      this.setState({
        auditRequests,
        loading: false
      });
    } catch (error) {
      this.setState({
        errorMessage: 'Error fetching audit requests.',
        loading: false
      });
    }
  }

  public render(): React.ReactElement<IAuditdashboardProps> {
    const { title } = this.props;

    if (this.state.loading) {
      return <div>Loading audit requests...</div>;
    }

    if (this.state.errorMessage) {
      return <div>{this.state.errorMessage}</div>;
    }
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

    const totalAudits = this.state.auditRequests.length || 0;
    const completedAudits = this.state.auditRequests.filter(request => request.AuditStatus === "Completed").length || 0;
    const rejectedAudits = this.state.auditRequests.filter(request => request.AuditStatus === "Rejected").length || 0;
    const pendingAudits = totalAudits - completedAudits - rejectedAudits;

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

       <div></div>
    <div>
      <input type="text" placeholder="Search audits" />
    </div>
<div></div>
    
    <div>
      <select>
        <option>All</option>
        <option>Pending</option>
        <option>Approved</option>
      </select>
    </div>

        <h2>Audit Requests</h2>
        <div>
          <table className={styles.auditTable}>
            <thead>
              <tr>
                <th>Title</th> 
                <th>Auditor</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {this.state.auditRequests.map((request) => (
                
                <tr key={request.Id}>
                  <td>{request.Title}</td>
                   <td>{request.Auditor?.Title}</td>
                  <td>{request.AuditStatus}</td>
                  <td>{request.Priority}</td>
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>

      </div>
      


    );
  }


}
