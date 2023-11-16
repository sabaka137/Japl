import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logotype from './logo.png'

const LogoStyle = styled.div`
    margin-left: -10px;
    cursor:pointer;
    img {
        width: 130px;
    }
`

function Logo() {
    const navigate = useNavigate() 
    return (
        <LogoStyle onClick={()=>navigate('/')}>
            <img src={Logotype} />
        </LogoStyle>
    )
}

export default Logo
