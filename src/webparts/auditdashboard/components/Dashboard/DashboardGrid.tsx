import {

    DetailsList,

    DetailsListLayoutMode,

    SelectionMode,

    IColumn

} from "@fluentui/react";

import {

    EyeRegular,

    EditRegular,

    DeleteRegular

} from "@fluentui/react-icons";
import styles from '../Auditdashboard.module.scss';
import { IAuditRequest } from "../../models/IAuditRequest";
import React from "react";


interface IDashboardGridProps {
    auditRequests: IAuditRequest[];
    getStatusClass: (status: string) => string;
    getPriorityClass: (priority: string) => string;
    onView: (auditRequest: IAuditRequest) => void;
    onEdit: (auditRequest: IAuditRequest) => void;
    onDelete: (auditRequest: IAuditRequest) => void;
}

const getColumns = (props: IDashboardGridProps): IColumn[] => ([
    {

        key: "title",

        name: "Title",

        fieldName: "Title",

        minWidth: 180

    },
    {

        key: "auditor",

        name: "Auditor",

        minWidth: 160,

        onRender: (item: IAuditRequest) => item.Auditor?.Title

    },
    {

        key: "status",

        name: "Status",

        minWidth: 120,

        onRender: (item: IAuditRequest) => (

            <span className={props.getStatusClass(item.AuditStatus)}>

                {item.AuditStatus}

            </span>

        )

    },
    {

        key: "priority",

        name: "Priority",

        minWidth: 120,

        onRender: (item: IAuditRequest) => (

            <span className={props.getPriorityClass(item.Priority)}>

                {item.Priority}

            </span>

        )

    },
    {

        key: "actions",

        name: "Actions",

        minWidth: 160,

        onRender: (item: IAuditRequest) => {

            return (

                <div className={styles.actionButtons}>

                    <span onClick={() => props.onView(item)} style={{cursor: 'pointer'}}><EyeRegular /></span>

                    <span onClick={() => props.onEdit(item)} style={{cursor: 'pointer'}}><EditRegular /></span>

                    <span onClick={() => props.onDelete(item)} style={{cursor: 'pointer'}}><DeleteRegular /></span>

                </div>

            );

        }

    }
]);

export const DashboardGrid: React.FunctionComponent<IDashboardGridProps> = (props) => {

    const columns = getColumns(props);

    return (

        <DetailsList 
        columns={columns} 
        items={props.auditRequests} 
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified} 
        />

    );

};