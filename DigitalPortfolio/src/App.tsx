import React, { useEffect, useState } from 'react';
// import axios from "axios";
import { Theme, ThemeMode, tokens } from './theme/ThemeContext';
import './App.css';
// import { LeetCodeData } from './components/display/charts/LeetCodeChart';
// import FadeInOut from './components/animation/FadeInOut';
import { BiLogoAws, BiLogoCPlusPlus, BiLogoJava, BiLogoPython, BiLogoReact, BiLogoTypescript } from 'react-icons/bi';
import { TbDatabase, TbSql, TbWorldCode } from 'react-icons/tb';
import TypingText from './components/animation/TypedText';
import { Text, TextType } from './components/text/Text';
import Button, { ButtonType } from './components/button/Button';
import { Step } from './components/display/step/Step';
import Card from './components/card/Card';
import { BsGithub } from 'react-icons/bs';
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { SiLeetcode } from 'react-icons/si';
import Navigation from './global/navigation/Navigation';
import ProjectCard from './components/card/ProjectCard';
import ContactForm from './global/pages/Contact';
import Footer from './global/pages/Footer';
import SplashScreen from './components/loading/SplashScreen';
import AboutMe from './components/animation/AboutMe';

export const ThemeContext = React.createContext<Theme>(tokens(ThemeMode.LIGHT));

export const useTheme = () => {
    return React.useContext<Theme>(ThemeContext);
}
function App() {
    // const [mode, setMode] = useState<ThemeMode>(preferredTheme);
    const [theme, setTheme] = useState<Theme>(tokens(ThemeMode.LIGHT));
    // const [isAnimationDone, setIsAnimationDone] = useState(false);
    // const [leetCodeData, setLeetCodeData] = useState<LeetCodeData>();
    // const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isAnimationDone, setIsAnimationDone] = useState(false);
    const [showAboutMeAnimation, setShowAboutMeAnimation] = useState(false);


    const PROJECTS = [
        {
            title: "Online Provisioning Forms",
            description: "Working closely with the Enterprise Applications team at Veritas Technologies, I was tasked with creating an internal provisioning form builder that sets the stage for multiple majors process transformations.",
            git: "Proprietary",
            key: "ProjectKey1",
            restricted: true,
            skills: [
                {
                    name: "Java",
                    icon: <BiLogoJava style={{ fontSize: '48px', color: theme.palette.primary }} />
                },
                {
                    name: "ReactJS",
                    icon: <BiLogoReact style={{ fontSize: '48px', color: theme.palette.primary }} />
                },

                {
                    name: "SQL",
                    icon: <TbSql style={{ fontSize: '48px', color: theme.palette.primary }} />
                }
            ]
        },
        {
            title: "Train GPT",
            description: "Utilizing many different open source technologies, along with the OpenAI API, I created an application which translates unstructured files to GPT vector embeddings. Once submitted, a similarity search is performed to optimize the context given to the LLM.",
            git: "Train GPT Repo",
            key: "ProjectKey3",
            repo: "https://github.com/caleblamro/traingpt",
            restricted: false,
            skills: [
                {
                    name: "ReactJS",
                    icon: <BiLogoReact style={{ fontSize: '48px', color: theme.palette.primary }} />
                },
                {
                    name: "Typescript",
                    icon: <BiLogoTypescript style={{ fontSize: '48px', color: theme.palette.primary }} />
                },
                {
                    name: "SQL",
                    icon: <TbSql style={{ fontSize: '48px', color: theme.palette.primary }} />
                }
            ]
        },
        {
            title: "AGILE Management Application",
            git: "EffortLogger Repo",
            key: "ProjectKey2",
            repo: "https://github.com/caleblamro/EffortLogger_M18",
            description: "Studying the AGILE methodology during my CSE 360 course, students were tasked to team up with 4-5 other classmates and develop an application and deliver on the stakeholder requirements outlined in the formal documents for the proposal.",
            restricted: false,
            skills: [
                {
                    name: "Java",
                    icon: <BiLogoJava style={{ fontSize: '48px', color: theme.palette.primary }} />
                },
                {
                    name: "SQL",
                    icon: <TbSql style={{ fontSize: '48px', color: theme.palette.primary }} />
                },
                {
                    name: "AWS",
                    icon: <BiLogoAws style={{ fontSize: '48px', color: theme.palette.primary }} />
                }
            ]
        },
        {
            title: "GTM Dashboard",
            description: "For my first internship with Veritas, I was tasked with transforming an existing Java applet used to manage orders being checked for global trade compliance. This application decreased latency, and added more features to make managing these order more efficient.",
            git: "Proprietary",
            key: "ProjectKey4",
            restricted: true,
            skills: [
                {
                    name: "Java",
                    icon: <BiLogoJava style={{ fontSize: '48px', color: theme.palette.primary }} />
                },
                {
                    name: "ReactJS",
                    icon: <BiLogoReact style={{ fontSize: '48px', color: theme.palette.primary }} />
                },

                {
                    name: "SQL",
                    icon: <TbSql style={{ fontSize: '48px', color: theme.palette.primary }} />
                }
            ]
        },
        {
            title: "Lexical Analyzer",
            description: "One key project for CSE 340 was creating a program that will parse tokens from a string given a regular expression that represents that token. Thompson's construction is used along with REGs that were generated to make this process elegant.",
            git: "Proprietary",
            key: "ProjectKey5",
            restricted: true,
            skills: [
                {
                    name: "C++",
                    icon: <BiLogoCPlusPlus style={{ fontSize: '48px', color: theme.palette.primary }} />
                },
            ]
        },
    ]
    const SKILLS = [
        {
            link: 'https://github.com/caleblamro',
            title: 'Git Version Control',
            icon: <BsGithub style={{ fontSize: "32px", color: theme.palette.primary }} />,
            description: `Git has been essential to my software development process. I've used it in both professional projects and personal ones, it helps me maintain my code, and easily experiment with new features.`
        },
        {
            title: 'Web Development',
            icon: <TbWorldCode style={{ width: 32, height: 32, color: theme.palette.primary }} />,
            description: `I have over 2 years of web development experience, a common UI stack I'll use is ReactJS + Typescript. I love using component libraries like Ant Design, and animation libraries like Framer Motion to make my applications pop.`
        },
        {
            title: 'Mobile Applications',
            icon: <HiOutlineDevicePhoneMobile style={{ width: 32, height: 32, color: theme.palette.primary }} />,
            description: `With my experience in React, I've been learning React Native with Expo. It's been a very familiar development experience and so far I've found it to be just as enjoyable as web development.`
        },
        {
            title: 'Python and Kaggle',
            icon: <BiLogoPython style={{ fontSize: "38px", color: theme.palette.primary }} />,
            description: `I stumbled upon Kaggle while doing a simple reinforcement learning project. It's been my guide to machine learning and artificial intelligence since then, and I'm always working through the different courses on it.`
        },
        {
            title: 'Database Infrastructure',
            icon: <TbDatabase style={{ width: 32, height: 32, color: theme.palette.primary }} />,
            description: `I've built backends with various versions of SQL, and experimented with others like MongoDB and Pinecone. Designing different databases is extremely fun, and I love to test multiple different implementations if permitted.`
        },
        {
            link: 'https://leetcode.com/clamorea/',
            title: 'Algorithms and Data Structures',
            icon: <SiLeetcode style={{ width: 32, height: 32, color: theme.palette.primary }} />,
            description: `To keep concepts fresh in my mind, I like to practice for coding interviews with Leetcode. I've completed over 200 problems, and continue to increase that number every day.`
        }
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia('(max-width: 767px)').matches);
        };
        setTheme(tokens(ThemeMode.LIGHT));
        // Initial check
        handleResize();

        // Listen for changes
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // setLoading(true);
        // axios.get("https://leetcode-stats-api.herokuapp.com/clamorea").then((res) => {
        //     setLeetCodeData(res.data);
        //     setLoading(false);
        // });
    }, [])

    useEffect(() => {
        const root = document.getElementById('root');
        if (root) {
            root.style.backgroundColor = theme.palette.background;
        }
    }, [theme]);


    useEffect(() => {
    }, []);
    return (
        <ThemeContext.Provider value={theme}>
            <main className="appContainer" style={{ backgroundColor: theme.palette.background }}>
                <SplashScreen setIsAnimationDone={setIsAnimationDone} isAnimationDone={isAnimationDone} />
                <Navigation showAboutAnim={setShowAboutMeAnimation} isMobile={isMobile} />
                <div id="group1" className='group'>
                    <div className="heroContentContainer">
                        <TypingText textProps={{ type: TextType.TITLE, bold: true }} text={`Hello, I'm a full stack developer`} />
                        <TypingText textProps={{ type: TextType.BODY }} text={`My passion is developing beautiful user-interfaces for functional applications.`} />
                        <Button onClick={() => setShowAboutMeAnimation((prev) => !prev)} type={ButtonType.BORDERED} style={{ backgroundColor: theme.palette.accent, width: "fit-content" }} textProps={{ color: theme.palette.background }} content={'My journey'} />
                    </div>
                    {!isMobile && <div>
                        <Step totalSteps={4} step={1} />
                    </div>}
                </div>
                <div className='staticAnimationContainer'>
                    <AboutMe setShowAnimation={setShowAboutMeAnimation} showAnimation={showAboutMeAnimation} />
                </div>
                <div className='skillsHeaderContainer'>
                    <Text type={TextType.TITLE} color={theme.palette.accent} bold={true} content='Skills' />
                    <div className="divider" style={{ backgroundColor: theme.palette.accent }}></div>
                    <div id="group2" className='group'>
                        <div className='skillsContainer'>
                            {SKILLS.map((instance, index) => {
                                return(
                                    <Card key={`skills${index}`} {...instance} />
                                )
                            })}
                        </div>
                        {!isMobile && <div>
                            <Step totalSteps={4} step={2} />
                        </div>}
                    </div>
                </div>
                <div className='skillsHeaderContainer'>
                    <Text type={TextType.TITLE} color={theme.palette.accent} bold={true} content='Projects' />
                    <div className="divider" style={{ backgroundColor: theme.palette.accent }}></div>
                    <div id="group3" className='group'>
                        <div className="projectsContainer">
                            {PROJECTS.map((instance, index) => (
                                <div key={`projectCard${index}`} className='container'>
                                    <ProjectCard {...instance} />
                                </div>
                            ))}
                        </div>
                        { !isMobile && <div>
                            <Step totalSteps={4} step={3} />
                        </div>}
                    </div>
                </div>
                <div className='skillsHeaderContainer'>
                    <Text type={TextType.TITLE} color={theme.palette.accent} bold={true} content='Contact' />
                    <div className="divider" style={{ backgroundColor: theme.palette.accent }}></div>
                    <div id="group4" className='group center'>
                        {!isMobile && <div>
                        </div>}
                        <div>
                            <ContactForm />
                        </div>
                        {!isMobile && <div>
                            <Step totalSteps={4} step={4} />
                        </div>}
                    </div>
                </div>
                <Footer />
            </main>
        </ThemeContext.Provider>
    )
}
export default App;