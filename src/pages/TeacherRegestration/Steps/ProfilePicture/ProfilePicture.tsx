import React, { useCallback, useRef, useState } from 'react'
import { useAppDispatch } from '../../../../hooks/hook'
import styled from 'styled-components'
import Cropper from './Cropper'
import { RegistrationButtonNext } from '../../../../components/Button/RegistrationButtonNext'
import { Flex, Text } from '../../../../components/Common'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import uploadIcon from '../../../../assets/images/UploadIcon.png'
import { RegistrationButtonPrev } from '../../../../components/Button/RegistrationButtonPrev'
import { DragImageContainer, LoadButton, UploadIcon } from '../style'
import {
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
} from 'react-hook-form'
import { TeacherReg, User } from '../../../../types/User/UserTypes'

type Props = {
    setValue: UseFormSetValue<{
        general: TeacherReg
    }>
    setStep: React.Dispatch<React.SetStateAction<number>>
    trigger: UseFormTrigger<{
        general: TeacherReg
    }>
    register: UseFormRegister<{
        general: TeacherReg
    }>
}

function ProfilePicture({ register, trigger, setStep, setValue }: Props) {
    const [file, setSelectedFile] = useState<any>(null)
    const [isDragOver, setOver] = useState(false)
    const [croppedImage, setCroppedimage] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <>
            <Flex gap={'40px'}>
                <div style={{ flex: 2 }}>
                    <Text
                        color="#090F19"
                        ff="Inter"
                        fz="24px"
                        fw="600"
                        margin="0px 0px 30px 0px"
                    >
                        Profile photo
                    </Text>
                    <Text
                        color="#090F19"
                        ff="Inter"
                        fz="20px"
                        margin="0px 0px 20px 0px"
                    >
                        Make the best impression
                    </Text>
                    <Text
                        color="#6F757B"
                        ff="Inter"
                        fz="14px"
                        margin="0px 0px 15px 0px"
                    >
                        Students prefer tutors who look friendly and
                        professional
                    </Text>
                    <div>
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            accept="image/*"
                            {...register(`general.photo`, {
                                required: 'Required field',
                            })}
                            ref={inputRef}
                            onChange={(e) => {
                                e.target.files !== null &&
                                    setSelectedFile(e.target.files[0])
                            }}
                        />
                        <LoadButton
                            type="button"
                            onClick={(e) => inputRef?.current?.click()}
                        >
                            Upload photo
                        </LoadButton>
                    </div>
                    <DragImageContainer
                        fileExist={file !== null}
                        isDragOver={isDragOver}
                        onDrop={(e) => {
                            e.preventDefault()
                            e.persist()
                            setSelectedFile(e.dataTransfer.files[0])
                        }}
                        onDragOver={(e) => {
                            e.preventDefault()
                            setOver(true)
                        }}
                        onDragLeave={(e) => {
                            e.preventDefault()
                            setOver(false)
                        }}
                    >
                        {file ? (
                            <Cropper
                                imageToCrop={URL.createObjectURL(file)}
                                setValue={setValue}
                                setCroppedImage={setCroppedimage}
                            />
                        ) : (
                            <Flex align="center" direction="column">
                                <UploadIcon>
                                    <img src={uploadIcon} />
                                </UploadIcon>
                                <Text
                                    ff="Inter"
                                    fw="bold"
                                    color="#a0a0a0"
                                    fz="18px"
                                >
                                    Drag photo over here
                                </Text>
                            </Flex>
                        )}
                    </DragImageContainer>
                </div>
            </Flex>

            <Flex gap={'10px'}>
                <RegistrationButtonPrev setStep={setStep} />
                <RegistrationButtonNext trigger={trigger} setStep={setStep} />
            </Flex>
        </>
    )
}

export default ProfilePicture
