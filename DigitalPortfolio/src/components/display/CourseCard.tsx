import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../../App';
import { Text, TextType } from '../text/Text';
import "./Display.css";
import { useState } from 'react';

interface CourseCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    imgProps: {
        alt: string;
        location: string;
    }
}

export default function CourseCard({ title, icon, imgProps, description }: CourseCardProps) {
    const [showing, setShowing] = useState(false);
    const overlayControls = useAnimation();
    const contentControls = useAnimation();
    const theme = useTheme();

    const handleMouseEnter = () => {
        showContent();
    };

    const showContent = () => {
        overlayControls.start({ backdropFilter: "blur(10px)" }).then(() => {
            contentControls.start({ y: 0, opacity: 1 }).then(() => {
                setShowing(true);
            });
        });
    }
    const hideContent = () => {
        contentControls.start({ y: -10, opacity: 0 }).then(() => {
            overlayControls.start({ backdropFilter: "blur(0px)" }).then(() => {
                setShowing(false);
            });
        });
    }

    const handleMouseLeave = () => {
        setTimeout(() => {
            hideContent();
        }, 200);
    };
    return (
        <div className="course shadow" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <motion.div
                className='overlay'
                animate={overlayControls}
                initial={{ width: "100%", backdropFilter: "blur(0px)" }}
                transition={{duration: 0.2}}
            >
            </motion.div>
                <motion.div
                    className='icon-group'
                    initial={{ y: 10, opacity: 0 }}
                    animate={contentControls}
                    transition={{ duration: 0.2 }}
                >
                    <div className='flex bleed'>
                        {icon}
                        <Text type={TextType.SUB_BODY} content={title} bold={true} color={theme.palette.secondary} />
                    </div>
                    <Text style={{textAlign: "center", marginTop: "10px", marginBottom: "10px"}} type={TextType.BODY} content={description} color={theme.palette.accent} />
                </motion.div>
            <img className='img' src={imgProps.location} alt={imgProps.alt} />
        </div>
    );
}