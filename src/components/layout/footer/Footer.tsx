import MailIcon from "../../../icons/MailIcon"
import PhoneIcon from "../../../icons/PhoneIcon"
import Translate from "../../ui/Translate"

const Footer = () => {
    return (
        <footer className="flex justify-center items-center flex-col bg-slate-200 mt-16 py-32">
            <p id='contact' className="text-xl"><Translate text="Keep In touch with us"/></p>
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