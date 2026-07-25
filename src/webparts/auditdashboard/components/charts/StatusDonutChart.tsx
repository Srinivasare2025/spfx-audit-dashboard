import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export interface IStatusData {
    name: string;
    value: number;
}

export interface IStatusChartProps {
    data: IStatusData[];
}

const COLORS = ['#4CAF50',"#2563eb", "#ef4444",  '#F44336',
    '#FF9800', '#9E9E9E'];

    const getColor = (status: string): string => {

    switch (status.toLowerCase()) {

        case 'approved':
            return '#4CAF50';
        case 'pending':
            return '#FF9800';
        case 'open':
            return '#FF9800';
        case 'rejected':
            return '#F44336';
        default:
            return '#9E9E9E';
    }
};

export const StatusDonutChart = (props: IStatusChartProps): JSX.Element => {
    const cells = props.data.map((entry, index) =>
        React.createElement(Cell, {
            key: `cell-${index}`,
            fill:getColor(entry.name) //COLORS[index % COLORS.length]
        })
    );

    return React.createElement(
        ResponsiveContainer as any,
        { width: '100%', height: 300 },
        React.createElement(
            PieChart as any,
            null,
            React.createElement(
                Pie as any,
                {
                    data: props.data,
                    dataKey: 'value',
                    innerRadius: 60,
                    outerRadius: 100
                },
                ...cells
            ),
            React.createElement(Tooltip as any)
        )
    );
};