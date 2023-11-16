import { useState } from 'react'
import styled from 'styled-components'
import { UserDescription } from '../../../types/User/UserTypes'
const Wrapper = styled.div`
    width: 65%;
    background: white;
    border-radius: 12px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    padding: 15px 30px;
    font-family: Inter;
    @media (max-width: 1028px) {
        width: 100%;
    }
    @media (max-width: 768px) {
        padding: 15px 15px;
    }
    h3 {
        color: #3c4447;
    }
`
const TextContainer = styled.div<{ isOpen: boolean }>`
    padding: 0px 0px 20px 0px;
    height: ${(props) => (props.isOpen ? 'auto' : '120px')};
    overflow: hidden;
`
const DescItem = styled.div`
    margin-bottom: 20px;
    color: #090f19;
    font-size: 0.9rem;
`

const ShowMore = styled.div`
    color: #3bb3bd;
    font-size: 0.9rem;
    font-family: Inter;
    margin-top: 10px;
    &:hover {
        cursor: pointer;
    }
`
type Props = {
    teacherDescription: UserDescription
}
export const Description = ({ teacherDescription }: Props) => {
    const [DescriptionOpen, setDescriptionOpen] = useState(false)
    return (
        <Wrapper>
            <h3>About Tutor</h3>
            <TextContainer isOpen={DescriptionOpen}>
                <DescItem>{teacherDescription.interests}</DescItem>
                <DescItem>{teacherDescription.experience}</DescItem>
                <DescItem>{teacherDescription.motivation}</DescItem>
            </TextContainer>
            <ShowMore onClick={() => setDescriptionOpen(!DescriptionOpen)}>
                Show more
            </ShowMore>
        </Wrapper>
    )
}
