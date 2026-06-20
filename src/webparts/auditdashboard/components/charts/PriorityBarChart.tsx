import React from 'react';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';

export interface IPriorityData {
    name: string;
    value: number;
}

export interface IPriorityBarChartProps {
    data: IPriorityData[];
}

export const PriorityBarChart = (
    props: IPriorityBarChartProps
): JSX.Element => {

    return React.createElement(
        ResponsiveContainer as any,
        {
            width: '100%',
            height: 300
        },

        React.createElement(
            BarChart as any,
            {
                data: props.data
            },

            React.createElement(CartesianGrid as any, {
                strokeDasharray: '3 3'
            }),

            React.createElement(XAxis as any, {
                dataKey: 'name'
            }),

            React.createElement(YAxis as any),

            React.createElement(Tooltip as any),

            React.createElement(Bar as any, {
                dataKey: 'value',
                fill: '#2563eb',
                radius: [6, 6, 0, 0]
            })
        )
    );
};