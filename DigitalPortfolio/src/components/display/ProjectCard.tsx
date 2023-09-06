import { useTheme } from "../../App";
import { Text, TextType } from "../text/Text";
import { BiLogoGithub, BiSolidLock } from "react-icons/bi";
import "./Display.css";
import { Tooltip } from "antd";
interface ProjectCardProps {
    title: string;
    description: string;
    repo?: string;
    restricted?: boolean;
    git: string;
    skills: { name: string; icon: React.ReactNode }[];   
    key: string;
}

export default function ProjectCard({title, skills, description, git, restricted, repo, key}: ProjectCardProps) {
    const theme = useTheme();
    return(
        <div key={key} className="appContent projectCard shadow" style={{backgroundColor: theme.palette.accent}}>
            <Text type={TextType.HEADER } bold={true} content={title} color={theme.palette.background} />
            {restricted &&
                <span className="linkStyle">
                    <BiSolidLock style={{fontSize: '24px', color: theme.palette.alert.error}} />
                    <Text type={TextType.BODY} content={git} bold={true} color={theme.palette.alert.error} />
                </span>
            }
            {!restricted &&
                <a className="linkStyle" target="_blank" style={{textDecorationColor: theme.palette.alert.special}} href={repo}>
                    <BiLogoGithub style={{fontSize: '24px', color: theme.palette.alert.special}} />
                    <Text type={TextType.BODY} content={git} bold={true} color={theme.palette.alert.special} />
                </a>
            }
            <Text style={{margin: "10px 0px"}} type={TextType.BODY} content={description} color={theme.palette.background} />
            <div className="projectSkills">
                {skills.map((value) => {
                    return(
                        <Tooltip title={value.name}>
                        {value.icon}
                        </Tooltip>
                    )
                })}
            </div>
        </div>
    )
}