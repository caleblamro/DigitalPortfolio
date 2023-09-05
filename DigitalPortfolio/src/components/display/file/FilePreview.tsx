import { DeleteTwoTone, FileExcelTwoTone, FileImageTwoTone, FileMarkdownTwoTone, FilePdfTwoTone, FilePptTwoTone, FileTextTwoTone, FileUnknownTwoTone, FileWordTwoTone, Html5TwoTone } from "@ant-design/icons";
import "./FileStyle.css";
import { useEffect } from "react";
import { useTheme } from "../../../App";
export default function FilePreview(props: { fileName: string; index: number; backgroundColor: string | undefined; color: string | undefined; animated: boolean }){
    const theme = useTheme();
    const index = props.fileName.indexOf('.');
    const extension = props.fileName.substring(index + 1);
    const icons = {
        "txt": <FileTextTwoTone />,
        "pdf": <FilePdfTwoTone twoToneColor={theme.palette.alert.error} />,
        "doc": <FileWordTwoTone twoToneColor={theme.palette.accent} />,
        "docx": <FileWordTwoTone twoToneColor={theme.palette.accent} />,
        "ppt": <FilePptTwoTone twoToneColor={theme.palette.alert.error} />,
        "pptx": <FilePptTwoTone twoToneColor={theme.palette.alert.error} />,
        "jpg": <FileImageTwoTone />,
        "jpeg": <FileImageTwoTone />,
        "xlsx": <FileExcelTwoTone />,
        "md": <FileMarkdownTwoTone />,
        "html": <Html5TwoTone />,
        default: <FileUnknownTwoTone />
    }
    type FileIcon = typeof icons;
    function getIcon(obj: FileIcon, key: string) {
        const icon = obj[key as keyof FileIcon];
        if(!icon) return obj.default;
        return icon;
    }

    useEffect(() => {
        //give time for components to render
        if(!props.animated) {
            const file = document.getElementById(`file-preview${props.index}`) as HTMLDivElement;
            file.style.transitionDuration = '0s';
            file.classList.add("open");
            file.classList.add("show");

        }
        setTimeout(() => {
            const file = document.getElementById(`file-preview${props.index}`) as HTMLDivElement;
            file.classList.add("open");
            setTimeout(() => {
                file.classList.add("show");
            }, 20);
        }, 20);
    }, [])
    return(
        <div id={`file-preview${props.index}`} style={{backgroundColor: props.backgroundColor, color: props.color}} className="file-preview">
            <div className="file-preview-icon">{getIcon(icons, extension)}</div>
            <div className="text small file-name">{props.fileName.trim()}</div>
        </div>
    );
}