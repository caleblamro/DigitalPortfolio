import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LeetCodeData } from './LeetCodeChart';
import { Theme } from '../../../theme/ThemeContext';
import { Select, ConfigProvider, theme } from 'antd';
const antdTheme = theme;
import * as dayjs from 'dayjs';
import "./Charts.css";

interface LeetCodeSubmissionsChartProps {
    leetCodeData: LeetCodeData;
    size: number;
    theme: Theme;
}
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const LeetCodeSubmissionsChart: React.FC<LeetCodeSubmissionsChartProps> = ({ leetCodeData, theme }) => {

    const [availableMonths, setAvailableMonths] = useState<string[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [filteredData, setFilteredData] = useState<any[]>([]);

    function formatMonthYear(input:string) {
        const parts = input.split('-');
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;  // Subtract 1 to get a 0-based index.
        return `${monthNames[monthIndex]} ${year}`;
    }

    useEffect(() => {
        const months = Object.keys(leetCodeData.submissionCalendar).map((timestamp) => {
            const date = dayjs.unix(Number(timestamp));
            return `${date.year()}-${date.month() + 1}`;
        });
        
        const uniqueMonths:string[] = [];
        months.forEach(month => {
            if (!uniqueMonths.includes(month)) {
                uniqueMonths.push(month);
            }
        });

        setAvailableMonths(uniqueMonths);
        setSelectedMonth("2022-10");
    }, [leetCodeData]);

    useEffect(() => {
        const year = parseInt(selectedMonth.split('-')[0], 10);
        const month = parseInt(selectedMonth.split('-')[1], 10);
        const daysInMonth = new Date(year, month, 0).getDate();

        const monthData: any = Array.from({ length: daysInMonth }).map((_, index) => ({
            date: `${year}-${month}-${index + 1}`,
            submissions: 0
        }));

        Object.keys(leetCodeData.submissionCalendar).forEach((timestamp) => {
            const date = new Date(Number(timestamp) * 1000);
            if (date.getFullYear() === year && date.getMonth() + 1 === month) {
                monthData[date.getDate() - 1].submissions = leetCodeData.submissionCalendar[timestamp];
            }
        });

        setFilteredData(monthData);
    }, [selectedMonth, leetCodeData]);

    return (
        <div className='chartContainer'>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart margin={{left: -35, top: 16}} width={300} height={200} data={filteredData}>
                    <CartesianGrid stroke={theme.palette.background} strokeDasharray="5 5" />
                    <XAxis domain={['dataMin', 'dataMax']} stroke={theme.palette.background} fill={theme.palette.background} dataKey="date" tickFormatter={(value) => {
                        let date = new Date(value);
                        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                    }} />
                    <YAxis stroke={theme.palette.background} fill={theme.palette.background} />
                    <Tooltip
                        contentStyle={{color: theme.palette.accent, alignSelf: "center"}}
                        formatter={(value, name, _) => [`${value} ${name}`]}
                    />
                    <Line activeDot={{ r: 8 }} type="monotone" strokeWidth="3px" dataKey="submissions" width={20} stroke={theme.palette.primary} />
                </LineChart>
            </ResponsiveContainer>
            <div className='monthSelectContainer' style={{ margin: '16px 0' }}>
                <ConfigProvider theme={{algorithm: antdTheme.darkAlgorithm, token: { colorPrimary: theme.palette.primary, colorBgContainer: theme.palette.alert.info, colorBorder: theme.palette.accent, controlOutline: theme.palette.alert.info, fontFamily: 'AnonymousPro', borderRadius: 2 }}}>
                    <Select value={selectedMonth} onChange={e => { 
                        console.log(e);
                        setSelectedMonth(e);
                    }} options={availableMonths.map((month) => {
                        return { label: formatMonthYear(month), value: month }
                    })} />
                </ConfigProvider>
            </div>
        </div>
    );
};

export default LeetCodeSubmissionsChart;