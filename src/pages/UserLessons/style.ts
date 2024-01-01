import styled from 'styled-components'
export const LessonsWrapper = styled.div`
    width: 50%;
    margin: 30px auto;
    border-radius: 5px;

    box-sizing: border-box;
    padding: 0px 10px;

    @media (max-width: 1500px) {
        width: 50%;
    }
    @media (max-width: 1200px) {
        width: 65%;
    }
    @media (max-width: 1028px) {
        width: 80%;
    }
    @media (max-width: 769px) {
        width: 95%;
    }
`
export const LessonsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    justify-content: center;
`

export const LessonsImage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    img {
        width: 200px;
        height: 200px;
    }
`
export const Test = styled.div`
    width: 250px;
`
export const Text = styled.div`
    text-align: center;
    font-family: Inter;
    color: #090f19;
    font-size: 1.4rem;
    margin-bottom: 10px;
`

export const Text1 = styled.div`
    text-align: center;
    font-family: Inter;
    font-size: 0.9rem;
    color: #989c9e;
    margin-bottom: 10px;
`

export const Button = styled.button`
    width: 100%;
    height: 50px;
    background: #3bb3bd;
    border: none;
    border-radius: 3px;
    color: white;
    font-family: Inter;
    font-size: 1.1rem;
    cursor: pointer;
`
