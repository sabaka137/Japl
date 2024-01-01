import styled from 'styled-components'
import LandingEffect from '../../assets/images/Landing/effect.png'

export const LandingContainer = styled.div`
    margin: 0 auto;
    max-width: 1380px;
    box-sizing: border-box;
    padding: 0px 40px;
    @media (max-width: 1028px) {
        padding: 0px 80px;
    }
    @media (max-width: 550px) {
        padding: 0px 20px;
    }
`
export const HeroImg = styled.div`
    width: 50%;
    height: 100%;
    overflow: hidden;
    margin-bottom: -105px;
    img {
        width: 100%;
        height: 100%;
    }
    @media (max-width: 600px) {
        width: 100%;
    }
`
export const HeroWrapper = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 60px 0px 0px;
    @media (max-width: 850px) {
        flex-direction: column;
    }
`
export const HeroContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 40%;
    &:before {
        background-image: url(${LandingEffect});
        background-repeat: no-repeat;
        background-size: contain;
        content: '';
        height: 68px;
        left: -40px;
        position: absolute;
        top: -40px;
        width: 82px;
    }
    @media (max-width: 850px) {
        align-items: center;
        width: 100%;
    }
`
export const HeroText = styled.div`
    color: #3c4447;
    font-size: 38px;
    font-weight: bold;
    @media (max-width: 960px) {
        font-size: 26px;
    }
    @media (max-width: 600px) {
        text-align: center;
    }
`
export const HeroTextSub = styled.div`
    color: #3c4447;
    font-size: 38px;
    @media (max-width: 960px) {
        font-size: 26px;
    }
    @media (max-width: 600px) {
        text-align: center;
    }
`
export const StastContainer = styled.div`
    width: 100%;

    border-radius: 15px;
    background: white;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 24px;
    gap: 20px;
`

export const StatsItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    justify-content: center;
    text-align: center;
`
