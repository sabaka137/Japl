import { AiOutlineDelete } from 'react-icons/ai'
import { Text } from '../../../components/Common'
import {
    CustomInput,
    TermCardContainer,
    TermCardItem,
    TermCardTop,
} from '../style'
import {
    FieldError,
    FieldErrorsImpl,
    Merge,
    UseFieldArrayRemove,
    UseFormGetValues,
    UseFormRegister,
} from 'react-hook-form'

type Props = {
    id: number
    index: number
    register: UseFormRegister<{
        name: string
        description: string
        termins: {
            id: number
            termin: string
            meaning: string
            reading: string
            isValide: boolean
        }[]
    }>
    remove: UseFieldArrayRemove
    errors:
        | false
        | Merge<
              FieldError,
              FieldErrorsImpl<{
                  id: number
                  termin: string
                  meaning: string
                  reading: string
                  isValide: boolean
              }>
          >
        | undefined
    getValues: UseFormGetValues<{
        name: string
        description: string
        termins: {
            id: number
            termin: string
            meaning: string
            reading: string
            isValide: boolean
        }[]
    }>
}

export const TermCard = ({
    id,
    remove,
    index,
    register,
    errors,
    getValues,
}: Props) => {
    console.log(errors)
    return (
        <TermCardContainer>
            <TermCardTop>
                <Text fw="bold" color="#939BB4">
                    {index + 1}
                </Text>
                <div>
                    <AiOutlineDelete
                        color={
                            getValues('termins').length > 3
                                ? '#2e3856'
                                : '#d3d5de'
                        }
                        fontSize={'1.4rem'}
                        onClick={() =>
                            getValues('termins').length > 3 && remove(index)
                        }
                    />
                </div>
            </TermCardTop>
            <TermCardItem>
                <CustomInput
                    isValide={
                        errors !== undefined &&
                        Object.keys(errors).includes('termin')
                    }
                    {...register(`termins.${index}.termin`, {
                        required: true,
                        maxLength: 50,
                    })}
                    placeholder="Termin"
                />

                <CustomInput
                    isValide={
                        errors !== undefined &&
                        Object.keys(errors).includes('meaning')
                    }
                    {...register(`termins.${index}.meaning`, {
                        required: true,
                        maxLength: 50,
                    })}
                    placeholder="Meaning"
                />

                <CustomInput
                    isValide={
                        errors !== undefined &&
                        Object.keys(errors).includes('reading')
                    }
                    {...register(`termins.${index}.reading`, {
                        required: true,
                        maxLength: 50,
                    })}
                    placeholder="Reading"
                />
            </TermCardItem>
        </TermCardContainer>
    )
}

export default TermCard
