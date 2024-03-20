import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { images } from '../../../utils/images';
const sliderImages = [images.slider1, images.slider2, images.slider3, images.slider4]
const HeaderSlider = () => {
    return (
        <Carousel height={650} className='mt-8'>
            {
                sliderImages.map(i =>
                    <Carousel.Slide key={i}>
                        <Image src={i} alt='hero slider' />
                    </Carousel.Slide>
                )
            }
        </Carousel>
    )
}

export default HeaderSlider