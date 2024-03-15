import { Button, Image, Modal } from "@mantine/core"
import { useState } from "react"
import { useParams } from "react-router-dom"
import ProjectCard from "../components/companies/ProjectCard"
import MailIcon from "../icons/MailIcon"
import PhoneIcon from "../icons/PhoneIcon"
import { images } from "../utils/images"
export type Project = {
    name: string
    image: string
    description: string
}

const mockProjects: Project[] = [
    {
        name: 'project1',
        image: images.project1,
        description: 'this is description for the project'
    },
    {
        name: 'project2',
        image: images.project2,
        description: 'this is description for the project'
    },
    {
        name: 'project3',
        image: images.project3,
        description: 'this is description for the project'
    },
    {
        name: 'project4',
        image: images.project4,
        description: 'this is description for the project'
    },
]

const Company = () => {
    const { slug } = useParams()
    const [openModal, setOpenModal] = useState(false)
    // @ts-ignore
    const image = images[slug]

    return (
        <div className="container flex flex-col items-center justify-center gap-8 mx-auto sectionPadding pb-16">
            <h2 className='text-4xl'>{slug}</h2>
            <div className="w-[150px] h-[150px] overflow-hidden rounded-full">
                <Image src={image} className="w- h-full object-cover" alt="company" />
            </div>
            <div>
                <h3 className="w-[400px] text-center text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ex ab unde culpa quod, error eaque eveniet incidunt nobis perferendis.
                </h3>
                <div className='flex items-center my-8 gap-x-4'>
                    <PhoneIcon />
                    <span>+0123456789</span>
                </div>
                <div className='flex items-center gap-x-2'>
                    <MailIcon />
                    <span>company@company.mail</span>
                </div>
            </div>
            <h2 className='text-2xl py-8'>Projects</h2>
            <div className="grid grid-cols-4 gap-x-4">
                {
                    mockProjects.map(project => (
                        <ProjectCard key={project.name} project={project} />
                    ))
                }
            </div>
            <Button className="bg-primary hover:bg-secondary duration-300" onClick={() => setOpenModal(true)}>Contact us</Button>
            <Modal opened={openModal} onClose={() => setOpenModal(false)} size={1000} centered>
                <div className="flex justify-center items-center flex-col">
                    <p className="text-xl">Keep In touch with us</p>
                    <div className="flex items-center gap-x-4">
                        <div className='flex items-center my-8 gap-x-4'>
                            <PhoneIcon />
                            <span>+0123456789</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <MailIcon />
                            <span>company@company.mail</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <MailIcon />
                            <span>company@company.mail</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <MailIcon />
                            <span>company@company.mail</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Company