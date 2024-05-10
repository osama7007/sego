import { useForm } from "@mantine/form"
import Input from "../ui/Input"
import { useMutation } from "@tanstack/react-query"
import { postData } from "../../api/postData"
import { FileInput } from "@mantine/core"
import Translate from "../ui/Translate"
import useTranslate from "../../hooks/useTranslate"
type UpdateCompanyForm = {
  id:string
}
type Values = {
    name: string,
    password: string
    overview: string,
    logo: string
    specialization: string
}
const UpdateCompanyForm = ({id}:UpdateCompanyForm) => {
  const locale:any = useTranslate()

  const { mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: Values) => postData({
        endpoint: `updataCompany/${id}`,
        data,
        formData:true
    }),
})
  const form = useForm<Values>({
    initialValues: {
        name: '',
        password: '',
        overview: '',
        logo: '',
        specialization: ''
    },
    validate: {
        name: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
        password: (value) => value.trim().length >= 8 ? null : 'password must be at least 8 characters',
        overview: (value: any) => value?.trim().length >= 3 ? null : 'must be at least 3 characters',
        logo: (value: any) =>  !value && 'logo is required',
        specialization: (value: any) => value?.trim().length >= 3 ? null : 'must be at least 3 characters',
    }
})
  return (
    <form onSubmit={form.onSubmit((values)=>mutate(values))} className='flex flex-col gap-4 w-1/3 mx-auto container sectionPadding shadow-lg p-4 mt-16'>
    <h2 className='text-center text-2xl'><Translate text="update company"/></h2>
    <Input form={form} name='name' placeholder='name' type='text' />
    <Input form={form} name='email' type='email' />
    <Input form={form} name='overview' type='text'  />
    <Input form={form} name='specialization' type='text'  />
    <FileInput
        
        placeholder={locale?.yourLogo || "Your logo"}
        // @ts-ignore
        onChange={file => form.setFieldValue('logo', file)}
    />
    {
      form.errors?.logo &&
        <p className='text-red-500'>{form.errors?.logo}</p>
    }
    <button type="submit"><Translate text="update"/></button>
</form>
  )
}

export default UpdateCompanyForm