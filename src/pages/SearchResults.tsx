import { Image } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getData } from '../api/getData'

const SearchResults = () => {
    const { search } = useParams()
    const { data: companies, isLoading } = useQuery({
        queryKey: ['search', search],
        queryFn: () => getData({
            endpoint: `search/${search}`
        }),
        enabled: !!search,
        select: data => data?.data?.message
    })
    if (isLoading) return <p className='text-center text-4xl capitalize'>loading</p>
    if (companies === 'not found') return <p className='text-center text-4xl capitalize'>no data found</p>
    return (
        companies?.map((company: any) =>
            <div key={company?.id} className='flex flex-col justify-center items-center' >
                <Link to={`/company/${company?.id}`} className='w-full'>
                    <Image src={company?.logo} className='h-full w-full' alt={company?.name} />
                </Link>
                <p className='w-[96.2%] p-4 h-[40px] text-center bg-[#f6f6f6]'>{company?.name} </p>
            </div>
        )
    )
}

export default SearchResults