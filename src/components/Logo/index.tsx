import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logotype from './logo.png'

const LogoStyle = styled.div`
    cursor: pointer;
    img {
        width: 130px;
    }
    @media (max-width: 350px) {
        img {
            width: 110px;
        }
    }
`

function Logo() {
    const navigate = useNavigate()
    return (
        <LogoStyle onClick={() => navigate('/')}>
            <img src={Logotype} />
        </LogoStyle>
    )
}

export default Logo
