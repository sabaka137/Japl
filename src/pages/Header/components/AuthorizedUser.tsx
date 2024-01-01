import { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { User } from '../../../types/User/UserTypes'

import { Flex } from '../../../components/Common'
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io'
import { IoSearch, IoWalletOutline } from 'react-icons/io5'
import { AvatarModal } from '../../../components/Modal/AvatarModal'
import { Separator } from '../style'
import LocalizationModal from '../../../components/Modal/LocalizationModal'

import DefaultAvatar from '../../../assets/images/DefaultAvatar.png'
import SearchModal from '../../../components/Modal/SearchModal'
import { createPortal } from 'react-dom'

const Avatar = styled.div`
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    margin-left: 10px;
    img {
        width: 30px;
        height: 30px;
    }
    @media (max-width: 1000px) {
        display: none;
    }
`
const IconGroup = styled.div`
    display: flex;
    gap: 10px;
    font-size: 1.4rem;
    box-sizing: border-box;
`
const IconItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    color: #121117;
    cursor: pointer;
    &:hover {
        color: #ff7aac;
    }
    svg {
        cursor: pointer;
    }
`
const SearchItem = styled(IconItem)`
    display: none;
    @media (max-width: 650px) {
        display: flex;
    }
`
const ItemCount = styled.div`
    position: absolute;
    min-width: 15px;
    height: 15px;
    background: black;
    outline: 2px solid white;
    border-radius: 50px;
    top: -1px;
    right: -3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
    font-family: Inter;
    font-weight: bold;
`

const Localization = styled.div`
    color: #192435;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    position: relative;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    &:hover {
        color: #121117;
    }
    svg {
        font-size: 18px;
    }
    @media (max-width: 1000px) {
        display: none;
    }
`

type Props = {
    User: User
    modalActive: boolean
    setModalActive: Dispatch<SetStateAction<boolean>>
    pathname: string
    localizationModal: boolean
    setLocalizationModal: Dispatch<SetStateAction<boolean>>
}

function AuthorizedUser({
    User,
    modalActive,
    setModalActive,
    setLocalizationModal,
    localizationModal,
}: Props) {
    const [modalOpen, setOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <Flex align="center" gap={'10px'}>
            <Flex align="center" gap="20px">
                <Separator />

                <IconGroup>
                    <SearchItem onClick={() => setOpen(true)}>
                        <IoSearch />
                    </SearchItem>
                    <IconItem>
                        <IoWalletOutline />
                    </IconItem>
                    <IconItem onClick={() => navigate('/messages')}>
                        <AiOutlineMessage />
                    </IconItem>
                    <IconItem onClick={() => navigate('/favorite-teachers')}>
                        <AiOutlineHeart />
                        {User.favoriteTeachers.length !== 0 && (
                            <ItemCount>
                                {User.favoriteTeachers.length}
                            </ItemCount>
                        )}
                    </IconItem>
                    <IconItem>
                        <IoMdNotificationsOutline />
                    </IconItem>
                </IconGroup>
            </Flex>

            <Avatar
                onClick={(e) => (
                    e.stopPropagation(),
                    setModalActive(!modalActive),
                    setLocalizationModal(false)
                )}
            >
                <img src={User.photo || DefaultAvatar} />
                {modalActive && <AvatarModal />}
            </Avatar>
            {modalOpen &&
                createPortal(<SearchModal setOpen={setOpen} />, document.body)}
        </Flex>
    )
}

export default AuthorizedUser
