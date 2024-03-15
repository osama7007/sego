
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('sego_token')
    if (!token) {
        // @ts-ignore
        window.location = '/login'
    } 
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoutes