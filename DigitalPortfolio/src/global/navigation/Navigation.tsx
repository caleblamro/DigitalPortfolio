import { Dispatch, SetStateAction } from "react";
import { Text, TextType } from "../../components/text/Text";
import "./Navigation.css";
export default function Navigation({isMobile, showAboutAnim}: { isMobile:boolean, showAboutAnim: Dispatch<SetStateAction<boolean>> }) {
    const handleClick = (index: number) => {
        const element = document.getElementById(`group${index + 1}`);
        if (element) {
            const rect = element.getBoundingClientRect();
            const absoluteTop = window.pageYOffset + rect.top;
            window.scrollTo({
                top: absoluteTop - ( isMobile ? 220 : 330),
                behavior: 'smooth'
            });
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
        if (e.key === "Enter") {
            handleClick(i);
        }
    };
    const showAbout = () => {
        showAboutAnim(true);
        const element = document.getElementById(`aboutMeContainer`);
        if (element) {
            const rect = element.getBoundingClientRect();
            const absoluteTop = window.pageYOffset + rect.top;
            window.scrollTo({
                top: absoluteTop - ( isMobile ? 220 : 330),
                behavior: 'smooth'
            });
        }
    }

    return (
        <div className={isMobile ? "nav centered" : "nav"}>
            {!isMobile && <Text type={TextType.BODY} bold={true} content="Caleb Lamoreaux" />}
            <div className="navItems">
                <div tabIndex={0} className="a" onKeyDown={(e) => handleKeyDown(e, 0)} onClick={() => handleClick(0)}>
                    <Text type={TextType.BODY} bold={true} content="Home" />
                </div>
                <div tabIndex={0} className="a" onClick={showAbout}>
                    <Text type={TextType.BODY} bold={true} content="About" />
                </div>
                <div tabIndex={0} className="a" onKeyDown={(e) => handleKeyDown(e, 2)} onClick={() => handleClick(2)}>
                    <Text type={TextType.BODY} bold={true} content="Projects" />
                </div>
                <div tabIndex={0} className="a" onKeyDown={(e) => handleKeyDown(e, 3)} onClick={() => handleClick(3)}>
                    <Text type={TextType.BODY} bold={true} content="Contact" />
                </div>
            </div>
        </div>
    );
}