import React, { Dispatch, SetStateAction, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Flex } from '../Common'
import { useAppDispatch } from '../../hooks/hook'
import { ButtonLoader } from '../Loader/ButtonLoader'
import { CollectionSliceAsyncActions } from '../../redux/reducers/CollectionSlice'
import DeleteImg from '../../assets/images/ConfirmDelete.png'

export const Wrapper = styled.div`
    position: fixed;
    z-index: 4;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
   
    &:hover {
        cursor: default;
    }
`

export const Modal = styled.div`
    width: 400px;
    background: #f0f0f0;
    border-radius: 20px;
    z-index: 3;
    display: flex;
    justify-content: center;
    color: black;
    box-sizing: border-box;
    padding: 30px 30px;
    @media(max-width:500px){
        width:250px;
        padding: 15px;
    }
`

export const ConfirmText = styled.div`
    font-size: 1.4rem;
    text-align: center;
    font-weight: bold;
    width: 80%;
    margin-bottom: 30px;
    @media(max-width:500px){
        font-size:1.1rem;
    }
`
export const ConfirmImage = styled.div`
    width:200px;
    img{
        width:200px;
        height:200px;
    }
`
export const Button = styled.button<{delete?:boolean, onClick: (e: Event) => void;}>`
    width: 170px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${(props) => (props.delete ? 'none' : '1px solid grey')};
    font-size: 1.1rem;
    background: ${(props) => props.delete && '#d01930'};
    color: ${(props) => props.delete && 'white'};
    &:hover {
        cursor: pointer;
    }
    @media(max-width:500px){
        width: 100px;
        height: 45px;
    }
`

type Props = {
    collectionId:number;
    setDeleteModal:Dispatch<SetStateAction<boolean>>
}

export const  ConfirmDeleteModal=({ collectionId, setDeleteModal }:Props)=> {
    const [deletion, setDeletion] = useState(false)
    const dispatch = useAppDispatch()
    function ConfirmDelete() {
        setDeletion(true)
        dispatch(CollectionSliceAsyncActions.DeleteCollection(collectionId)).then(() => {
            setDeletion(false)
            setDeleteModal(false)
        })
    }
    function outsideClick(e:any) {
        e.preventDefault()
    }
    return (
        <Wrapper onClick={(e) => outsideClick(e)}>
            <Modal>
                <Flex align='center' direction='column'>
                    <ConfirmImage>
                        <img src={DeleteImg}/>
                    </ConfirmImage>
                    <ConfirmText>
                        Are you sure you want to delete this collection
                    </ConfirmText>

                    <Flex gap={'20px'} >
                        <Button onClick={() => setDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            disabled={deletion}
                            onClick={() => ConfirmDelete()}
                            delete={true}
                        >
                            {deletion ? <ButtonLoader /> : <div>Delete</div>}
                        </Button>
                    </Flex>
                </Flex>
            </Modal>
        </Wrapper>
    )
}

export default ConfirmDeleteModal
