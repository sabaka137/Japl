import styled from 'styled-components'

export const FavoriteContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 70px;
`
export const FavoriteImage = styled.div`
    margin-bottom: 20px;
`
export const Title = styled.div`
    font-size: 24px;
    color: #121117;
    font-weight: bold;
    font-family: Inter;
    margin-bottom: 20px;
`
export const Text = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    text-align: center;
    font-family: Inter;
    color: #090f19;
    font-size: 1.4rem;
    margin-bottom: 10px;
    font-weight: 500;
    svg {
        color: #6f757b;
    }
`

export const Text1 = styled.div`
    text-align: center;
    font-family: Inter;
    font-size: 1rem;
    color: #989c9e;
    margin-bottom: 20px;
`

export const Button = styled.button`
    width: 250px;
    height: 50px;
    background: #3bb3bd;
    border: none;
    border-radius: 10px;
    color: white;
    font-family: Inter;
    font-size: 1.1rem;
    cursor: pointer;
`
