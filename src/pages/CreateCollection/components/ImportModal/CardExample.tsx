import { Flex } from '../../../../components/Common'
import styled from 'styled-components'
import { CollectionTermin } from '../../../../types/Collections/CollectionType'

const CardExampleWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 50px;
    background: white;
    box-shadow: 0 0.25rem 1rem 0 #2e385614;
    box-sizing: border-box;
    padding: 10px 20px;
    border-radius: 10px;
    heigth: 100px;
    margin-bottom: 20px;
    @media (max-width: 600px) {
        flex-direction: column;
        gap: 10px;
    }
    &:first-child {
        gap: 20px;
    }
`
const CardItem = styled.div`
    width: 33%;
    font-family: Inter;
    color: #939bb4;
    @media (max-width: 600px) {
        width: 100%;
    }
    span {
        text-transform: uppercase;
        font-size: 0.8rem;
    }
    div {
        min-height: 30px;
        padding: 10px;
        padding-left: 0px;
        padding-bottom: 0px;
        margin-bottom: 5px;
        border-bottom: 2px solid #939bb4;
    }
`
const Count = styled.div`
    color: #939bb4;
    font-size: 1.3rem;
`
type Props = {
    card: CollectionTermin
    index: number
}
export const CardExample = ({ card, index }: Props) => {
    return (
        <Flex>
            <CardExampleWrapper>
                <Count>{index}</Count>
                <CardItem>
                    <div>{card.termin}</div>
                    <span>Termin</span>
                </CardItem>
                <CardItem>
                    <div>{card.reading}</div>
                    <span>Reading</span>
                </CardItem>
                <CardItem>
                    <div>{card.meaning}</div>
                    <span>Meaning</span>
                </CardItem>
            </CardExampleWrapper>
        </Flex>
    )
}

export default CardExample
