import { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import "./Charts.css";
import { Theme } from '../../../theme/ThemeContext';

const data = [
    {
        subject: 'Java',
        A: 97,
        B: 80,
        fullMark: 100,
    },
    {
        subject: 'Javascript',
        A: 98,
        B: 88,
        fullMark: 100,
    },
    {
        subject: 'React JS',
        A: 89,
        B: 77,
        fullMark: 100,
    },
    {
        subject: 'Typescript',
        A: 82,
        B: 68,
        fullMark: 100,
    },
    {
        subject: 'Python',
        A: 65,
        B: 90,
        fullMark: 100,
    },
    {
        subject: 'C/C++',
        A: 65,
        B: 75,
        fullMark: 100,
    },
];

interface RadarProps {
    theme: Theme
}
interface RadarState {

}

export default class SkillsRadarChart extends PureComponent<RadarProps, RadarState> {
    static demoUrl = 'https://codesandbox.io/s/simple-radar-chart-rjoc6';

    render() {
        return (
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart margin={{top: 20}} cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke={this.props.theme.palette.alert.info} />
                    <PolarAngleAxis color={this.props.theme.palette.accent} dataKey="subject" />
                    <PolarRadiusAxis stroke={this.props.theme.palette.primary} />
                    <Radar name="Skills" dataKey="A" stroke={this.props.theme.palette.accent} fill={this.props.theme.palette.accent} fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        );
    }
}
