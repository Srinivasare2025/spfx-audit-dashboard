import * as React from 'react';
import styles from '../Auditdashboard.module.scss'; 
import { StatusDonutChart } from '../charts/StatusDonutChart';
import { PriorityBarChart } from '../charts/PriorityBarChart';

export interface IDashboardChartsProps {
    statusChartData: any[];
    priorityChartData: any[];
}


export const DashboardCharts: React.FunctionComponent<IDashboardChartsProps> = (props) => {
return (
    
        <div className={styles.chartCard}>            
        <StatusDonutChart data={props.statusChartData} className={styles.chartDonut} />
        <PriorityBarChart data={props.priorityChartData} className={styles.chartBar} />
        </div>
);
}