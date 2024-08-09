"use client"
import React from "react"
import { slideInFromLeft, slideInFromRight } from "@/utils/motion"

import {motion} from "framer-motion"
import Image from "next/image"


export const HeroContent = ()=>{
    return (
        <motion.div
        initial="hidden"
        animate = "visible"
        className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
        
        >
            <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">

                <motion.div
                variants={slideInFromLeft(0.6)}
                className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
                >
                    <span>
                        Hi👋, 
                        <div>
                            I&apos;m 
                        
                        Chirag <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500"> T C </span>
                        </div>
                    </span>
                </motion.div>

                <motion.p
                variants={slideInFromLeft(0.8)}
                className="text-lg text-gray-400 my-5 max-w-[600px]"
                >
                    I&apos;m a Full stack Developer with experience in Website and software development. Checkout my projects and skills.
                </motion.p>

                <motion.a 
                variants={slideInFromLeft(1)}
                className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
                href="https://google.com"
                >
                    Check Out My Resume!
                </motion.a>
            </div>
            <motion.div 
                variants={slideInFromRight(0.8)}
                className="w-full h-full flex justify-center items-center"
                >
                    <Image
                    src = "/mainIconsdark.svg"
                    alt = "work icons"
                    height={650}
                    width={650}
                    />
                </motion.div>
        </motion.div>
    )
}