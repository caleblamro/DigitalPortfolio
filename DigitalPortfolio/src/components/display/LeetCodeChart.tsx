import { PureComponent } from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import { Theme } from '../../theme/ThemeContext';
import "./Display.css";

export interface LeetCodeData {
    status: "success";
    message: "retrieved";
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
    acceptanceRate: number;
    ranking: number;
    contributionPoints: number;
    reputation: number;
    submissionCalendar: {
        [key: string]: number;
    };
}

const renderActiveShape = (props: { cx: any; cy: any; midAngle: any; innerRadius: any; outerRadius: any; startAngle: any; endAngle: any; fill: any; payload: any; percent: any; value: any; textColor: string }) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g style={{ zIndex: 2 }}>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={props.textColor}>
                {"Solved "}
                <tspan fill={fill}>{value}</tspan>
            </text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={props.textColor}>
                {'('}
                <tspan fill={fill}>{`${(percent * 100).toFixed(2)}%`}</tspan>
                {')'}
            </text>
        </g>
    );
};

interface LeetCodeChartProps {
    size: number;
    theme: Theme;
    leetCodeData: LeetCodeData;
}
interface LeetCodeChartState {
    activeIndex: number;
}
export default class LeetCodeChart extends PureComponent<LeetCodeChartProps, LeetCodeChartState> {
    state = {
        activeIndex: 0,
    };

    intervalId: any = null;

    componentDidMount() {
        // Set an interval to cycle through the active index every 2 seconds
        this.intervalId = setInterval(() => {
            this.setState((prevState) => ({
                activeIndex: (prevState.activeIndex + 1) % 3, // Assuming you have 3 sections (Easy, Medium, Hard)
            }));
        }, 5000);
    }

    componentWillUnmount() {
        // Clear the interval when the component is unmounted
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    onPieEnter = (_: any, index: number) => {
        this.setState({
            activeIndex: index,
        });

        // Clear and restart the interval whenever a user manually hovers over a section
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.intervalId = setInterval(() => {
            this.setState((prevState) => ({
                activeIndex: (prevState.activeIndex + 1) % 3,
            }));
        }, 5000);
    };

    render() {
        const data = [
            { name: 'Easy', value: this.props.leetCodeData.easySolved, fill: this.props.theme.palette.alert.success, textColor: this.props.theme.palette.background },
            { name: 'Medium', value: this.props.leetCodeData.mediumSolved, fill: this.props.theme.palette.alert.warning, textColor: this.props.theme.palette.background, midAngle: 240 },
            { name: 'Hard', value: this.props.leetCodeData.hardSolved, fill: this.props.theme.palette.alert.error, textColor: this.props.theme.palette.background, midAngle: 310 },
        ];

        return (
            <div className='chartContainer'>
                <PieChart width={this.props.size} height={this.props.size}>
                    <Pie
                        isAnimationActive={true}
                        activeIndex={this.state.activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={this.props.size - 160}
                        outerRadius={this.props.size - 140}
                        fill={this.props.theme.palette.primary}
                        stroke={this.props.theme.palette.accent}
                        dataKey="value"
                        onMouseEnter={this.onPieEnter}
                    />
                </PieChart>
            </div>
        );
    }
}