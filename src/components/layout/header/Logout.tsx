import { Image } from "@mantine/core"
import { images } from "../../../utils/images"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('sego_token');
        localStorage.removeItem('sego_user');
        navigate('/home')
    }
    return (
        <button className="w-[20px] absolute top-12 right-10" onClick={logout}>
            <Image
                src={images.logout}
                alt="logout"
                width={20}
                height={20}
                className="w-full"
            />
        </button>
    )
}

export default Logout