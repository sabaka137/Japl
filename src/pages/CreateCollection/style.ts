import styled from 'styled-components'

export const ImportButton = styled.button`
    border: 1px solid #d9dde8;
    background: white;
    color: #2e3856;
    border-radius: 7px;
    padding: 12px 30px;
    font-weight: bold;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    margin-top: 20px;

    svg {
        margin-right: 5px;
        color: #2e3856;
        font-weight: bold;
        font-size: 1.2rem;
    }
    &:hover {
        background: #edeff4;
        cursor: pointer;
    }
`

export const CreateCollectionButton = styled.button`
    background: #4255ff;
    border-radius: 10px;
    font-size: 1.2rem;
    color: #fff;
    border: none;
    font-family: Inter;
    height: 65px;
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const CustomInput = styled.input<{ isValide?: boolean }>`
    display: block;
    width: 30%;
    height: 30px;
    border: none;
    border-bottom: ${(props) =>
        props.isValide ? '2px solid #FF725B' : '2px solid #2e3856'};
    background: transparent;
    font-size: 0.9rem;
    font-family: Inter;
    color: #2e3856;
    padding: 5px 10px;

    @media (max-width: 600px) {
        width: 90%;
    }
    &:focus {
        outline: none;
        border-bottom: ${(props) =>
            props.isValide ? '2px solid #FF725B' : '2px solid #ffcd1f'};
        border-bottom:;
    }
`
export const ErrorMessage = styled.div`
    color: #ff725b;
`
export const TermCardContainer = styled.div`
    width: 100%;
    height: 170px;
    background: white;
    border-radius: 10px;
    margin-bottom: 25px;
    box-shadow: 0 0.25rem 1rem 0 #2e385614;
    @media (max-width: 600px) {
        height: auto;
        padding: 10px 0px 20px;
    }
`
export const TermCardItem = styled.div`
    width: 100%;
    padding: 0px 20px;
    margin-top: 40px;
    box-sizing: border-box;
    gap: 30px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 600px) {
        margin-top: 10px;
        display: block;
    }
`
export const TermCardTop = styled.div`
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid #f6f7fb;
    box-sizing: border-box;
`
