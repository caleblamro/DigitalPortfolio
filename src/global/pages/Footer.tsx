import { SiGithub, SiLeetcode, SiLinkedin } from "react-icons/si";
import { useTheme } from "../../App";
import "./Footer.css";

export default function Footer() {
    const theme = useTheme();

    return(
        <div className="footer" style={{backgroundColor: theme.palette.accent}}>
            <div className="links">
                <a className="a" href="https://github.com/caleblamro" target="_blank">
                    <SiGithub style={{ fontSize: '48px', color: theme.palette.background }} />
                </a>
                <a className="a" href="https://leetcode.com/clamorea/" target="_blank">
                    <SiLeetcode style={{ fontSize: '48px', color: theme.palette.background }} />
                </a>
                <a className="a" href="https://www.linkedin.com/in/caleb-lamoreaux/" target="_blank">
                    <SiLinkedin style={{ fontSize: '48px', color: theme.palette.background }} />
                </a>
            </div>
        </div>
    );
}