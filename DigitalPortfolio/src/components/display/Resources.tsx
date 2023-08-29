import { ConfigProvider, Tabs, TabsProps } from "antd";
import { Theme } from "../../theme/ThemeContext";
import { SiLeetcode } from 'react-icons/si';

interface ResourcesProps {
    theme: Theme;
}

export default function Resources({theme}: ResourcesProps) {


    const LinksChildren = (
        <div className="linksGroup">
            <a href="https://leetcode.com/clamorea/">
                <SiLeetcode  style={{fontSize: '48px', color: theme.palette.primary}} />
            </a>
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
            children: `Files`,
        },
        {
            key: '3',
            label: `References`,
            children: `References`,
        },
    ];

    return(
        <ConfigProvider theme={{components: { Tabs: { colorText: theme.palette.secondary }}, token: { colorPrimary: theme.palette.primary, colorBgContainer: theme.palette.accent, fontFamily: 'AnonymousPro', borderRadius: 2 }}}>
            <Tabs defaultActiveKey="1" items={items} />
        </ConfigProvider>
    )
}