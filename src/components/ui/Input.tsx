interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
    form: any
    name: string
}
const Input = ({ name, form, ...props }: Input) => {
    if (props.hidden) return null
    return (<>
        <label htmlFor={name} className="relative top-4">{name}</label>
        <input
            {...form.getInputProps(name)}
            placeholder={name}
            id={name}
            {...props}
            className="p-2 border border-slate-200 outline-4 m-0"
        />
        <span className="text-red-500">{form?.errors[name]}</span>
    </>
    )
}

export default Input