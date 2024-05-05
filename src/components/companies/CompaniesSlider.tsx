
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getData } from '../../api/getData';
import CompanyCard from './CompanyCard';

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
                            <CompanyCard company={company} />
                        </Carousel.Slide>
                    )
                }
            </Carousel>
        </section>
    )
}
export default CompaniesSlider