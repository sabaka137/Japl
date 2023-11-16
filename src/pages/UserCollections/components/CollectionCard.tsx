import { FC, useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'
import { TfiPencil } from 'react-icons/tfi'
import { FiSettings } from 'react-icons/fi'
import { useAppDispatch } from '../../../hooks/hook'
import ConfirmDeleteModal from '../../../components/Modal/ConfirmDeleteModal'
import { ICollection } from '../../../types/Collections/CollectionType'
import { TbArrowsExchange2 } from 'react-icons/tb'
export const Wrapper = styled(NavLink)`
    width: calc(33.33333% - 50px);
    min-width: 200px;
    display: flex;
    justify-content: space-between;
    background: white;
    box-shadow: 0 0.225rem 0.25rem #00000014;
    height: 130px;
    padding: 20px;
    overflow: hidden;
    text-decoration: none;
    color: #2e3856;
    border-radius: 10px;
    &:hover {
        box-shadow: 0 0.55rem 0.55rem #00000014;
    }
    @media (max-width: 545px) {
        width: 100%;
    }
`
export const Name = styled.div`
    min-width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.7rem;
`
export const Count = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    opacity: 0.7;
`
export const Settings = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;

    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 20px;
    font-size: 1.4rem;
    gap: 15px;
    z-index: 2;
    &:hover {
        cursor: pointer;
    }
`
export const Icon = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        color: black;
        &:hover {
            color: #52667d;
        }
    }
`
export interface Props {
    collection: ICollection
}
export const CollectionCard = ({ collection }: Props) => {
    const [open, setOpen] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    function handleClick(e: any) {
        e.preventDefault()
        setOpen(!open)
    }
    function Delete(e: any) {
        e.preventDefault()
        setDeleteModal(true)
    }

    return (
        <Wrapper to={`/group/${collection.id}`}>
            {deleteModal && (
                <ConfirmDeleteModal
                    setDeleteModal={setDeleteModal}
                    collectionId={collection.id!}
                />
            )}
            <div>
                <Name>{collection.name}</Name>
                <Count>{collection.termins.length} termins </Count>
            </div>
            <Settings onClick={(e) => handleClick(e)}>
                {open && (
                    <>
                        <Icon>
                            <AiOutlineDelete onClick={(e) => Delete(e)} />
                        </Icon>
                        <Icon>
                            <NavLink
                                to={`/group/create/redact/${collection.id}`}
                            >
                                <TbArrowsExchange2 />
                            </NavLink>
                        </Icon>
                    </>
                )}
                <FiSettings />
            </Settings>
        </Wrapper>
    )
}
