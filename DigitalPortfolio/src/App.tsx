import React, { useEffect, useState, PureComponent } from 'react';
import { motion } from 'framer-motion';
import axios from "axios";
import { Theme, ThemeMode, tokens } from './theme/ThemeContext';
import { Text, TextType } from './components/text/Text';
import TypingText from './components/animation/TypedText';
import './App.css';
import LeetCodeChart, { LeetCodeData } from './components/display/LeetCodeChart';
import LeetCodeSubmissionsChart from './components/display/LeetCodeSubmissionsChart';
import FadeInOut from './components/animation/FadeInOut';
import SkillsRadarChart from './components/display/SkillsRadarChart';

export const ThemeContext = React.createContext<Theme>(tokens(ThemeMode.LIGHT));

export const useTheme = () => {
    return React.useContext<Theme>(ThemeContext);
}
function App() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let storedTheme = localStorage.getItem('THEME');
    if (storedTheme === null) {
        storedTheme = prefersDarkScheme ? ThemeMode.DARK : ThemeMode.LIGHT;
    }
    const preferredTheme: ThemeMode = storedTheme === ThemeMode.DARK ? ThemeMode.DARK : ThemeMode.LIGHT;
    const [mode, setMode] = useState<ThemeMode>(preferredTheme);
    const [theme, setTheme] = useState<Theme>(tokens(mode));
    // const [isAnimationDone, setIsAnimationDone] = useState(false);
    const [leetCodeData, setLeetCodeData] = useState<LeetCodeData>();
    const [loading, setLoading] = useState(false);

    const toggleTheme = () => {
        if (mode === ThemeMode.DARK) {
            localStorage.setItem('THEME', ThemeMode.LIGHT);
            setMode(ThemeMode.LIGHT);
            setTheme(tokens(ThemeMode.LIGHT));
            const root = document.getElementById('root');
            if (root) {
                root.style.backgroundColor = theme.palette.background;
            }
        } else {
            localStorage.setItem('THEME', ThemeMode.DARK);
            setMode(ThemeMode.DARK);
            setTheme(tokens(ThemeMode.DARK));
            const root = document.getElementById('root');
            if (root) {
                root.style.backgroundColor = theme.palette.background;
            }
        }
    }

    const scaleVariants = {
        initial: { scale: 0 },
        animate: { scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
        // Adjust the stiffness and damping values as needed to get the desired spring effect
    };

    useEffect(() => {
        setLoading(true);
        axios.get("https://leetcode-stats-api.herokuapp.com/clamorea").then((res) => {
            console.log(res);
            setLeetCodeData(res.data);
            setLoading(false);
        });
    }, [])

    useEffect(() => {
        const root = document.getElementById('root');
        if (root) {
            root.style.backgroundColor = theme.palette.background;
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={theme}>
            <div className="appContainer">
                <motion.div {...scaleVariants} className="appContent shadow welcomeContainer" style={{ backgroundColor: theme.palette.accent }}>
                    <Text type={TextType.TITLE} content="Hi!" color={theme.palette.secondary} bold />
                    <TypingText text={`I'm Caleb Lamoreaux, a full stack developer and aspiring data scientist.`} />
                </motion.div>
                <div className="appContent shadow" style={{backgroundColor: theme.palette.primary}}>
                    <Text type={TextType.TITLE} content="My Skills" color={theme.palette.accent} bold />
                </div>
                <SkillsRadarChart theme={theme} />
                <div className="appContent shadow special" style={{backgroundColor: theme.palette.accent}}>
                    <Text type={TextType.TITLE} content="Leetcode" color={theme.palette.secondary} bold />
                    <div className="leetcodeData">
                        <Text type={TextType.BODY} content="Problems Solved:" color={theme.palette.secondary} />
                        {leetCodeData && <LeetCodeChart leetCodeData={leetCodeData} size={200} theme={theme} />}
                        <Text type={TextType.BODY} content="Activity:" color={theme.palette.secondary} />
                        {leetCodeData && <LeetCodeSubmissionsChart size={400} theme={theme} leetCodeData={leetCodeData} />}
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    )
}

export default App;