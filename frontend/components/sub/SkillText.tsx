"use client"

import { slideInFromLeft, slideInFromTop } from "@/utils/motion"
import { SparklesIcon } from "@heroicons/react/24/solid"
import {motion} from "framer-motion"


export const SkillsText = ()=>{
    return(
        <div className="w-full h-auto flex flex-col items-center justify-center">
            <motion.div 
            variants={slideInFromLeft(0.5)}
            className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
            >
                Making apps with modern technologies
            </motion.div>
        </div>
    )
}
