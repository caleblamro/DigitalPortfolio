import { useTheme } from "../../../App";
import "./Step.css";

interface StepProps {
    step: number;
    totalSteps: number;
}

export const Step = ({ step, totalSteps }: StepProps) => {
    const theme = useTheme();

    const handleClick = (index: number) => {
        const element = document.getElementById(`group${index + 1}`);
        if (element) {
            const rect = element.getBoundingClientRect();
            const absoluteTop = window.pageYOffset + rect.top;
            window.scrollTo({
                top: absoluteTop - 330,
                behavior: "smooth",
            });
        }
    };

    return (
        <svg className="stepContainer">
            {Array.from({ length: totalSteps }).map((_, i) => (
                <g key={`circle${i}`} transform={`translate(0, ${i * 40})`}>
                    <circle
                        onClick={() => handleClick(i)}
                        cx="50%"
                        cy="0"
                        r="10"
                        className="circle"
                        style={{
                            stroke: theme.palette.primary,
                            strokeWidth: "2",
                            fill: step === i + 1 ? theme.palette.primary : theme.palette.background,
                        }}
                    ></circle>
                    {i < totalSteps - 1 && (
                        <line
                            x1="50%"
                            y1="10"
                            x2="50%"
                            y2="30"
                            style={
                                step === i + 1 || step === i + 2
                                    ? { stroke: theme.palette.text, strokeWidth: "3" }
                                    : { stroke: theme.palette.accent, strokeWidth: "2" }
                            }
                        ></line>
                    )}
                </g>
            ))}
        </svg>
    );
};