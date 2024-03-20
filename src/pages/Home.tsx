import CompaniesSlider from '../components/companies/CompaniesSlider'
import Footer from '../components/layput/footer/Footer'
import HeaderSlider from '../components/layput/header/HeaderSlider'
import Navbar from '../components/layput/header/Navbar'

const Home = () => {
    return (
        <>
            <Navbar />
            <HeaderSlider />
            <CompaniesSlider />
            <Footer />
        </>
    )
}

export default Home