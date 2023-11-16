import { Dispatch, FC, SetStateAction, useMemo } from 'react'
import { FieldErrors, useFieldArray } from 'react-hook-form'
import countryList from 'react-select-country-list'

import { User } from '../../../types/User/UserTypes'

import RegistrationInput from '../../../components/Input/RegistrationInput'
import { Flex, Text } from '../../../components/Common'
import { RegistrationButtonNext } from '../../../components/Button/RegistrationButtonNext'
import { AiOutlineDelete } from 'react-icons/ai'
import { RegistrationSelect } from '../../../components/Select/RegistrationSelect'
import { SelectRangeWrapper } from '../style'
import { LANGUAGE_LEVEL, REGISTRATION_LANGUAGE } from '../../../constants/data'
import { LanguageLevelContiner, LanguageLevelIcon } from './style'

type Props = {
    errors: FieldErrors<{ general: User }> | undefined
    register: any
    control: any
    setStep: Dispatch<SetStateAction<number>>
    trigger: any
}

export const GeneralInfo: FC<Props> = ({
    control,
    setStep,
    register,
    errors,
    trigger,
}) => {
    //fix - change lib to constant
    const options = useMemo(() => countryList().getData(), [])
    console.log(options)
    const { fields, append, remove } = useFieldArray<{
        name: any
        control: any
    }>({
        name: 'general.languages',
        control,
    })

    return (
        <div>
            <Text
                color="#090F19"
                fz={'24px'}
                fw={'500'}
                margin={'0px 0px 30px'}
            >
                Info
            </Text>
            <RegistrationInput
                type="text"
                width={'65%'}
                label={'Name'}
                errors={errors?.general?.name}
                props={{
                    ...register('general.name', {
                        required: 'Required field',
                        maxLength: {
                            value: 15,
                            message: 'Maximum 15 characters',
                        },
                    }),
                }}
            />
            <RegistrationInput
                type="text"
                width={'65%'}
                label={'Surname'}
                errors={errors?.general?.surname}
                props={{
                    ...register('general.surname', {
                        required: 'Required field',
                        maxLength: {
                            value: 15,
                            message: 'Maximum 15 characters',
                        },
                    }),
                }}
            />
            <RegistrationInput
                type="text"
                width={'65%'}
                label={'E-mail'}
                errors={errors?.general?.email}
                props={{
                    ...register('general.email', {
                        required: true,
                        pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                            message:
                                'You have entered an invalid e-mail address',
                        },
                    }),
                }}
            />
            <RegistrationInput
                type="password"
                width={'65%'}
                label={'Password'}
                errors={errors?.general?.password}
                props={{
                    ...register('general.password', {
                        required: true,
                        minLength: {
                            value: 5,
                            message:
                                'Password must be greater than 5 and less than 15 characters',
                        },
                        maxLength: {
                            value: 15,
                            message:
                                'The password must be greater than 5 and less than 15 characters long',
                        },
                    }),
                }}
            />
            <div>
                <RegistrationSelect
                    label={'Country'}
                    errors={errors}
                    control={control}
                    options={options}
                    formName={'general.country'}
                />
            </div>
            <div>
                <LanguageLevelContiner>
                    <div style={{ flex: '1' }}>Language</div>
                    <div style={{ flex: '1' }}>Level</div>
                </LanguageLevelContiner>
                {fields.map((field, index) => (
                    <SelectRangeWrapper>
                        <RegistrationSelect
                            isRange={true}
                            control={control}
                            options={REGISTRATION_LANGUAGE}
                            formName={`general.languages.${index}.language`}
                            errors={errors}
                        />

                        <RegistrationSelect
                            isRange={true}
                            control={control}
                            options={LANGUAGE_LEVEL}
                            formName={`general.languages.${index}.level`}
                            errors={errors}
                        />

                        {index >= 1 && (
                            <LanguageLevelIcon onClick={() => remove(index)}>
                                <AiOutlineDelete
                                    fontSize={'1.2rem'}
                                    color="#8a959e"
                                />
                            </LanguageLevelIcon>
                        )}
                    </SelectRangeWrapper>
                ))}
            </div>
            <Text
                color='#33AAB4'
                fz='0.9rem'
                ff='Inter'
                onClick={() => append({ language: '', level: '' })}
            >
                Add language
            </Text>

            <RegistrationButtonNext trigger={trigger} setStep={setStep} />
        </div>
    )
}
