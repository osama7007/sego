
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { images } from '../../utils/images';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../api/getData';

const sliderImages = [
    {
        image: images.company1,
        route: '/company/company1'
    },
    {
        image: images.company2,
        route: '/company/company2'
    },
    {
        image: images.company3,
        route: '/company/company3'
    },
    {
        image: images.company4,
        route: '/company/company4'
    },
    {
        image: images.company5,
        route: '/company/company5'
    },
    {
        image: images.company6,
        route: '/company/company6'
    },
    {
        image: images.company7,
        route: '/company/company7'
    }
]
const CompaniesSlider = () => {
    const { data } = useQuery({
        queryKey: ['companies'],
        queryFn: () => getData({
            endpoint: 'all/companies'
        }),
        select:(data:any)=>data?.data?.message
    })
    return (
        <section className='sectionPadding'>
            <h2 className='text-center text-xl'>Companies</h2>
            <Carousel className='mt-8'
                withIndicators
                height={300}
                slideSize="33.333333%"
                slideGap="md"
                loop
                align="start"
                slidesToScroll={3}>
                {
                    sliderImages.map(item =>
                        <Carousel.Slide key={item.route}>
                            <Link to={item.route}>
                                <Image src={item.image} className='object-cover w-full' alt={item.route} />
                            </Link>
                        </Carousel.Slide>
                    )
                }
            </Carousel>
        </section>
    )
}
export default CompaniesSlider