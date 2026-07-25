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
import { DashboardHeader } from './Dashboard/DashboardHeader';
import { DashboardCards } from './Dashboard/Dashboardcards';
import { DashboardCharts } from './Dashboard/DashboardCharts';
import { DashboardFilters } from './Dashboard/DashboardFilters';

interface IAuditdashboardState {
  auditRequests: IAuditRequest[];
  loading: boolean;
  errorMessage: string | null;
  statusChartData: any[];
  priorityChartData: any[];
  filteredAuditRequests: IAuditRequest[];
  searchText: string;
  statusFilter: string;
}


export default class Auditdashboard extends React.Component<IAuditdashboardProps, IAuditdashboardState> {
  constructor(props: IAuditdashboardProps) {
    super(props);
    this.state = {
      auditRequests: [],
      loading: true,
      errorMessage: '',
      statusChartData: [],
      priorityChartData: [],
      filteredAuditRequests: [],
      searchText: '',
      statusFilter: 'All'    
  };
}

private applyFilters(): void {

    const {

        auditRequests,

        searchText,

        statusFilter

    } = this.state;

    let filtered = auditRequests;

    if (searchText) {

        filtered = filtered.filter(item =>

            item.Title.toLowerCase().includes(searchText.toLowerCase()) ||

            item.Auditor?.Title.toLowerCase().includes(searchText.toLowerCase())

        );

    }

    if (statusFilter !== "All") {

        filtered = filtered.filter(item =>

            item.AuditStatus === statusFilter

        );

    }

    this.setState({

        filteredAuditRequests: filtered

    });

}

private onSearchTextChange = (text:string):void=>{

    this.setState({

        searchText:text

    },()=>{

        this.applyFilters();

    });

}

private onStatusFilterChange=(status:string):void=>{

    if(status==="Approved"){
        status="Completed";
    }
    
    this.setState({

        statusFilter:status

    },()=>{

        this.applyFilters();

    });

}
public async componentDidMount(): Promise <void> {
  const auditService = new AuditService(this.props.sp);
  try {

    const auditRequests = await auditService.getAuditRequests();
    this.setState({
      auditRequests,
      loading: false,
      filteredAuditRequests: auditRequests
    });

    const totalAudits = this.state.filteredAuditRequests.length || 0;
    const completedAudits = this.state.filteredAuditRequests.filter(request => request.AuditStatus === "Completed").length || 0;
    const rejectedAudits = this.state.filteredAuditRequests.filter(request => request.AuditStatus === "Rejected").length || 0;
    const pendingAudits = totalAudits - completedAudits - rejectedAudits;

    const priorityHigh = this.state.filteredAuditRequests.filter(request => request.Priority === "High").length || 0;
    const priorityMedium = this.state.filteredAuditRequests.filter(request => request.Priority === "Medium").length || 0;
    const priorityLow = this.state.filteredAuditRequests.filter(request => request.Priority === "Low").length || 0;

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


  } catch(error) {
    this.setState({
      errorMessage: 'Error fetching audit requests.',
      loading: false
    });
  }
}

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
  public render(): React.ReactElement < IAuditdashboardProps > {
  const { title } = this.props;

  if(this.state.loading) {
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

const totalAudits = this.state.filteredAuditRequests.length || 0;
const completedAudits = this.state.filteredAuditRequests.filter(request => request.AuditStatus === "Completed").length || 0;
const rejectedAudits = this.state.filteredAuditRequests.filter(request => request.AuditStatus === "Rejected").length || 0;
const pendingAudits = totalAudits - completedAudits - rejectedAudits;



return (

  <div className={styles.auditDashboard}>

    <DashboardHeader title="Audit Dashboard" />
    <DashboardCards
      totalAudits={totalAudits}
      openAudits={pendingAudits}
      approvedAudits={completedAudits}
      rejectedAudits={rejectedAudits}
    />

    <div className={styles.chartSection}>
      <h3>Status Distribution</h3>
      <DashboardCharts
        statusChartData={this.state.statusChartData}
        priorityChartData={this.state.priorityChartData}
      />
    </div>

    <DashboardFilters
      searchText={this.state.searchText}
      statusFilter={this.state.statusFilter}
      onSearchTextChange={this.onSearchTextChange}
      onStatusFilterChange={this.onStatusFilterChange}
    />

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

          {this.state.filteredAuditRequests.map((request) => (

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
function componentDidMount() {
  throw new Error('Function not implemented.');
}

