import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Lottie, { AnimationItem } from 'lottie-web';
import './Animation.css';
import inOutAnimation from "../animation/in-out.json";
import { motion, useAnimation } from 'framer-motion';

type AnimationProps = {
    setIsAnimationDone: Dispatch<SetStateAction<boolean>>;
    isAnimationDone: boolean;
};

const SplashScreen: React.FC<AnimationProps> = ({ setIsAnimationDone, isAnimationDone }) => {
    const container = useRef<HTMLDivElement | null>(null);
    const animationControls = useAnimation();

    useEffect(() => {
        if (container.current) {
            const animation: AnimationItem = Lottie.loadAnimation({
                container: container.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: inOutAnimation
            });
            animation.addEventListener('complete', () => {
                animationControls.start({opacity: 0}).then(() => {
                    setIsAnimationDone(true);
                });
            });

            return () => animation.removeEventListener('complete', () => {
                animationControls.start({opacity: 0}).then(() => {
                    setIsAnimationDone(true);
                });
            });
        }
    }, []);

    return (
        isAnimationDone ? null : <motion.div initial={{opacity: 1}} animate={animationControls} ref={container} className='animation-view' />
    );
}

export default SplashScreen;