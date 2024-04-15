
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getData } from '../../api/getData';

const CompaniesSlider = () => {
    const { data: companies } = useQuery({
        queryKey: ['companies'],
        queryFn: () => getData({
            endpoint: 'all/companies'
        }),
        select: (data: any) => data.data.message
    })

    return (
        <section className='sectionPadding'>
            <h2 className='text-center text-xl'>Companies</h2>
            <Carousel className='mt-8'
                withIndicators
                height={300}
                slideSize="33.333333%"
                slideGap="lg"
                loop
                align="start"
                slidesToScroll={3}>
                {
                    companies?.map((company: any) =>
                        <Carousel.Slide key={company?.id} className='relative flex flex-col justify-center items-center' >
                            <Link to={`/company/${company?.id}`} className='w-full'>
                                <Image src={company?.logo} className='h-full w-full' alt={company?.name} />
                            </Link>
                            <p className='w-[96.2%] p-4 absolute bottom-0 h-[40px] text-center bg-[#f6f6f6]'>{company?.name} </p>
                        </Carousel.Slide>
                    )
                }
            </Carousel>
        </section>
    )
}
export default CompaniesSlider