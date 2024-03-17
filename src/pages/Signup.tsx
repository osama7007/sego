import { Button, FileInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigation } from 'react-router-dom';
import { postData } from '../api/postData';
import Input from '../components/ui/Input';
type Values = {
    name: string,
    email: string,
    password: string
    country: string
    overview?: string,
    phone?: string
    location: string
    specialization: string
}
const Signup = () => {
    const [userSignup, setUserSignup] = useState(true)
    const navigate = useNavigation()
    const token = localStorage.getItem('sego_token')
    if (token) {
        // @ts-ignore
        window.location = '/home'
        return
    }
    const { mutate,isPending } = useMutation({
        mutationKey: ['register'],
        mutationFn: (params: string) => postData({
            endpoint: userSignup ? `register?${params}` : `company/register?${params}`,
        }),
        onSuccess: data => {
            const token = data?.data?.authorisation?.token
            localStorage.setItem('sego_token', token)
            // @ts-ignore
            navigate('/login')
        }
    })
    const form = useForm<Values>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            overview: '',
            country: '',
            phone: '',
            location: '',
            specialization: ''
        },
        validate: {
            name: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.trim().length >= 8 ? null : 'password must be at least 8 characters',
            overview: (value: any) => userSignup ? null : value?.trim().length >= 3 ? null : 'must be at least 3 characters',
            phone: (value: any) => !userSignup ? null : value?.trim().length >= 9 ? null : 'must be at least 9 numbers',
            location:(value: any) => userSignup ? null : value?.trim().length >= 3 ? null : 'must be at least 3 characters',
            country: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
            specialization:(value: any) => userSignup ? null : value?.trim().length >= 3 ? null : 'must be at least 3 characters',
        }
    })
    const submitHandler = (values: Values) => {
        const searchParams = new URLSearchParams(values).toString()
        mutate(searchParams)
    }

    return (
        <form onSubmit={form.onSubmit(submitHandler)} className='flex flex-col gap-4 w-1/3 mx-auto container sectionPadding shadow-lg p-4 mt-16'>
            <h2 className='text-center text-2xl'>{userSignup ? 'Signup as user' : 'Signup as company'}</h2>
            <Input form={form} name='name' placeholder='name' type='text' />
            <Input form={form} name='email' type='email' />
            <Input form={form} name='password' type='password' />
            <Input form={form} name='overview' type='text' hidden={userSignup} />
            <Input form={form} name='phone' type='number' hidden={!userSignup} />
            <Input form={form} name='country' type='text' />
            <Input form={form} name='location' type='text' hidden={userSignup} />
            <Input form={form} name='specialization' type='text' hidden={userSignup} />
            <FileInput
                hidden={userSignup}
                placeholder="Your logo"
                // @ts-ignore
                onChange={file => form.setFieldValue('logo', file.name)}
            />
            <FileInput
                hidden={!userSignup}
                placeholder="Your file"
                // @ts-ignore
                onChange={file => form.setFieldValue('image', file.name)}
            />
            <Button className='p-1 bg-primary hover:bg-secondary duration-300 w-full' type='submit' loading={isPending}>Sign up</Button>
            <div className='flex justify-evenly'>
                <button type='button' onClick={() => setUserSignup(prev => !prev)}>{userSignup ? 'company signup' : 'user signup'}</button>
                <Link to='/login' className='bg-slate-200 p-2 rounded hover:bg-slate-300 duration-200'>login</Link>
            </div>
        </form>
    )
}

export default Signup