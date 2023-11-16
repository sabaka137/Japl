import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { CollectionSliceAsyncActions } from '../../redux/reducers/CollectionSlice'

import { ICollection } from '../../types/Collections/CollectionType'

import { CustomInput, ErrorMessage } from './style'
import {
    Box,
    Container,
    ContentContainer,
    Flex,
    PageWrapper,
} from '../../components/Common'
import TermCard from './components/TermCard'
import { CreateTerm } from './components/CreateTerm'
import { useAppDispatch } from '../../hooks/hook'
import ImportModal from './components/ImportModal'
import { ButtonLoader } from '../../components/Loader/ButtonLoader'
import { CreateCollectionButton, ImportButton } from './style'
import { HiOutlinePlus } from 'react-icons/hi'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const defaultValue = {
    name: '',
    description: '',
    termins: [
        {
            id: 1,
            termin: '',
            meaning: '',
            reading: '',
            isValide: false,
        },
        {
            id: 2,
            termin: '',
            meaning: '',
            reading: '',
            isValide: false,
        },
        {
            id: 3,
            termin: '',
            meaning: '',
            reading: '',
            isValide: false,
        },
    ],
}
function CreateGroup() {
    const [collection, setCollection] = useState<ICollection>(defaultValue)
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        control,
        getValues,
        setValue,
        reset,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            description: '',
            termins: [
                {
                    id: 1,
                    termin: '',
                    meaning: '',
                    reading: '',
                    isValide: false,
                },
                {
                    id: 2,
                    termin: '',
                    meaning: '',
                    reading: '',
                    isValide: false,
                },
                {
                    id: 3,
                    termin: '',
                    meaning: '',
                    reading: '',
                    isValide: false,
                },
            ],
        },
    })
    const { fields, append, remove } = useFieldArray({
        control,
        rules: {
            minLength: {
                value: 3,
                message: 'Минимальная длина коллекции должна быть больше 3',
            },
            maxLength: 100,
        },
        name: 'termins',
    })
    //fix- disable button on validation
    const [isDisable, setDisable] = useState<boolean>(false)
    const [fetching, setFetching] = useState<boolean>(false)
    const [importModal, setImportModal] = useState<boolean>(false)
    const [createType, setCreateType] = useState<'redact' | 'create'>('create')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { type, id } = useParams()

    useEffect(() => {
        if (type === 'redact') {
            //if user wants to change collection, redirect from user/collections
            dispatch(CollectionSliceAsyncActions.GetCollection(id!)).then(
                (res) => {
                    reset({
                        name: res.payload.name,
                        description: res.payload.description,
                        termins: res.payload.termins,
                    })
                }
            )
            setCreateType('redact')
        }
    }, [])
    const onSubmit: SubmitHandler<any> = (data) => {
        setFetching(true)
        if (type === 'redact') {
            //user updates collection
            dispatch(
                CollectionSliceAsyncActions.UpdateCollection({
                    id: id!,
                    group: {
                        name: getValues('name'),
                        description: getValues('description'),
                        termins: getValues('termins'),
                    },
                })
            ).then(() => {
                setFetching(false)

                navigate('/groups')
            })
        } else {
            //user creates collection
            dispatch(
                CollectionSliceAsyncActions.CreateCollection({
                    name: getValues('name'),
                    description: getValues('description'),
                    termins: getValues('termins'),
                })
            ).then(() => {
                setFetching(false)
                navigate('/groups')
            })
        }
    }
    return (
        <PageWrapper>
            <ContentContainer>
                <Container w={70} m={'0 auto'}>
                    {importModal && (
                        //fix add animation for modal
                        <ImportModal
                            getValues={getValues}
                            setValue={setValue}
                            append={append}
                            setGroup={setCollection}
                            group={collection}
                            setImportModal={setImportModal}
                        />
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box margin={'0px 0px 30px'}>
                            <div>
                                <CustomInput
                                    isValide={Object.keys(errors).includes(
                                        'name'
                                    )}
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: 'Enter a name',
                                        },
                                        maxLength: 50,
                                    })}
                                    placeholder="Enter a name"
                                />
                                <ErrorMessage>
                                    {errors.name?.message}
                                </ErrorMessage>
                            </div>
                            <div>
                                <CustomInput
                                    {...register('description', {
                                        maxLength: 50,
                                    })}
                                    placeholder="Enter a description"
                                />
                            </div>
                            <ImportButton type='button' onClick={() => setImportModal(true)}>
                                <AiOutlinePlusCircle /> Import card
                            </ImportButton>
                        </Box>
                        {fields.map((field, index) => (
                            <TermCard
                                errors={
                                    errors.termins !== undefined &&
                                    errors.termins[index]
                                }
                                getValues={getValues}
                                id={field.id}
                                remove={remove}
                                register={register}
                                index={index}
                            />
                        ))}

                        <div
                            onClick={() =>
                                append({
                                    id: 44,
                                    termin: '',
                                    reading: '',
                                    meaning: '',
                                    isValide: false,
                                })
                            }
                        >
                            <CreateTerm />
                        </div>
                        <Flex justify="flex-end">
                            <CreateCollectionButton>
                                {fetching ? (
                                    <ButtonLoader />
                                ) : (
                                    <div>
                                        {createType === 'create'
                                            ? 'Create'
                                            : 'Change'}
                                    </div>
                                )}
                            </CreateCollectionButton>
                        </Flex>
                    </form>
                </Container>
            </ContentContainer>
        </PageWrapper>
    )
}

export default CreateGroup
