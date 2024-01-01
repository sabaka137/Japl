import styled from 'styled-components'

export const WritingContainer = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

export const ItemContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 250px;
`

export const WritingItem = styled.div`
    width: 100%;
    height: 250px;
    border: 1px solid #282e3e;
    img {
        width: 100%;
        height: 100%;
    }
`

export const KanjiTop = styled.div`
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding: 30px 0px;
    margin-bottom: 10px;
    @media (max-width: 770px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
`
export const KanjiSVG = styled.div`
    width: 200px;
    height: 200px;
    border: 1px solid #282e3e;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 7rem;
    line-height: 7rem;
    margin-right: 200px;
    color: #282e3e;
    @media (max-width: 770px) {
        margin-right: 0px;
    }
`

export const KanjiInf = styled.div`
    font-size: 1.1rem;
    margin-left: 20px;
    span {
        opacity: 0.6;
    }
`
export const KanjiMeaning = styled.div`
    font-size: 1.6rem;
    margin-bottom: 30px;
    font-family: Nanum Gothic;
    color: #282e3e;
`
export const Reading = styled.div`
    margin-bottom: 20px;
    display: flex;
    color: #282e3e;
`
export const ReadingJap = styled.div`
    font-size: 1rem;
    color: #5498c7;
    margin-right:;
`
export const ReadingRom = styled.div`
    font-size: 0.9rem;
    color: #5498c7;
`
export const ReadingContainer = styled.div`
    margin-right: 20px;
`
export const ReadingType = styled.div`
    width: 50px;
    font-size: 1.5rem;
    opacity: 0.7;
    margin-right: 60px;
    font-weight: 200;
    line-height: 1.5rem;
    color: #282e3e;
`
