import * as React from 'react';
import styles from '../Auditdashboard.module.scss';
export interface IDashboardHeaderProps{

    title:string;

}

export const DashboardHeader: React.FunctionComponent<IDashboardHeaderProps> = (props) => {
return (
    <div className={styles.dashboardHeader}>
        <h1>{props.title}</h1>
        <div className={styles.headerLine}></div>
    </div>
);
}