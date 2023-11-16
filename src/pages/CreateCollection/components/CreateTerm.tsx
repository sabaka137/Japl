import styled from 'styled-components'
import { Flex } from '../../../components/Common'
export const Content = styled.div`
    border-bottom: 5px solid #3ccfcf;
    padding: 10px 20px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #2e3856;
    @media (max-width: 400px) {
        font-size: 1rem;
        border-bottom: 3px solid #3ccfcf;
        padding: 10px 10px;
    }

    span {
        margin-right: 10px;
    }
`
export const Wrapper = styled.div`
    width: 100%;
    height: 120px;
    background: white;
    box-shadow: 0 0.25rem 1rem 0 #2e385614;
    border-radius: 10px;
    margin-bottom: 25px;

    &:hover {
        color: #d1a713;
        cursor: pointer;
        ${Content} {
            border-bottom: 5px solid #d1a713;
        }F
    }
`

export const CreateTerm = () => {
    return (
        <Wrapper>
            <Flex h={'100%'} justify="center" align="center">
                <Content>
                    <span>+</span>
                    <span>Add a new card</span>
                </Content>
            </Flex>
        </Wrapper>
    )
}
