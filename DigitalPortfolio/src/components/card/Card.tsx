import { useTheme } from "../../App";
import { Text, TextType } from "../text/Text";
import "./Card.css";
interface CardProps {
    title: string;
    icon: React.ReactNode;
    description: string;
    link?: string;
}

const Card:React.FC<CardProps> = ({title, icon, description, link}) => {
    const theme = useTheme();

    return(
        <a className="a" target={link ? "_blank" : ""} href={link}>
            <div className="card" style={{backgroundColor: theme.palette.accent}}>
                {icon}
                <Text color={theme.palette.secondary} type={TextType.BODY} bold={true} content={title} />
                <Text color={theme.palette.secondary} type={TextType.SUB_BODY} content={description} />
            </div>
        </a>
    )
}

export default Card;