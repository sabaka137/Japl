import styled from 'styled-components'

export const LoginContainer = styled.div`
    width: 400px;
    margin: 40px auto;
    @media (max-width: 600px) {
        width: 100%;
    }
`

export const LoginType = styled.div`
    font-size: 28px;
    font-family: Inter;
    color: #090f19;
    font-weight: bold;
    margin-bottom: 15px;
`
export const LoginErrorMessage = styled.div`
color:#7D0B00;
font-size:0.95rem;
font-weight:400;
margin-bottom:20px;
`
export const LoginChangeType = styled.div`
    color: #006987;
    font-family: Inter;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 3px;
    &:hover {
        cursor: pointer;
        color: #2e81a0;
    }
`

export const ConfirmButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 100%;
    height: 50px;
    background: #0096b2;
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    outline: none;
    border: none;
    border-radius: 12px;
    margin-top: 30px;
    &:hover {
        cursor: pointer;
        background: #22a2be;
    }
`
export const OauthButtonsContainer = styled.div`
margin-top:20px;
`

export const OAuthButton = styled.a<{ type: string }>`
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    color: white;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background: ${(props) =>
        props.type === 'google'
            ? '#4285f4'
            : props.type === 'facebook'
            ? '#3c5a9a'
            : props.type === 'apple' && '#000000'};
    margin-bottom: 10px;
    &:hover {
        cursor: pointer;
        background: ${(props) =>
            props.type === 'google'
                ? '#5794fb'
                : props.type === 'facebook'
                ? '#5375bd'
                : props.type === 'apple' && '#333'};
    }
    svg {
        position: absolute;
        left: 10px;
        font-size: 1.4rem;
    }
    div {
        font-family: Inter;
        font-size: 16px;
        font-weight: 500;
    }
`
export const LoginSeparator = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    position: relative;
    color: #090f19;
    font-family: Inter;
    font-weight: 500;
    margin: 20px 0px;
    &:before {
        content: '';
        display: block;
        width: 45%;
        height: 1px;
        background: #d8dfe6;
    }
    &:after {
        content: '';
        display: block;
        width: 45%;
        height: 1px;
        background: #d8dfe6;
    }
`
