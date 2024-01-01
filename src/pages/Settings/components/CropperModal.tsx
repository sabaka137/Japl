import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactCrop, { Crop, ReactCropProps } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Box, Flex } from '../../../components/Common'
import { UseFormSetValue } from 'react-hook-form'

const CropperWrapper = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    height: 100%;
    z-index: 22;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalWindow = styled.div`
    width: 450px;
    height: 480px;
    background: #ffffff;
    border-radius: 10px;
    @media (max-width: 500px) {
        height: auto;
    }
`
const ModalHeader = styled.div`
    font-family: Inter;
    font-size: 22px;
    color: #090f19;
    border-bottom: 3px solid #f2f2f2;
    box-sizing: border-box;
    padding: 20px 30px;
`
const ModalContent = styled.div`
    display: flex;
    padding: 20px 30px;
    overflow: hidden;
    gap: 25px;
    @media (max-width: 500px) {
        flex-direction: column;
    }
`

const Cropper = styled.div`
    width: 265px;
    height: 265px;
    margin-bottom: 30px;
    img {
        width: 265px;
        height: 265px;
    }
`
const PreviewContainer = styled.div`
    @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
`
const CroppedPreview = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    img {
        min-width: 80px;
        height: 80px;
    }
`
const PreviewText = styled.div`
    width: 80px;
    text-align: left;
    word-break: break-word;
    color: #6f757b;
    font-family: Inter;
    font-size: 13px;
    margin-top: 20px;
    @media (max-width: 500px) {
        width: 100%;
    }
`

const SaveButton = styled.button`
    background: #3bb3bd;
    color: white;
    font-family: Inter;
    font-weight: bold;
    padding: 10px 15px;
    outline: none;
    border: none;
    border-radius: 3px;
    &:hover {
        background: #63c3cb;
        cursor: pointer;
    }
`
const CancelButton = styled.button`
    background: #dadfe1;
    color: #384047;
    font-family: Inter;
    font-weight: 500;
    padding: 10px 15px;
    outline: none;
    border: none;
    border-radius: 3px;
    &:hover {
        background: #e2e6e7;
        cursor: pointer;
    }
`
type ComponentProps = {
    imageToCrop: string
    setValue: UseFormSetValue<{
        name: string
        surname: string
        email: string
        photo: string
        password: string
    }>
    setModalOpen: (e: boolean) => void
}
export const CropperModal: FC<ComponentProps> = ({
    imageToCrop,
    setValue,
    setModalOpen,
}) => {
    const [crop, setCrop] = useState<Crop>({
        unit: 'px',
        x: 0,
        y: 0,
        width: 200,
        height: 200,
    })
    const [image, setImage] = useState<HTMLImageElement | null>(null)
    const [croppedImage, setCroppedImage] = useState<string>('')

    const cropImageNow = () => {
        if (!crop || !image) {
            return
        }
        const canvas = document.createElement('canvas')
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext('2d')

        const pixelRatio = window.devicePixelRatio
        canvas.width = crop.width * pixelRatio
        canvas.height = crop.height * pixelRatio
        ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        ctx!.imageSmoothingQuality = 'high'

        ctx!.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )

        const base64Image = canvas.toDataURL('image/jpeg')
        setCroppedImage(base64Image)
    }

    function handleAprove() {
        setValue('photo', croppedImage)
        setModalOpen(false)
    }
    useEffect(() => {
        cropImageNow()
    }, [crop, image])
    return (
        <CropperWrapper>
            <ModalWindow>
                <ModalHeader>Выбор миниатюры</ModalHeader>
                <ModalContent>
                    <Box w={70}>
                        <Cropper>
                            <ReactCrop
                                src={imageToCrop}
                                onImageLoaded={setImage}
                                maxHeight={400}
                                minHeight={200}
                                minWidth={200}
                                maxWidth={400}
                                crop={crop}
                                onChange={setCrop}
                                onComplete={cropImageNow}
                            />
                        </Cropper>
                        <Flex gap={'10px'}>
                            <SaveButton onClick={() => handleAprove()}>
                                Сохранить
                            </SaveButton>
                            <CancelButton onClick={() => setModalOpen(false)}>
                                Отменить
                            </CancelButton>
                        </Flex>
                    </Box>
                    <PreviewContainer>
                        <CroppedPreview>
                            {croppedImage ? (
                                <img src={croppedImage} />
                            ) : (
                                <img src={imageToCrop} />
                            )}
                        </CroppedPreview>
                        <PreviewText>
                            Выберите область предварительного просмотра фото.
                            Эта версия фото профиля будет отображаться на сайте.
                        </PreviewText>
                    </PreviewContainer>
                </ModalContent>
            </ModalWindow>
        </CropperWrapper>
    )
}
