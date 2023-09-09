import React, { useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import aboutAnimation from "../animation/about-me.json";
import lottie, { AnimationItem } from 'lottie-web';
import "./AboutMe.css";

interface AboutMeProps {
    showAnimation: boolean;
    setShowAnimation: Dispatch<SetStateAction<boolean>>;
}

const AboutMe: React.FC<AboutMeProps> = ({ showAnimation, setShowAnimation }) => {
    const container = useRef(null);
    let anim: AnimationItem | null = null;  // Declare anim outside useEffect

    useEffect(() => {
        if (showAnimation) {
            if (container.current) {
                anim = lottie.loadAnimation({
                    container: container.current,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,  // Set autoplay to false
                    animationData: aboutAnimation,
                });
                anim.play();  // Manually play the animation
            }
            anim?.addEventListener('complete', () => {
                setShowAnimation(false);
            });
        } else if (anim) {
            anim.destroy();  // Manually destroy the animation
        }
        return () => {
            if (anim) {
                anim.destroy();
            }
        };
    }, [showAnimation]);

    return (
        <AnimatePresence>
            {showAnimation && (
                <motion.div
                    className="aboutMeContainer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: '200px', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="aboutMeAnimationContainer" ref={container}></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AboutMe;