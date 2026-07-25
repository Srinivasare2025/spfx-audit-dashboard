import * as React from 'react';
import styles from '../Auditdashboard.module.scss';
import { ClipboardTaskRegular,
    ClockRegular,
    CheckmarkCircleRegular,ThumbDislikeRegular } from '@fluentui/react-icons';

export interface IDashboardCardsProps {
    totalAudits: number;
    openAudits: number;
    approvedAudits: number;
    rejectedAudits: number;
}
export const DashboardCards: React.FunctionComponent<IDashboardCardsProps> = (props) => {

    return (
        <div className={styles.dashboardCards}>
            <div className={`${styles.card} ${styles.totalCard}`}>
                <div className={styles.iconBox}>
                    <ClipboardTaskRegular />
                </div>
                <div>
                    <h4>Total Audits</h4>
                    <span>{props.totalAudits}</span>
                </div>
            </div>
            <div className={`${styles.card} ${styles.pendingCard}`}>
                <div className={styles.iconBox}>
                    <ClockRegular />
                </div>
                <div>
                    <h4>Pending</h4>
                    <span>{props.openAudits}</span>
                </div>
            </div>

            <div className={`${styles.card} ${styles.approvedCard}`}>
            <div className={styles.iconBox}>
              <CheckmarkCircleRegular />
            </div>
            <div>
              <h4>Approved</h4>
              <span>{props.approvedAudits}</span>
            </div>
          </div>

          <div className={`${styles.card} ${styles.rejectedCard}`}>
                      <div className={styles.iconBox}>
                        <ThumbDislikeRegular />
                      </div>
          
                      <div>
                        <h4>Rejected</h4>
                        <span>{props.rejectedAudits}</span>
                      </div>
                    </div>
        </div>);
}