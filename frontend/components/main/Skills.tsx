import { Backend_skill, Frontend_skill, Full_stack, Other_skill, Skill_data } from "@/constants"
import { SkillsSectionDataProvider } from "../sub/SkillsSectionDataProvider"
import { SkillsText } from "../sub/SkillText"




export const Skills = ()=>{
    return (
        <section 
        id="skills" 
        className="flex flex-col items-center gap-3 h-full relative overflow-hidden py-20" 
        style={{transform : "scale(0.9)"}}>
            <SkillsText/>
            <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
                {Skill_data.map((image, index)=>{
                    return <SkillsSectionDataProvider
                    src={image.Image}
                    width={image.width}
                    key={index}
                    height={image.height}
                    index={index}
                    />
                })}
            </div>
            <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
                {Frontend_skill.map((image, index)=>{
                    return <SkillsSectionDataProvider
                    src={image.Image}
                    width={image.width}
                    key={index}
                    height={image.height}
                    index={index}
                    />
                })}
            </div>
            <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
                {Backend_skill.map((image, index)=>{
                    return <SkillsSectionDataProvider
                    src={image.Image}
                    width={image.width}
                    key={index}
                    height={image.height}
                    index={index}
                    />
                })}
            </div>
            <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
                {Full_stack.map((image, index)=>{
                    return <SkillsSectionDataProvider
                    src={image.Image}
                    width={image.width}
                    key={index}
                    height={image.height}
                    index={index}
                    />
                })}
            </div>
            <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
                {Other_skill.map((image, index)=>{
                    return <SkillsSectionDataProvider
                    src={image.Image}
                    width={image.width}
                    key={index}
                    height={image.height}
                    index={index}
                    />
                })}
            </div>
            {/* <div className="w-full h-full absolute">
                <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover ">
                    <video src="/cards-video.webm" className="w-full h-auto" preload="false" muted loop playsInline autoPlay></video>
                </div>
            </div> */}
        </section>
    )
}