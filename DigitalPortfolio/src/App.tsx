import React, { useEffect, useState, PureComponent } from 'react';
import { motion } from 'framer-motion';
import axios from "axios";
import { Theme, ThemeMode, tokens } from './theme/ThemeContext';
import { Text, TextType } from './components/text/Text';
import TypingText from './components/animation/TypedText';
import './App.css';
import LeetCodeChart, { LeetCodeData } from './components/display/LeetCodeChart';
import LeetCodeSubmissionsChart from './components/display/LeetCodeSubmissionsChart';
// import FadeInOut from './components/animation/FadeInOut';
import { BiLogoAws, BiLogoJava, BiLogoReact, BiLogoTypescript } from 'react-icons/bi';
import { TbSql } from 'react-icons/tb'; 
import SkillsRadarChart from './components/display/SkillsRadarChart';
import Resources from './components/display/Resources';
import ProjectCard from './components/display/ProjectCard';
import { SiKaggle } from 'react-icons/si';


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
        // Adjust the stiffness and damping values as need{{{{{{{{{{{{{ed to get the desired spring effect
    };

    const PROJECTS = [
        {
            title: "Online Provisioning Forms",
            description: "Working closely with the Enterprise Applications team at Veritas Technologies, I was tasked with creating an application that sets the stage for multiple majors process transformations.",
            git: "Proprietary",
            restricted: true,
            skills: [
                {
                    name: "Java",
                    icon: <BiLogoJava style={{fontSize: '48px', color: theme.palette.primary}} />
                },
                {
                    name: "ReactJS",
                    icon: <BiLogoReact style={{fontSize: '48px', color: theme.palette.primary}} />
                },
                
                {
                    name: "SQL",
                    icon: <TbSql style={{fontSize: '48px', color: theme.palette.primary}} />
                }
            ]
        },
        {
            title: "AGILE Management Application (EffortLogger)",
            git: "EffortLogger Repo",
            repo: "https://github.com/caleblamro/EffortLogger_M18",
            description: "Studying the AGILE methodology during my CSE 360 course, students were tasked to team up with 4-5 other classmates and develop an application and deliver on the stakeholder requirements outlined in the formal documents for the proposal.",
            restricted: false,
            skills: [
                {
                    name: "Java",
                    icon: <BiLogoJava style={{fontSize: '48px', color: theme.palette.primary}} />
                },
                {
                    name: "SQL",
                    icon: <TbSql style={{fontSize: '48px', color: theme.palette.primary}} />
                },
                {
                    name: "AWS",
                    icon: <BiLogoAws style={{fontSize: '48px', color: theme.palette.primary}} />
                }
            ]
        },
        {
            title: "Train GPT",
            description: "Utilizing many different open source technologies, along with the OpenAI API, I created an application which translates unstructured files to GPT vector embeddings. Once submitted, a similarity search is performed to optimize the context given to the LLM.",
            git: "Train GPT Repo",
            repo: "https://github.com/caleblamro/traingpt",
            restricted: false,
            skills: [
                {
                    name: "ReactJS",
                    icon: <BiLogoReact style={{fontSize: '48px', color: theme.palette.primary}} />
                },
                {
                    name: "Typescript",
                    icon: <BiLogoTypescript style={{fontSize: '48px', color: theme.palette.primary}} />
                },
                {
                    name: "SQL",
                    icon: <TbSql style={{fontSize: '48px', color: theme.palette.primary}} />
                }
            ]
        },
    ]

    useEffect(() => {
        setLoading(true);
        axios.get("https://leetcode-stats-api.herokuapp.com/clamorea").then((res) => {
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
            <main className="appContainer">
                <motion.div {...scaleVariants} className="appContent shadow welcomeContainer" style={{ backgroundColor: theme.palette.accent }}>
                    <Text type={TextType.TITLE} content="Hi!" color={theme.palette.secondary} bold />
                    <TypingText text={`I'm Caleb Lamoreaux, a full stack developer and aspiring data scientist.`} />
                </motion.div>
                <div className="appContent shadow" style={{backgroundColor: theme.palette.primary}}>
                    <Text type={TextType.TITLE} content="Skills" color={theme.palette.accent} bold />
                </div>
                <SkillsRadarChart theme={theme} />
                <div className="appContent shadow special" style={{backgroundColor: theme.palette.accent}}>
                    <Text type={TextType.TITLE} content="Leetcode" color={theme.palette.secondary} bold />
                    <div className="leetcodeData">
                        <Text type={TextType.BODY} content="Problems Solved" color={theme.palette.secondary} />
                        {leetCodeData && <LeetCodeChart leetCodeData={leetCodeData} size={200} theme={theme} />}
                        <Text type={TextType.BODY} content="Activity " color={theme.palette.secondary} />
                        {leetCodeData && <LeetCodeSubmissionsChart size={400} theme={theme} leetCodeData={leetCodeData} />}
                    </div>
                </div>
                <div className="appContent" style={{backgroundColor: theme.palette.primary}}>
                    <Text type={TextType.TITLE} content="Projects" color={theme.palette.accent} />
                </div>
                <div className="projectsContainer">
                    {PROJECTS.map((instance) => (
                        <div className='container'>
                            <ProjectCard {...instance} />
                        </div>
                    ))}
                </div>
                <div className="appContent shadow" style={{backgroundColor: theme.palette.accent}}>
                    <Text type={TextType.TITLE} content="Resources" color={theme.palette.secondary} />
                    <Resources theme={theme} />
                </div>
                <div className="appContent shadow" style={{backgroundColor: theme.palette.accent}}>
                    <Text type={TextType.TITLE} content="Courses" color={theme.palette.secondary} />
                    <div className="coursesContainer">
                        <div className="course">
                            <img className='img' src="/files/Intro-to-Deep-Learning.png" alt="Kaggle certification for introduction to deep learning." />
                            <div className='icon-group'>
                                <SiKaggle style={{fontSize: '48px', color: theme.palette.primary}} />
                                <Text type={TextType.BODY} content="Intro to Deep Learning" color={theme.palette.secondary} />
                            </div>
                        </div>
                        <div className="course">
                            <img className='img' src="/files/Intro-to-Machine-Learning.png" alt="Kaggle certification for introduction to machine learning." />
                            <div className='icon-group'>
                                <SiKaggle style={{fontSize: '48px', color: theme.palette.primary}} />
                                <Text type={TextType.BODY} content="Intro to Machine Learning" color={theme.palette.secondary} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="appContent shadow" style={{backgroundColor: theme.palette.accent}}>
                    <Text type={TextType.TITLE} content="Awards" color={theme.palette.secondary} />
                    
                </div>
            </main>
        </ThemeContext.Provider>
    )
}

export default App;