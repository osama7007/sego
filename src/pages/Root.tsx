import { Outlet } from "react-router-dom";
import Footer from "../components/layput/footer/Footer";
import Navbar from "../components/layput/header/Navbar";
import ProtectedRoutes from "./ProtectedRoutes";
const Root = () => {
    return (
        <ProtectedRoutes>
            <Navbar />
            <Outlet />
            <Footer />
        </ProtectedRoutes>
    )
}

export default Root