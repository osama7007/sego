import { Image } from '@mantine/core'
import { Link } from 'react-router-dom'
type Company = {
    company: {
        id: number
        logo: string
        name: string
        overview: string
    }
}
const CompanyCard = ({ company }: Company) => {
    return (
        <div className='relative group overflow-hidden'>
            <Link to={`/company/${company?.id}`} className='w-full'>
                <Image src={company?.logo} className='h-full w-full' alt={company?.name} />
            </Link>
            <div className='translate-y-full group-hover:-translate-y-full duration-300 bg-black bg-opacity-50 text-white'>
                <p className='text-2xl font-bold'>{company?.name} </p>
                <p className=''>{company?.overview} </p>
            </div>
        </div>
    )
}

export default CompanyCard