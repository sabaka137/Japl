import React, { useEffect, useRef, useState } from 'react'
import { Container, Flex } from '../../components/Common'
import SettingsNavbar from '../../components/SettingsNavbar'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form'
import { UpdateUser, setUserAvatarLocal } from '../../redux/reducers/UserSlice'
import { CropperModal } from './components/CropperModal'
import {
    AvatarContainer,
    AvatarItem,
    ButtonContainer,
    ContentForm,
    ImageInfo,
    LeftSide,
    LoadButton,
    RightSide,
    SaveChangesButton,
    SettingsContainer,
    SettingsInput,
    SettingsItem,
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
        const FileList: FileList | null = e.target.files
        setSelectedFile(URL.createObjectURL(FileList![0]))
        setModalOpen(true)
    }

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setLoader(true)
        dispatch(UpdateUser(data)).then((res) => {
            setLoader(false)
            if (getValues('photo')) {
                dispatch(setUserAvatarLocal(getValues('photo')))
            }
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
            <SettingsContainer>
                <Title>Profile settings</Title>
                <ContentForm onSubmit={handleSubmit(onSubmit)}>
                    <Flex justify="space-between">
                        <AvatarItem>Avatar</AvatarItem>
                        <RightSide>
                            <AvatarContainer>
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
                                <ButtonContainer>
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
                                </ButtonContainer>
                            </AvatarContainer>
                        </RightSide>
                    </Flex>
                    <SettingsItem>
                        <LeftSide>Name</LeftSide>
                        <RightSide>
                            <SettingsInput {...register('name')} />
                        </RightSide>
                    </SettingsItem>
                    <SettingsItem>
                        <LeftSide>Surname</LeftSide>
                        <RightSide>
                            <SettingsInput {...register('surname')} />
                        </RightSide>
                    </SettingsItem>
                    <SettingsItem>
                        <LeftSide>E-mail</LeftSide>
                        <RightSide>
                            <SettingsInput
                                {...register('email')}
                                value={User?.email}
                            />
                        </RightSide>
                    </SettingsItem>
                    <SettingsItem>
                        <LeftSide>Password</LeftSide>
                        <RightSide>
                            <SettingsInput {...register('password')} />
                        </RightSide>
                    </SettingsItem>
                    <SaveChangesButton type="submit">
                        {saveLoader ? <ButtonLoader /> : 'Save changes'}
                    </SaveChangesButton>
                </ContentForm>
            </SettingsContainer>
        </div>
    )
}
