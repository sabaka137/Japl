import styled from 'styled-components'

export const ConversationsWrapper = styled.div`
    border-right: 1px solid #d8dfe6;
    width: 450px;
    @media (max-width: 1350px) {
        min-width: 350px;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`

export const ConversationsContent = styled.div<{ empty: boolean }>`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: ${(props) => (props.empty ? 'center' : 'left')};
    align-items: ${(props) => (props.empty ? 'center' : 'left')};
`

export const ConversationInput = styled.input`
    width: 100%;
    margin-top: 5px;
    padding: 15px 12px;
    font-size: 1rem;
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    outline: none;
    &:focus {
    }
`
