import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../api/postData';
import Input from '../components/ui/Input';
type Values = {
    email: string,
    password: string
}

const Login = () => {
    const [userLogin, setUserLogin] = useState(true)
    const navigate = useNavigate()
    const token = localStorage.getItem('sego_token')
    if (token) {
        // @ts-ignore
        window.location = '/home'
        return
    }
    const { mutate, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: (params: string) => postData({
            endpoint: userLogin ? `login?${params}` : `company/login?${params}`,
        }),
        onSuccess: data => {
            if (data?.status === 200) {
                const token = data?.data?.authorisation?.token
                localStorage.setItem('sego_token', token)
                navigate('/home')
            }
        }
    })
    const form = useForm<Values>({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            // password: (value) => value.trim().length >= 8 ? null : 'password must be at least 8 characters',
        }
    })
    const submitHandler = (values: Values) => {
        const searchParams = new URLSearchParams(values).toString()
        mutate(searchParams)
    }
    return (
        <form onSubmit={form.onSubmit(submitHandler)} className='flex flex-col gap-8 w-1/3 mx-auto container sectionPadding shadow-lg p-4 mt-16'>
            <h2 className='text-center text-2xl'>{userLogin ? 'Login as user' : 'Login as company'}</h2>
            <Input form={form} name='email' />
            <Input form={form} name='password' type='password' />
            <Button className='p-1 bg-primary hover:bg-secondary duration-300 w-full' type='submit' loading={isPending}>submit</Button>
            <div className='flex justify-evenly'>
                <button type='button' className='bg-slate-200 p-2 rounded hover:bg-slate-300 duration-200' onClick={() => setUserLogin(prev => !prev)}>{userLogin ? 'company login' : 'user login'}</button>
                <Link to='/signup' className='bg-slate-200 p-2 rounded hover:bg-slate-300 duration-200'>signup</Link>
            </div>
        </form>
    )
}

export default Login