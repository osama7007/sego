import { Image } from '@mantine/core';
import { images } from '../utils/images';
import PhoneIcon from '../icons/PhoneIcon';
import MailIcon from '../icons/MailIcon';

const Profile = () => {
    return (
        <main className='container flex flex-col items-center justify-center gap-8 mx-auto sectionPadding'>
            <h2 className='text-2xl'>use name</h2>
            <div className='w-[200px] h-[200px] rounded-full overflow-hidden'>
                <Image src={images.profile} className='w-full h-full' alt='profile'/>
            </div>
            <div>
                <div className='flex items-center my-8 gap-x-4'>
                    <PhoneIcon />
                    <span>+0123456789</span>
                </div>
                <div className='flex items-center gap-x-2'>
                    <MailIcon />
                    <span>user@user.mail</span>
                </div>
            </div>
        </main>
    )
}

export default Profile