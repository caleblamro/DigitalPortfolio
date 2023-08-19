import React, { ReactNode, useState } from 'react';
import { useTheme } from '../../App';
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

const Button = ({ content, icon, style, onClick, status = Status.UNKNOWN, textProps }: ButtonProps) => {
    const theme = useTheme();

    return (
        <div className="button" style={{display: "flex", alignItems: "center", padding: "0 15px", height: 50, borderRadius: 25, ...style }} onClick={onClick}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center" }}>
                { icon ? icon : null}
                <Text {...textProps} content={content} />
            </div>
        </div>
    );
};

export default Button;