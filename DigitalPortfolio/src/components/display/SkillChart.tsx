import { motion } from "framer-motion";
import "./SkillChart.css";
import { Text, TextType } from "../text/Text";

interface SkillChartProps {
    years: number;
    title: string;
}

const SkillChart: React.FC<SkillChartProps> = ({years, title}) => {
    return(
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } }} className="skillChart">
            <Text type={TextType.SUB_TITLE} content={title} />
            
        </motion.div>
    )
}