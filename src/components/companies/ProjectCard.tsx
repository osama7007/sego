import { Image } from "@mantine/core"
import { Project } from "../../pages/Company"
type ProjectCard = {
    project: Project
}
const ProjectCard = ({ project }: ProjectCard) => {
    return (
        <div className="bg-slate-100 pb-20">
            <div className="h-[200px] w-full">
                <Image src={project.image} alt={project.name} className="w-full h-[200px] object-cover rounded-t" />
            </div>
            <h3 className="text-xl px-4">{project.name}</h3>
            <p className="px-4 mt-4">{project.description}</p>
        </div>
    )
}

export default ProjectCard