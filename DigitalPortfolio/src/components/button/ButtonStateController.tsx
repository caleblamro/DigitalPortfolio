import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useTheme } from "../../App";
import { Status } from "./Button";
interface ButtonStateProps {
    children: ReactNode;
    status: Status
}

export default function ButtonStateController({children, status}: ButtonStateProps) {
    const theme = useTheme();
    const [content, setContent] = useState<ReactNode>(children);
    // const fadeAnim = useRef(new Animated.Value(1)).current;

    // const loader = <ActivityIndicator size="small" color={theme.palette.primary.main} />;
    // const success = <AntDesign name="checkcircle" size={24} color={theme.palette.alert.success} />;
    // const error = <AntDesign name="closecircle" size={24} color={theme.palette.alert.error} />;

    // useEffect(() => {
    //     Animated.timing(fadeAnim, { toValue: 0, duration: 100, useNativeDriver: true }).start();
    //     setTimeout(() => {
    //         if(status === Status.UNKNOWN) {
    //             setContent(children);
    //         }else if(status === Status.ERROR) {
    //             setContent(error);
    //         }else if(status === Status.LOADING){
    //             setContent(loader);
    //         }else{
    //             setContent(success);
    //         }
    //         Animated.timing(fadeAnim, { toValue: 1, duration: 100, useNativeDriver: true }).start();
    //     }, 150);
    // }, [status])

    return(
        <div style={{}}>
            {content}
        </div>
    );
}