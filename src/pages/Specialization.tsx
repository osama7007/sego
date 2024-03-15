import { useParams } from "react-router-dom"

const Specialization = () => {
    const { slug } = useParams()
    return (
        <main className="text-center container sectionPadding mx-auto">
            <h2 className="text-4xl">{slug}</h2>
        </main>
    )
}

export default Specialization