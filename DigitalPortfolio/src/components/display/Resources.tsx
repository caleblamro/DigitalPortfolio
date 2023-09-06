import { ConfigProvider, Tabs, TabsProps } from "antd";
import { Theme } from "../../theme/ThemeContext";
import { SiGithub, SiLeetcode, SiLinkedin } from 'react-icons/si';
import "./Display.css";
import FilePreview from "./file/FilePreview";
import { BiDownArrow } from "react-icons/bi";

interface ResourcesProps {
    theme: Theme;
}

export default function Resources({theme}: ResourcesProps) {


    const LinksChildren = (
        <div className="linksGroup">
            <a href="https://leetcode.com/clamorea/">
                <SiLeetcode  style={{fontSize: '48px', color: theme.palette.primary}} />
            </a>
            <a href="https://www.linkedin.com/in/caleb-lamoreaux/">
                <SiLinkedin  style={{fontSize: '48px', color: theme.palette.primary}} />
            </a>
            <a href="https://github.com/caleblamro">
                <SiGithub  style={{fontSize: '48px', color: theme.palette.primary}} />
            </a>
        </div>
    )
    const downloadFile = (path:string, fileName:string) => {
        const link = document.createElement("a");
        link.href = path;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const FilesChildren = (
        <div className="filesGroup">
            <div onClick={() => downloadFile("/files/Resume.pdf", "Resume.pdf")}>
                <FilePreview fileName={"Resume.pdf"} index={0} backgroundColor={undefined} color={undefined} animated={false} showDownload={true} />
            </div>
        </div>
    )

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Links`,
            children: LinksChildren,
        },
        {
            key: '2',
            label: "Files",
            children: FilesChildren,
        },
    ];

    return(
        <ConfigProvider theme={{components: { Tabs: { colorText: theme.palette.secondary }}, token: { colorPrimary: theme.palette.primary, colorBgContainer: theme.palette.accent, fontFamily: 'AnonymousPro', borderRadius: 2 }}}>
            <Tabs defaultActiveKey="1" items={items} />
        </ConfigProvider>
    )
}