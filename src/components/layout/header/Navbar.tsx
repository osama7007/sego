import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../../../api/getData";
import ProfileIcon from "../../../icons/ProfileIcon";
import SearchIcon from "../../../icons/SearchIcon";
import Translate from "../../ui/Translate";
import Logout from "./Logout";


const Navbar = () => {
    const token = localStorage.getItem('sego_token')
    const [searchVal, setSearchVal] = useState('')
    const navigate = useNavigate()

    const { data: specializations } = useQuery({
        queryKey: ['get-specializations'],
        queryFn: () => getData({
            endpoint: 'all/specializations'
        }),
        select: (data: any) => data.data.message.map((item: any) => ({
            id: item.id,
            label: item.name
        }))
    })

    // search box handler 
    const getSearchHandler = () => {
        if (!searchVal) return
        navigate(`/search/${searchVal}`)
    }
    // change language
    const changeLang = (lang: 'en' | 'ar') => {
        const language = sessionStorage.getItem('lang')
        if (language === lang) return
        sessionStorage.setItem('lang', lang)
        window.location.reload()
    }

    // navbar links data
    const navLinks = [
        {
            route: '/home',
            page: 'home'
        },
        {
            route: '/about',
            page: 'about'
        },
        {
            route: '#',
            page: 'specialization',
            nestedRoutes: true,
            comp: <ul className="absolute invisible duration-300 translate-y-32 opacity-0 top-12 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 text-white bg-primary p-4 rounded w-[250px]">
                {specializations?.map((spec: { id: number, label: string }) =>
                    <li key={spec?.id} className="hover:text-black my-2 duration-300"><Link to={`/specialization/${spec?.id}`}>{spec?.label}</Link></li>
                )}
            </ul>
        },
        {
            route: '#contact',
            page: 'contact'
        },
        {
            route: '#',
            page: 'language',
            nestedRoutes: true,
            comp: <ul className="absolute invisible duration-300 translate-y-32 opacity-0 top-12 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 text-white bg-primary p-4 rounded w-[70px] text-center space-y-4">
                <li><button onClick={() => changeLang('ar')}>AR</button></li>
                <li><button onClick={() => changeLang('en')}>EN</button></li>
            </ul>
        },
    ]

    return (
        <nav className="container flex items-center justify-around pt-8 capitalize">
            <Link to='/home' >
                SEGO
            </Link>
            <ul className="flex items-center gap-x-8">
                {navLinks.map(link => (
                    <li key={link.page} className="relative z-20 hoverEffect group py-4">
                        {
                            link.page === 'contact' ?
                                <a href="#contact"><Translate text='contact' /></a>
                                :
                                <Link to={!token ? '/login' : link.route}><Translate text={link.page} /></Link>
                        }
                        {
                            link.nestedRoutes ?
                                <>
                                    {link.comp}
                                </>
                                : null
                        }
                    </li>
                ))
                }
            </ul>
            {
                token ?
                    <div className="flex items-center">
                        <div>
                            <SearchIcon />
                            <input type="text" onChange={(e) => setSearchVal(e.target.value)} />
                            <button onClick={getSearchHandler}><Translate text="search"/></button>
                        </div>
                        <Link to='/profile' className="flex items-center gap-x-2 hoverEffect">
                            <ProfileIcon />
                            <span><Translate text="profile" /></span>
                        </Link>
                        <Logout />
                    </div>
                    : <button onClick={() => navigate('/login')}><Translate text="Login"/></button>
            }
        </nav>
    )
}

export default Navbar