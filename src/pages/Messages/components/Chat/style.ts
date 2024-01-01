import styled from 'styled-components'

export const TopBar = styled.div`
    min-height: 60px;
    border-bottom: 1px solid #d8dfe6;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 12px;
`
export const MobileTopBar = styled.div`
    min-height: 60px;
    background: #f8f8f8;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 12px;
`

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2 0 0px;
    overflow-y: scroll;
    overflow-x: hidden;

    padding: 20px;
    box-sizing: border-box;
    &::-webkit-scrollbar {
        display: none;
    }
`

export const MessageContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
`

export const MessageItem = styled.div<{ owner: boolean }>`
    display: flex;
    gap: 10px;
    align-self: ${(props) => (props.owner ? 'flex-end' : 'flex-start')};
    max-width: 45%;

    margin-top: 10px;
`
export const AvatarContainer = styled.div<{ owner: boolean }>`
    display: ${(props) => (props.owner ? 'none' : 'block')};
    align-self: flex-end;
    min-width: 30px;
`

export const Avatar = styled.div`
    width: 30px;
    height: 30px;

    border-radius: 50%;
    overflow: hidden;
    background: red;
    img {
        width: 30px;
        height: auto;
    }
`

export const MessageText = styled.div<{ owner: boolean }>`
    background: ${(props) => (props.owner ? '#c3f5fa' : '#f7f5f2')};
    padding: 12px 12px 8px;
    border-radius: 10px;
    display: flex;
    line-height: 1.2rem;
    flex-direction: column;
    font-family: Noto Sans;
    word-break: break-word;
    color: #384047;
    text-align: left;
    font-weight: 400;
`
export const MessageTime = styled.div`
    align-self: flex-end;
    font-size: 0.7rem;
    color: #6f757b;
`

export const InputContainer = styled.div`
    height: 60px;
    display: flex;
    border-top: 1px solid #d8dfe6;
`

export const MessageInput = styled.input`
    height: 100%;
    border: none;
    box-sizing: border-box;
    color: #384047;
    font-weight: 500;
    padding: 0px 10px;
    font-size: 1rem;
    flex: 1;
    &:focus {
        border: none;
        outline: none;
    }
`

export const SendButton = styled.button<{ isEmpty: boolean }>`
    border: none;
    background: none;
    svg {
        color: ${(props) => (props.isEmpty ? '#8194a7' : '#0096b2')};
        font-size: 1.3rem;
        cursor: pointer;
        &:hover {
            color: ${(props) => (props.isEmpty ? '#8194a7' : '#4cb5c9')};
        }
    }
`
