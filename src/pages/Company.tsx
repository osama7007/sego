import { Button, FileInput, Image, Modal } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getData } from "../api/getData"
import { postData } from "../api/postData"
import ProjectCard from "../components/companies/ProjectCard"
import Input from "../components/ui/Input"
import MailIcon from "../icons/MailIcon"
import PhoneIcon from "../icons/PhoneIcon"
import UpdateCompanyForm from "../components/companies/UpdateCompanyForm"
import EditIcon from "../icons/EditIcon"
export type Project = {
    name: string
    image1: string
    description: string
    id:number
}
type Values = {
    image1: string
    name: string
    description: string
    company_name: string
}


const Company = () => {
    const { id } = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [openUpdateCompany, setOpenUpdateCompany] = useState(false)
    const { data } = useQuery({
        queryKey: ['get company', id],
        queryFn: () => getData({
            endpoint: `show/company/${id}`
        }),
        select: (data: any) => data.data.message
    })

    const form = useForm<Values>({
        initialValues: {
            company_name: '',
            description: '',
            image1: '',
            name: ''
        },
        validate: {
            name: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
            company_name: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
            description: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
            image1: (value) => !value && 'required field',
        }
    })
    const { mutate } = useMutation({
        mutationKey: ['add-project'],
        mutationFn: (data: Values) => postData({
            endpoint: `add/project`,
            data,
            formData: true
        })
    })
    const addProjectHandler = (values: Values) => {
        mutate(values)
    }
    return (
        <div className="container flex flex-col items-center justify-center gap-8 mx-auto sectionPadding pb-16">
            <div className="w-[150px] h-[150px] overflow-hidden rounded-full">
                <Image src={data?.logo} className="w- h-full object-cover" alt="company" />
            </div>
            <button onClick={()=>setOpenUpdateCompany(true)}><EditIcon/></button>
            <div>
                <h3 className="w-[400px] text-center text-lg">
                    {data?.overview}
                </h3>
                <div className='flex items-center my-8 gap-x-4'>
                    <PhoneIcon />
                    <span>{data?.social?.[0]?.whatsapp}</span>
                </div>
                <div className='flex items-center gap-x-2'>
                    <MailIcon />
                    <span>{data?.email}</span>
                </div>
            </div>
            <h2 className='text-2xl py-8'>Projects</h2>
            <div className="grid grid-cols-4 gap-4">
                {
                    data?.projects.map((project: Project) => (
                        <ProjectCard key={project.name} project={project} />
                    ))
                }
            </div>
            <button className="text-center mx-auto text-4xl text-primary" title='Add Project' onClick={() => setOpenForm(true)}> + </button>
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
            <Modal opened={openUpdateCompany} onClose={() => setOpenUpdateCompany(false)} size={1000} centered>
                <h2 className="text-center text-3xl">update Project</h2>
                <UpdateCompanyForm id={id!}/>
            </Modal>
            <Modal opened={openForm} onClose={() => setOpenForm(false)} size={1000} centered>
                <h2 className="text-center text-3xl">Add Project</h2>
                <form onSubmit={form.onSubmit(addProjectHandler)} className='flex flex-col gap-4 w-1/3 mx-auto container sectionPadding shadow-lg p-4 mt-16'>
                    <Input form={form} name='name' placeholder='name' type='text' />
                    <Input form={form} name='description' type='text' />
                    <Input form={form} name='company_name' type='text' />
                    <FileInput
                        placeholder="Your file"
                        // @ts-ignore
                        onChange={file => form.setFieldValue('image1', file)}
                    />
                    {
                        form.errors?.image1 &&
                        <p className='text-red-500'>{form.errors?.image1}</p>
                    }
                    <button className="uppercase bg-primary rounded" type="submit">add project</button>
                </form>
            </Modal>
        </div>
    )
}

export default Company