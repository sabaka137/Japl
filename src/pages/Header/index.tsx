import { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'

import { SocketContext } from '../../context/SocketContext'
import { useAppSelector } from '../../hooks/hook'

import {
    HeaderWrapper,
    LeftSide,
    NavItem,
    NavItems,
    OpenSidebarButton,
    Separator,
    UserContainer,
} from './style'
import Logo from '../../components/Logo'
import HeaderSearch from './components/HeaderSearch/HeaderSearch'
import AuthorizedUser from './components/AuthorizedUser'
import SideBar from './components/SideBar'
import NonAuthorizedUser from './components/NonAuthorizedUser'
import { AiOutlineMenu } from 'react-icons/ai'
import { Flex } from '../../components/Common'

function Header() {
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [localizationModal, setLocalizationModal] = useState(false)
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(false)
    const User = useAppSelector((state) => state.user.User)
    const path = useLocation()
    const socket = useContext(SocketContext)
    socket.on('receive-notification', () => {
        //show notif
    })
    useEffect(() => {
        document.body.addEventListener('click', () => {
            setModalActive(false)
            setLocalizationModal(false)
        })
    }, [User])
    return (
        <HeaderWrapper pathname={path.pathname}>
            <Flex align="center" gap="15px" style={{ flex: 2 }}>
                <Logo />
                <Separator />
                <LeftSide>
                    <NavItems>
                        <NavItem pathname={path.pathname} to="/groups">
                            Collections
                        </NavItem>
                        <NavItem pathname={path.pathname} to="/teachers">
                            Find Tutors
                        </NavItem>
                    </NavItems>
                    <HeaderSearch />
                </LeftSide>
            </Flex>

            <UserContainer>
                {localStorage.getItem('token') ? (
                    User && (
                        <>
                            <AuthorizedUser
                                pathname={path.pathname}
                                setLocalizationModal={setLocalizationModal}
                                localizationModal={localizationModal}
                                User={User}
                                modalActive={modalActive}
                                setModalActive={setModalActive}
                            />
                        </>
                    )
                ) : (
                    <>
                        <NonAuthorizedUser
                            setLocalizationModal={setLocalizationModal}
                            localizationModal={localizationModal}
                        />
                    </>
                )}
                <OpenSidebarButton onClick={() => setSideBarOpen(true)}>
                    <AiOutlineMenu />
                </OpenSidebarButton>
                {sideBarOpen &&
                    createPortal(
                        <SideBar
                            authorized={User !== null}
                            user={User}
                            setSideBarOpen={setSideBarOpen}
                        />,
                        document.body
                    )}
            </UserContainer>
        </HeaderWrapper>
    )
}

export default Header
