import React, { useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../assets/animation/ThemeSwitch.json";
import { ThemeMode } from './ThemeContext'; // your ThemeContext file path
import { useTheme } from "../App";

interface ThemeToggleProps {
    toggleTheme: (mode: ThemeMode) => void;
}

const ThemeSwitch: React.FC<ThemeToggleProps> = (props) => {
    const theme = useTheme();

    const animationRef = useRef<LottieRefCurrentProps | null>(null);

    // On theme switch
    const switchTheme = () => {
        animationRef.current?.setSpeed(2);
        if (theme.mode === ThemeMode.LIGHT) {
            props.toggleTheme(ThemeMode.DARK); // function to set theme to dark
            animationRef.current?.playSegments([0, 60], true); // play first half of lottie animation
        } else {
            props.toggleTheme(ThemeMode.LIGHT); // function to set theme to light
            animationRef.current?.playSegments([133, 185], true); // play second half of lottie animation
        }
    }
    useEffect(() => {
        if (theme.mode === ThemeMode.DARK) {
            animationRef.current?.goToAndStop(133, true);
        } else {
            animationRef.current?.goToAndStop(0, true);
        }
    }, []);
    return (
        <div onClick={switchTheme}>
            <Lottie
                className="button"
                animationData={animationData}
                lottieRef={animationRef}
                loop={false}
                autoPlay={false}
                style={{ width: 128, height: 64 }}
            />
        </div>
    );
}

export default ThemeSwitch;