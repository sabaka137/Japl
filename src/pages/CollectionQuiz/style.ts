import styled from 'styled-components'

export const ResultNavigation = styled.div`
    position: fixed;
    left: 30px;
    width: 150px;
    height: 300px;
`
export const ResultNavigationOpenModal = styled.div`
    position: fixed;
    right: 20px;
    color: black;
    font-size: 1.3rem;
    top: 70px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 2px solid #f6f7fb;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`
export const ResultNavigationWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    box-sizing:border-box;
    padding:0px 10px;
    align-items: center;
`
export const ResultNavigationMobal = styled.div`
    width: 640px;
    min-height: 500px;
    background: #ffffff;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 20px;
    z-index: 2;
    @media (max-width: 700px) {
        width: 95%;
        height: auto;
    }
    @media (max-width: 500px) {
        width: 100%;
        height: auto;
    }
`
export const Close = styled.div`
    font-size: 1.5rem;
    color: black;
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
    &:hover {
        cursor: pointer;
    }
`
export const Text = styled.div`
    font-size: 1.8rem;
    color: #2e3856;
    font-weight: bold;
    margin-bottom: 15px;
`
export const Item = styled.div<{ isCorrect: boolean }>`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    font-family: Inter;
    padding: 3px 5px;
    gap: 5px;
    border-radius: 2px;
    color: #586380;
    &:hover {
        background: #edeff4;
        cursor: pointer;
    }
    svg {
        color: ${(props) => (props.isCorrect ? '#59e8b5' : '#da4543')};
        font-size: 1.4rem;
    }
`
export const QuizCard = styled.div`
    width: 55%;
    margin: 0 auto;
    background: white;
    box-shadow: 0 0.25rem 1rem 0 #2e385614;
    box-sizing: border-box;
    justify-content: center;
    padding: 30px;
    margin-bottom: 30px;
    font-size: 2rem;
    border-radius: 10px;
    @media (max-width: 1028px) {
        width: 70%;
    }
    @media (max-width: 778px) {
        width: 100%;
    }
`

export const QuizQuestion = styled.div`
    display: flex;
    height: 300px;

    position: relative;
    @media (max-width: 600px) {
        display: block;
        height: 230px;
    }
    @media (max-width: 460px) {
        height: 200px;
    }
`
export const QuizVariants = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 40px;

    @media (max-width: 460px) {
        display: block;
    }
`

export const Variant = styled.div<any>`
    width: calc(50% - 12px);
    display: flex;
    align-items: center;
    borderradius: 5px;
    color: #2e3856;
    margintop: 15px;
    background: ${(props) => props.BGStyle};
    border: ${(props) => props.borderStyle};
    box-sizing: border-box;
    opacity: ${(props) => props.OpacityStyle};
    border-radius: 10px;
    padding: 15px 15px;
    font-size: 1.5rem;
    font-weight: 400;
    &:hover {
        border: ${(props) => props.mode === 'quiz' && '1px solid #858fab'};
        cursor: ${(props) => props.mode === 'quiz' && 'pointer'};
    }
    svg {
        margin-right: 15px;
    }
    span {
        &:hover {
            cursor: ${(props) =>
                props.mode === 'results' ? 'default' : 'pointer'};
        }
    }
    @media (max-width: 460px) {
        margin-bottom: 20px;
        width: 100%;
    }
`

export const QuizSide = styled.div`
    width: 50%;
    box-sizing: border-box;
    padding: 0px 20px;
    &:first-child {
        padding: 0px;
        border-right: 1px solid #858fab;
    }
    @media (max-width: 600px) {
        width: 100%;
        &:first-child {
            border-right: none;
            border-bottom: 1px solid #858fab;
            padding-bottom: 20px;
        }
    }
`
//color #57627f
export const SideValue = styled.div`
    height: 30px;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    font-family: Inter;
    color: #939bb4;
    font-weight: bold;
    @media (max-width: 600px) {
        padding-top: 0px;
        font-size: 0.9rem;
    }
`
export const QuestionValue = styled.div`
    font-size: 1.5rem;
    margin-top: 20px;
    font-family: Inter;
    color: #2e3856;
`

export const QuestionOrder = styled.div`
    position: absolute;
    right: 0;
    font-size: 1rem;
    color: #57627f;
`
export const ResultCorrectAnswer = styled.div`
    width: 100%;
    height: 80px;
    background: #18ae79;
    display: flex;
    align-items: center;
    border-radius: 10px;
    border: 2px solid #c7f7e6;
    padding: 0px 20px;
    box-sizing: border-box;
    font-size: 1.7rem;
    font-weight: 600;
    color: #e0ecf0;
    gap: 10px;
    margin-top: 40px;
    svg {
        color: #98f1d1;
    }
`