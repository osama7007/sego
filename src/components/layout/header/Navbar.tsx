import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "../../../icons/ProfileIcon";
import SearchIcon from "../../../icons/SearchIcon";
import Logout from "./Logout";
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
        nestedRoutes: [
            {
                route: '/specialization/civil',
                page: 'civil'
            },
            {
                route: '/specialization/programming',
                page: 'programming'
            },
            {
                route: '/specialization/planning',
                page: 'planning'
            },
            {
                route: '/specialization/architecture',
                page: 'architecture'
            },
            {
                route: '/specialization/electrical',
                page: 'electrical'
            },
            {
                route: '/specialization/mechanical',
                page: 'mechanical'
            },
        ]
    },
    {
        route: '#',
        page: 'contact'
    },
    {
        route: '#',
        page: 'language'
    },
]

const Navbar = () => {
    const token = localStorage.getItem('sego_token')
    const [searchVal, setSearchVal] = useState('')
    const navigate = useNavigate()
    const getSearchHandler = () => {
        if(!searchVal) return
        navigate(`/search/${searchVal}`)
    }
    return (
        <nav className="container flex items-center justify-around pt-8 capitalize">
            <Link to='/home' >
                SEGO
            </Link>
            <ul className="flex items-center gap-x-8">
                {navLinks.map(link => (
                    <li key={link.page} className="relative z-20 hoverEffect group py-4">
                        <Link to={!token ? '/login' : link.route}>{link.page}</Link>
                        {
                            link.nestedRoutes ?
                                <ul className="absolute invisible duration-300 translate-y-32 opacity-0 top-12 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 text-white bg-primary p-4 rounded w-[250px]">
                                    {link.nestedRoutes.map(nestedLink =>
                                        <li key={nestedLink.page} className="hover:text-black my-2 duration-300"><Link to={nestedLink.route}>{nestedLink.page}</Link></li>
                                    )}
                                </ul>
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
                            <button onClick={getSearchHandler}>search</button>
                        </div>
                        <Link to='/profile' className="flex items-center gap-x-2 hoverEffect">
                            <ProfileIcon />
                            <span>profile</span>
                        </Link>
                        <Logout />
                    </div>
                    : <button onClick={() => navigate('/login')}>Login</button>
            }
        </nav>
    )
}

export default Navbar