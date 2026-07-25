import * as React from 'react';
import styles from '../Auditdashboard.module.scss';
import { FilterRegular, SearchRegular } from '@fluentui/react-icons';

export interface IDashboardFiltersProps {
    searchText: string;
    statusFilter: string;
    onSearchTextChange: (text: string) => void;
    onStatusFilterChange: (status: string) => void;
}

export const DashboardFilters: React.FunctionComponent<IDashboardFiltersProps> = (props) => {


    return (
        <div className={styles.filterContainer}>

            <div className={styles.searchBox}>
                <SearchRegular />
                <input
                    type="text"
                    placeholder="Search audits..."
                    value={props.searchText}
                    onChange={(e) => props.onSearchTextChange(e.target.value)}
                />
            </div>

            <div className={styles.statusFilter}>
                <FilterRegular />

                <select
                    value={props.statusFilter}

                    onChange={(e) => props.onStatusFilterChange(e.target.value)}
                >
                    <option>All</option>
                    <option>Open</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                </select>
            </div>

        </div>
    );


};