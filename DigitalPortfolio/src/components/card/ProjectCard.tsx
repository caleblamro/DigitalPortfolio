import { useTheme } from "../../App";
import { Text, TextType } from "../text/Text";
import { BiLogoGithub, BiSolidLock } from "react-icons/bi";
import "./Card.css";
interface ProjectCardProps {
    title: string;
    description: string;
    repo?: string;
    restricted?: boolean;
    git: string;
    skills: { name: string; icon: React.ReactNode }[];
}

export default function ProjectCard({title, skills, description, git, restricted, repo}: ProjectCardProps) {
    const theme = useTheme();

    const openCardModal = () => {

    }

    return(
        <div tabIndex={0} onClick={() => openCardModal()} className="a appContent projectCard" style={{backgroundColor: theme.palette.accent}}>
            <Text type={TextType.BODY } bold={true} content={title} color={theme.palette.background} />
            {restricted &&
                <span className="linkStyle">
                    <BiSolidLock style={{fontSize: '24px', color: theme.palette.alert.error}} />
                    <Text style={{display: "flex", alignItems: "center"}} type={TextType.BODY} content={git} bold={true} color={theme.palette.alert.error} />
                </span>
            }
            {!restricted &&
                <a className="linkStyle" target="_blank" style={{textDecorationColor: theme.palette.alert.special}} href={repo}>
                    <BiLogoGithub style={{fontSize: '24px', color: theme.palette.alert.special}} />
                    <Text style={{display: "flex", alignItems: "center"}} type={TextType.BODY} content={git} bold={true} color={theme.palette.alert.special} />
                </a>
            }
            <Text type={TextType.SUB_BODY} content={description} color={theme.palette.background} />
            <div className="projectSkills">
                {skills.map((value, index) => {
                    return(
                        <div key={`skill${index}`} title={value.name}>
                        {value.icon}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}