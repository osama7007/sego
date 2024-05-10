import { Select } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { getData } from "../../api/getData"
import useTranslate from "../../hooks/useTranslate"
type Props = {
    form: any
}
const SelectSpecialization = ({ form }: Props) => {
    const locale:any = useTranslate()
    const { data } = useQuery({
        queryKey: ['get-specializations'],
        queryFn: () => getData({
            endpoint: 'all/specializations'
        }),
        select: (data: any) => data.data.message.map((item: any) => ({
            id: item.id,
            value: item.name,
            label: item.name,
        }))
    })
    return (
        <div>
            <Select
                data={data || []}
                label={locale?.specialization || 'specialization'}
                placeholder={locale?.specialization || 'specialization'}
                onChange={(_, { id }: any) => {
                    form.setFieldValue('specialization', id)
                }}
            />
        </div>
    )
}

export default SelectSpecialization