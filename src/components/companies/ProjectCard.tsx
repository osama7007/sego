import { FileInput, Image, Modal } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { postData } from "../../api/postData"
import DeleteIcon from "../../icons/DeleteIcon"
import EditIcon from "../../icons/EditIcon"
import { Project } from "../../pages/Company"
import Input from "../ui/Input"
import Translate from "../ui/Translate"
import useTranslate from "../../hooks/useTranslate"
type ProjectCard = {
    project: Project
}
type Values = {
    image1: string
    name: string
    description: string
    type?: 'edit' | 'delete'
}
const ProjectCard = ({ project }: ProjectCard) => {
    const locale:any = useTranslate()

    const [openForm, setOpenForm] = useState(false)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const queryClient = useQueryClient()


    const form = useForm<Values>({
        initialValues: {
            description: '',
            image1: '',
            name: '',
        },
        validate: {
            name: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
            description: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
            image1: (value) => !value && 'required field',
        }
    })

    const { mutate } = useMutation({
        mutationKey: ['delete-project', project?.id],
        mutationFn: (data: Values) => postData({
            endpoint: data.type === 'delete' ? `DeleteProject/${project.id}` : `updateProject/${project.id}`,
            data: data.type === 'delete' ? {
                _method: 'DELETE'
            } : data,
            formData: data.type === 'edit'
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['get-company', project.id] })
        }
    })

    return (
        <div className="bg-slate-100 pb-20 relative">
            <div className="h-[200px] w-full">
                <Image src={project.image1} alt={project.name} className="w-full h-[200px] object-cover rounded-t" />
            </div>
            <h3 className="text-xl px-4">{project.name}</h3>
            <p className="px-4 mt-4">{project.description}</p>
            <button className="absolute top-4 right-4" onClick={() => setOpenConfirmation(true)}>
                <DeleteIcon />
            </button>
            <button className="absolute top-4 left-4" onClick={() => setOpenForm(true)}>
                <EditIcon />
            </button>
            <Modal opened={openForm} onClose={() => setOpenForm(false)} size={1000} centered>
                <h2 className="text-center text-3xl">update Project</h2>
                <form onSubmit={form.onSubmit((values) => mutate({ ...values, type: 'edit' }))} className='flex flex-col gap-4 w-1/3 mx-auto container sectionPadding shadow-lg p-4 mt-16'>
                    <Input form={form} name='name' placeholder='name' type='text' />
                    <Input form={form} name='description' type='text' />
                    <FileInput
                        placeholder={locale?.yourLogo || "Your logo"}
                        // @ts-ignore
                        onChange={file => form.setFieldValue('image1', file)}
                    />
                    {
                        form.errors?.image1 &&
                        <p className='text-red-500'>{form.errors?.image1}</p>
                    }
                    <button className="uppercase bg-primary rounded" type="submit">update project</button>
                </form>
            </Modal>
            <Modal opened={openConfirmation} onClose={() => setOpenConfirmation(false)} size={1000} centered>
                <h3 className="text-2xl text-center capitalize"><Translate text="are you sure you want to delete this project" /></h3>
                <div className="flex items-center gap-5 justify-center my-8">
                    <button onClick={() => setOpenConfirmation(false)}><Translate text="Cancel" /></button>
                    <button onClick={() => mutate({ type: 'delete' } as Values)}><Translate text="Confirm" /></button>
                </div>
            </Modal>
        </div>
    )
}

export default ProjectCard