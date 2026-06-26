import * as React from 'react';
import { FontIcon } from '@fluentui/react/lib/Icon';
import {
  // ClipboardListRegular,
  ClipboardTaskRegular,
  ClockRegular,
  CheckmarkCircleRegular,
  ThumbDislikeRegular,
  SearchRegular,
  FilterRegular
} from "@fluentui/react-icons";
import styles from './Auditdashboard.module.scss';
import type { IAuditdashboardProps } from './IAuditdashboardProps';
import AuditService from '../Services/AuditService';
import { IAuditRequest } from '../models/IAuditRequest';
import { StatusDonutChart } from './charts/StatusDonutChart';
import { PriorityBarChart } from './charts/PriorityBarChart';

interface IAuditdashboardState {
  auditRequests: IAuditRequest[];
  loading: boolean;
  errorMessage: string | null;
  statusChartData:any[];
 priorityChartData:any[];
 searchText: string;
 selectedStatus: string;
 allAuditRequests: IAuditRequest[];
}
/*
const statusData = [

  {
    name: "Open",
    value: 1
  },

  {
    name: "Approved",
    value: 3
  },

  {
    name: "Rejected",
    value: 4
  }

];
*/
const priorityChartData = [

  {
    name: 'High',
    value: 4
  },

  {
    name: 'Medium',
    value: 3
  },

  {
    name: 'Low',
    value: 3
  }

];

export default class Auditdashboard extends React.Component<IAuditdashboardProps, IAuditdashboardState> {
  constructor(props: IAuditdashboardProps) {
    super(props);
    this.state = {
      auditRequests: [],
      loading: true,
      errorMessage: '',
      statusChartData: [],
      priorityChartData: [],
      searchText: '',
      selectedStatus: '',
      allAuditRequests: []
    };
  }

  public async componentDidMount(): Promise<void> {
    const auditService = new AuditService(this.props.sp);
    try {

      const auditRequests = await auditService.getAuditRequests();
      this.setState({
        auditRequests,
        loading: false,
        allAuditRequests: auditRequests
      });

      const totalAudits = this.state.auditRequests.length || 0;
    const completedAudits = this.state.auditRequests.filter(request => request.AuditStatus === "Completed").length || 0;
    const rejectedAudits = this.state.auditRequests.filter(request => request.AuditStatus === "Rejected").length || 0;
    const pendingAudits = totalAudits - completedAudits - rejectedAudits;

    const priorityHigh = this.state.auditRequests.filter(request => request.Priority === "High").length || 0;
    const priorityMedium = this.state.auditRequests.filter(request => request.Priority === "Medium").length || 0;
    const priorityLow = this.state.auditRequests.filter(request => request.Priority === "Low").length || 0;
    
    console.log("Total Audits:", totalAudits);
    console.log("Completed Audits:", completedAudits);
    console.log("Rejected Audits:", rejectedAudits);
    console.log("Pending Audits:", pendingAudits);
    console.log("High Priority Audits:", priorityHigh);
    console.log("Medium Priority Audits:", priorityMedium);
    console.log("Low Priority Audits:", priorityLow);
    const statusdata = [
      {
        name: "Open",
        value: pendingAudits
      },
      {
        name: "Approved",
        value: completedAudits
      },
      {
        name: "Rejected",
        value: rejectedAudits
      }
    ];
    
    const prioritydata = [
      {
        name: 'High',
        value: priorityHigh
      },
      {
        name: 'Medium',
        value: priorityMedium
      },
      {
        name: 'Low',
        value: priorityLow
      }
    ];

    this.setState({
      statusChartData: statusdata,
      priorityChartData: prioritydata
    });


    } catch (error) {
      this.setState({
        errorMessage: 'Error fetching audit requests.',
        loading: false
      });
    }
  }

  private applyFilters(): void{
    let filtered= [...this.state.allAuditRequests];
     if(this.state.searchText){
      filtered=filtered.filter(item => item.Title.toLowerCase()
      .includes(this.state.searchText.toLowerCase()));
     }
     if(this.state.selectedStatus){
      console.log("Selected Status:", this.state.selectedStatus);
      if(this.state.selectedStatus==="All"){
        filtered=this.state.allAuditRequests;
      }else{
      filtered=filtered.filter(item => item.AuditStatus === this.state.selectedStatus);
     }
     console.log("Filtered Audit Requests:", filtered);
     this.setState({ auditRequests: filtered });
  };
  private getStatusClass(status: string): string {

    switch (status?.toLowerCase()) {

      case "approved":
        return styles.approvedBadge;

      case "rejected":
        return styles.rejectedBadge;

      case "pending":
      case "open":
        return styles.openBadge;

      default:
        return styles.openBadge;
    }
  }

  private getPriorityClass(priority: string): string {

    switch (priority?.toLowerCase()) {

      case "high":
        return styles.highBadge;

      case "medium":
        return styles.mediumBadge;

      case "low":
        return styles.lowBadge;

      default:
        return styles.lowBadge;
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

        <div className={styles.pageHeader}>
          <h1>Audit Dashboard</h1>
          <div className={styles.headerLine}></div>
        </div>

        <div className={styles.dashboardCards}>

          <div className={`${styles.card} ${styles.totalCard}`}>
            <div className={styles.iconBox}>
              <ClipboardTaskRegular />
            </div>

            <div>
              <h4>Total Audits</h4>
              <span>{totalAudits}</span>
            </div>
          </div>

          <div className={`${styles.card} ${styles.pendingCard}`}>
            <div className={styles.iconBox}>
              <ClockRegular />
            </div>

            <div>
              <h4>Pending</h4>
              <span>{pendingAudits}</span>
            </div>
          </div>

          <div className={`${styles.card} ${styles.approvedCard}`}>
            <div className={styles.iconBox}>
              <CheckmarkCircleRegular />
            </div>

            <div>
              <h4>Approved</h4>
              <span>{completedAudits}</span>
            </div>
          </div>

          <div className={`${styles.card} ${styles.rejectedCard}`}>
            <div className={styles.iconBox}>
              <ThumbDislikeRegular />
            </div>

            <div>
              <h4>Rejected</h4>
              <span>{rejectedAudits}</span>
            </div>
          </div>

        </div>

        <div className={styles.chartSection}>

          <div className={styles.chartCard}>

            <h3>Status Distribution</h3>

            <StatusDonutChart
              data={this.state.statusChartData}
            />

          </div>

          <div className={styles.chartCard}>
            <h3>Priority Distribution</h3>
            <PriorityBarChart
              data={this.state.priorityChartData}
            />
          </div>
        </div>

        <div className={styles.filterContainer}>

          <div className={styles.searchBox}>
            <SearchRegular />
            <input
              type="text"
              placeholder="Search audits..."
              value={this.state.searchText}
              onChange={(e) => {
                this.setState({ searchText: e.target.value }, () => {
                  this.applyFilters();
                });
              }}
            />
          </div>

          <div className={styles.statusFilter}>
            <FilterRegular />

            <select
            value={this.state.selectedStatus}
            onChange={(e) => { 
              this.setState({ selectedStatus: e.target.value }, () => {
                this.applyFilters();
              })
            }}
          >
              <option>All</option>
              <option>Open</option>
              <option>Pending Approval</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

        </div>

        <h2 className={styles.sectionTitle}>
          Audit Requests
        </h2>


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

                  <td>
                    <span className={this.getStatusClass(request.AuditStatus)}>
                      {request.AuditStatus}
                    </span>
                  </td>

                  <td>
                    <span className={this.getPriorityClass(request.Priority)}>
                      {request.Priority}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>
      </div>



    );
  }


}
