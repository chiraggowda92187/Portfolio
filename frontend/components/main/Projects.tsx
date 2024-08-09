"use client"
import React from 'react';
import { useEffect, useState } from "react";
import { ProjectCard } from "../sub/ProjectCard"
import { ProjectDetailsType } from "@/constants/type";
import axios from "axios";
import { BACKEND_URL } from "@/constants";





export const Projects = ()=>{
    const [projects, setProjects] = useState<ProjectDetailsType[] >([])
    useEffect(()=>{
        const getProjects = async ()=>{
            const response = await axios.get(`${BACKEND_URL}/fetchDetails`)
            setProjects(response.data.projectsData)
        }
        getProjects()
    }, [])
    return (
        <div className="flex flex-col items-center justify-center py-20" id="projects">
            <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
            Projects
            </h1>
            <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10 md:grid grid-cols-3">
                {/* <ProjectCard
                    src="/NextWebsite.png"
                    title="title 1"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio eveniet voluptatum nihil magni facilis, sapiente doloribus atque eius laboriosam qui voluptate praesentium, rem amet accusantium fuga ipsam minus saepe hic."
                /> */}
                {
                    projects.map((project,index)=>{
                        return (
                          <ProjectCard
                          key={index}
                            src="/NextWebsite.png"
                            title={project.name.replaceAll("-", " ").charAt(0).toUpperCase() + project.name.replaceAll("-", " ").slice(1)}
                            description={project.description?project.description : ""}
                            live_url = {project.live_url}
                            github_url = {project.html_url}
                            imagesKeyList = {project.imagesKeysList}
                          />
                        );
                    })
                }
            </div>
        </div>
    );
}