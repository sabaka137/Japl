import React, {useEffect, useRef, useState } from 'react'
import { Container, Flex } from '../../components/Common'
import SettingsNavbar from '../../components/SettingsNavbar'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form'
import { UpdateUser } from '../../redux/reducers/UserSlice'
import { CropperModal } from './components/CropperModal'
import {
    ContentForm,
    ImageInfo,
    LeftSide,
    LoadButton,
    RightSide,
    SaveChangesButton,
    SettingsInput,
    Title,
    UserPhoto,
} from './style'

import DefaultAvatar from '../../assets/images/DefaultAvatar.png'
import { ChangeTitle } from '../../utils/ChangeTitle'
import { ButtonLoader } from '../../components/Loader/ButtonLoader'

type FormValues = {
    name: string
    surname: string
    email: string
    photo: string
    password: string
}
export const Settings = () => {
    const [file, setSelectedFile] = useState<any>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [saveLoader, setLoader] = useState(false)

    const inputRef = useRef<HTMLInputElement | null>()
    const dispatch = useAppDispatch()
    const { User } = useAppSelector((state) => state.user)
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
        getValues,
    } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            photo: '',
            password: '',
        },
    })
    const { ref, ...rest } = register('name')
    useEffect(() => {
        ChangeTitle('Japl | Settings')
        if (User) {
            reset({
                name: User.name,
                surname: User.surname,
                email: User.email,
                photo: User.photo,
                password: '',
            })
        }
    }, [User])
    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        let FileList: FileList | null = e.target.files
        setSelectedFile(URL.createObjectURL(FileList![0]))
        setModalOpen(true)
    }

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setLoader(true)
        dispatch(UpdateUser(data)).then((res) => {
            setLoader(false)
        })
    }

    return (
        <div style={{ background: '#edeff0', height: window.innerHeight }}>
            {modalOpen && (
                <CropperModal
                    imageToCrop={file}
                    setModalOpen={setModalOpen}
                    setValue={setValue}
                />
            )}
            <SettingsNavbar />
            <Container
                style={{
                    background: 'white',
                    height: '800px',
                    marginTop: '30px',
                }}
                w={40}
                m={'0 auto'}
            >
                <Title>Profile settings</Title>
                <ContentForm onSubmit={handleSubmit(onSubmit)}>
                    <Flex justify="space-between">
                        <LeftSide>Avatar</LeftSide>
                        <RightSide>
                            <Flex justify="space-between">
                                <UserPhoto>
                                    <img
                                        src={
                                            getValues('photo') === undefined
                                                ? DefaultAvatar
                                                : getValues('photo') ||
                                                  User?.photo
                                        }
                                    />
                                </UserPhoto>
                                <Flex direction="column" align="flex-end">
                                    <input
                                        style={{ display: 'none' }}
                                        type="file"
                                        accept="image/*"
                                        {...rest}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleUpload(e)}
                                        name="name"
                                        ref={(e) => {
                                            ref(e)
                                            inputRef.current = e
                                        }}
                                    />
                                    <LoadButton
                                        type="button"
                                        onClick={(e) =>
                                            inputRef?.current?.click()
                                        }
                                    >
                                        Upload photo
                                    </LoadButton>
                                    <ImageInfo>
                                        Max. size - 2 Mb. JPG or PNG format.
                                    </ImageInfo>
                                </Flex>
                            </Flex>
                        </RightSide>
                    </Flex>
                    <Flex m={'20px 0px'} justify="space-between" align="center">
                        <LeftSide>Name</LeftSide>
                        <RightSide>
                            <SettingsInput {...register('name')} />
                        </RightSide>
                    </Flex>
                    <Flex m={'20px 0px'} justify="space-between" align="center">
                        <LeftSide>Surname</LeftSide>
                        <RightSide>
                            <SettingsInput {...register('surname')} />
                        </RightSide>
                    </Flex>
                    <Flex m={'20px 0px'} justify="space-between" align="center">
                        <LeftSide>E-mail</LeftSide>
                        <RightSide>
                            <SettingsInput
                                {...register('email')}
                                value={User?.email}
                            />
                        </RightSide>
                    </Flex>
                    <Flex m={'20px 0px'} justify="space-between" align="center">
                        <LeftSide>Password</LeftSide>
                        <RightSide>
                            <SettingsInput {...register('password')} />
                        </RightSide>
                    </Flex>
                    <SaveChangesButton type="submit">
                        {saveLoader ? <ButtonLoader /> : 'Save changes'}
                    </SaveChangesButton>
                </ContentForm>
            </Container>
        </div>
    )
}
