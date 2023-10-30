import React, { ReactNode } from 'react';
import { Text, TextProps } from '../text/Text';
import "./Button.css";

export enum Status {
    UNKNOWN = "UNKNOWN",
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    WARNING = "WARNING",
}

export enum ButtonSize {
    LARGE = "LARGE",
    NORMAL = "NORMAL",
    SMALL = "SMALL",
}
export enum ButtonType {
    TEXT = "TEXT",
    BORDERED = "BORDERED",
    DEFAULT = "DEFAULT",
}

interface ButtonProps {
    content: string;
    icon?: ReactNode;
    style?: React.CSSProperties;
    status?: Status;
    textProps?: TextProps;
    size?: ButtonSize;
    type?: ButtonType;
    onClick?: () => void;
}

const Button = ({ content, icon, style, onClick, textProps }: ButtonProps) => {

    return (
        <button className="button" style={{...style }} onClick={onClick}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center" }}>
                { icon ? icon : null}
                <Text {...textProps} content={content} />
            </div>
        </button>
    );
};

export default Button;