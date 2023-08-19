import { useEffect, useState } from "react";
import "./Text.css";
import { useTheme } from "../../App";

export enum TextType {
    TITLE = "TITLE",
    SUB_TITLE = "SUBTITLE",
    HEADER = "HEADER",
    BODY = "BODY",
    SUB_BODY = "SUB_BODY",
    SUB_TEXT = "SUB_TEXT"
}

export interface TextProps {
    type?: TextType;
    bold?: boolean;
    italic?: boolean;
    style?: React.CSSProperties;
    color?: string;
    content?: string;
    className?: string;
}

//have some hook like useFontSize(), which will return the correct font size per device width
export const Text = (props:TextProps) => {
    const theme = useTheme();
    const {type=TextType.BODY, bold=false, italic=false, style={}, color=theme.palette.text, content="", className} = props;
    const defaultStyles:React.CSSProperties = {fontSize: "1rem", fontWeight: 400};
    const [textStyles, setTextStyles] = useState(defaultStyles);

    const mergeStylesInOrder = (previousStyles:React.CSSProperties, newStyles:React.CSSProperties):React.CSSProperties => {
        return {...previousStyles, ...newStyles};
    }

    const updateTextStyles = () => {
        let newStyles = {...defaultStyles, ...textStyles};
        switch(type){
            case TextType.TITLE:
                newStyles = mergeStylesInOrder(newStyles, {fontSize: "2.5rem", fontWeight: 600});
                break;
            case TextType.SUB_TITLE:
                newStyles = mergeStylesInOrder(newStyles, {fontSize: "1.75rem"});
                break;
            case TextType.HEADER:
                newStyles = mergeStylesInOrder(newStyles, {fontSize: "1.5rem", fontWeight: 600});
                break;
            case TextType.BODY:
                newStyles = mergeStylesInOrder(newStyles, {fontSize: "1rem"});
                break;
            case TextType.SUB_BODY:
                newStyles = mergeStylesInOrder(newStyles, {fontSize: "0.875rem"});
                break;
            case TextType.SUB_TEXT:
                newStyles = mergeStylesInOrder(newStyles, {fontSize: "0.5rem"});
                break;
        }
        if(bold) newStyles = mergeStylesInOrder(newStyles, {fontWeight: 600});
        if(italic) newStyles = mergeStylesInOrder(newStyles, {fontStyle: "italic"});
        setTextStyles(newStyles);
    }
    
    useEffect(() => {
        updateTextStyles();
    }, [props]);

    return(
        <p className={className?`text ${className}`:"text"} style={{...textStyles, ...style, color: color, margin: 0}}>
            {content}
        </p>
    )
}