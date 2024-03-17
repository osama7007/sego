import MailIcon from "../../../icons/MailIcon"
import PhoneIcon from "../../../icons/PhoneIcon"

const Footer = () => {
    return (
        <footer className="flex justify-center items-center flex-col bg-slate-200 mt-16 py-32 fixed bottom-0 left-0 right-0">
            <p className="text-xl">Keep In touch with us</p>
            <div className="flex items-center gap-x-4">
                <div className='flex items-center my-8 gap-x-4'>
                    <PhoneIcon />
                    <span>+0123456789</span>
                </div>
                <div className='flex items-center gap-x-2'>
                    <MailIcon />
                    <span>company@company.mail</span>
                </div>
                <div className='flex items-center gap-x-2'>
                    <MailIcon />
                    <span>company@company.mail</span>
                </div>
                <div className='flex items-center gap-x-2'>
                    <MailIcon />
                    <span>company@company.mail</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer