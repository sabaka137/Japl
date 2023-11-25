import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { User } from '../../../types/User/UserTypes'
import { AuthSliceAsyncActions } from '../../../redux/reducers/AuthSlice'
import { useAppDispatch } from '../../../hooks/hook'

import { Flex, Text } from '../../../components/Common'
import { AiOutlineClose } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'

import DefaultAvatar from '../../../assets/images/DefaultAvatar.png'

const Wrapper = styled.div`
    width: 100%;
    display: none;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3;
    overflow-y:hidden;
    @media (max-width: 1000px) {
        display: flex;
        justify-content: flex-end;
    }
`
const Modal = styled.div`
    width: 240px;
    height: 100%;
    background: #384047;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0px 0px 0px 0px;
`
const TopBar = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px 0px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
`
const LinksContainer = styled.div`
    width: 100%;
    flex: 2;
    padding: 24px;

    box-sizing: border-box;
`
const BottomBar = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0px 15px 0px 24px;
`
const Avater = styled.div<{ authorized: boolean }>`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    display: ${(props) => (props.authorized ? 'block' : 'none')};
    img {
        width: 30px;
        height: 30px;
    }
`
const CloseButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
        color: #aeb5bc;
        font-size: 1.3rem;
    }
`

const Link = styled(NavLink)`
    display: block;
    font-size: 1.1rem;
    color: #fff;
    font-weight: 400;

    padding: 5px 0px;
    text-decoration: none;
    cursor:pointer;
    &:hover{
        color:grey;
    }
`
const SelectArrow = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    color: white;
`
const SelectItem = styled.div`
    position: relative;
    margin-bottom: 20px;
`
const Select = styled.select`
    position: relative;
    display: block;
    width: 100%;
    max-width: 100%;
    height: 38px;
    padding: 0 30px 0 12px;
    box-sizing: border-box;
    border: 1px solid #6f757b;
    border-radius: 4px;
    color: white;
    background-color: transparent;
    box-shadow: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    transition: color 50ms, border 50ms, box-shadow 0.2s;
    backface-visibility: hidden;
    cursor: pointer;
    user-select: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;

    option {
        font-weight: normal;
        display: block;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        color: black;
        min-height: 1.2em;
        padding: 0px 2px 1px;
        box-sizing: border-box;
    }
`
type Props = {
    authorized: boolean
    user: User | null
    setSideBarOpen: Dispatch<SetStateAction<boolean>>
}

function SideBar({ authorized, user, setSideBarOpen }: Props) {
    const dispatch = useAppDispatch()
    function Logout() {
        dispatch(AuthSliceAsyncActions.LogOut())
    }
    return (
        <Wrapper onClick={()=>setSideBarOpen(false)}>
            <Modal onClick={(e)=>e.stopPropagation()}>
                <TopBar>
                    <Flex gap={'15px'} align="center">
                        <Avater authorized={authorized}>
                            <img
                                src={
                                    user?.photo ||
                                    DefaultAvatar
                                }
                            />
                        </Avater>
                        <Text color="white" fz={'1.1rem'}>
                            {user?.name}
                        </Text>
                    </Flex>
                    <CloseButton onClick={() => setSideBarOpen(false)}>
                        <AiOutlineClose />
                    </CloseButton>
                </TopBar>
                {authorized ? (
                    <LinksContainer>
                        <div style={{ marginBottom: '30px' }}>
                            <Link
                                onClick={() => setSideBarOpen(false)}
                                to={'/messages'}
                            >
                              Messages
                            </Link>
                            <Link
                                onClick={() => setSideBarOpen(false)}
                                to={'/lessons'}
                            >
                                My lessons
                            </Link>
                            <Link
                                onClick={() => setSideBarOpen(false)}
                                to={'/favorite-teachers'}
                            >
                                Saved
                            </Link>
                            <Link
                                onClick={() => setSideBarOpen(false)}
                                to={'/settings'}
                            >
                                Settings
                            </Link>
                        </div>
                        <div>
                            <Link
                                onClick={() => setSideBarOpen(false)}
                                to={'/groups'}
                            >
                                Collections
                            </Link>
                            <Link
                                onClick={() => setSideBarOpen(false)}
                                to={'/teachers'}
                            >
                                Find tutor
                            </Link>
                            <Text
                                onClick={() => (
                                    Logout(), setSideBarOpen(false)
                                )}
                                style={{cursor:'pointer'}}
                                fz={'1.1rem'}
                                margin={'8px 0px 0px'}
                                color="#fff"
                            >
                                Log out
                            </Text>
                        </div>
                    </LinksContainer>
                ) : (
                    <LinksContainer>
                        <div>
                            <Link
                                onClick={() => setSideBarOpen(false)}
                                to={'/login'}
                            >
                                Collections
                            </Link>
                            <Link
                                onClick={() => setSideBarOpen(false)}
                                to={'/teachers'}
                            >
                              Find tutor
                            </Link>
                            <Link
                                onClick={() => setSideBarOpen(false)}
                                to={'/signup/teacher'}
                            >
                               Become tutor
                            </Link>
                            <Link
                                to={'/login'}
                                onClick={() => setSideBarOpen(false)}
                            >
                                Log in
                            </Link>
                        </div>
                    </LinksContainer>
                )}
                
            </Modal>
        </Wrapper>
    )
}

export default SideBar
