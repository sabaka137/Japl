import React from 'react'
import { Flex, Text } from '../../../components/Common'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import styled from 'styled-components'

import Minna from '../../../assets/images/Minna.jpg'
import Kodansha from '../../../assets/images/Kodansha.jpg'
import Tobira from '../../../assets/images/Tobira.jpg'
import { NavLink } from 'react-router-dom'
const RecomendationContainer = styled.div`
    width: 100%;
    margin-top: 70px;
`
const BookContainer = styled.div`
    display: flex;
    gap: 20px;
   
    @media (max-width: 600px) {
        flex-direction: column;
    }
`

const BookItem = styled(NavLink)<{ last?: boolean }>`
    width: 33.333%;
    height: 160px;
    border-radius: 15px;
    box-shadow: 0 0.225rem 0.25rem #00000014;
    text-decoration:none;
    background: white;
    display: flex;
    box-sizing: border-box;
    padding: 16px;
    gap: 15px;
    height: 100%;
    &:hover{
    cursor:pointer;

    border-bottom:4px solid #a8afff;
    };
    @media (max-width: 800px) {
        display: ${(props) => (props.last ? 'none' : 'flex')};
        width: 50%;
    }

    @media (max-width: 600px) {
        width: 100%;
        display: flex;
    }
`
const BookText = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`
const BookHelp = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
    background-color: #edefff;
    border-radius: 1.5rem;
    color: #2e3856;
    cursor: default;
    gap: 0.25rem;
    min-height: 1.25rem;
    padding: 0 0.5rem;
    font-size: 13px;
    font-weight: 500;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
`
const BookImg = styled.div`
    border-radius: 10px;
    overflow: hidden;
    min-width: 100px;
    height: 125px;
    img {
        width: 100px;
        height: 125px;
    }
`

const BookName = styled.div`
    font-size: 16px;
    color: #282e3e;
    font-weight: 500;
    margin-bottom: 15px;
    &:hover{
        color:#423ed8;
    }
`

const BookDesc = styled.div`
    font-size: 12px;
    color: #586380;
    font-weight: bold;
`
type Props = {}

function BookRecomendation({}: Props) {
    return (
        <RecomendationContainer>
            <Text
                color="#282E3E"
                margin={'0px 0px 20px 0px'}
                fz={'22px'}
                fw={'500'}
            >
              Recommended books from experts
            </Text>
            <BookContainer>
                <BookItem target='_blank' to={'https://www.google.com.ua/books/edition/みんなの日本語/G-bl2P5lRl4C?hl=ru&gbpv=1&dq=minna+no+nihongo&pg=PP7&printsec=frontcover'}>
                    <BookImg>
                        <img
                            src={Minna}
                        />
                    </BookImg>
                    <BookText>
                        <BookName>Minna no nihongo</BookName>
                        <BookDesc>
                            2nd Edition•ISBN: 9780076602186 Carter, Cuevas, Day,
                            Malloy
                        </BookDesc>
                        <BookHelp>
                            <BsFillPatchCheckFill />
                            1735 tips.
                        </BookHelp>
                    </BookText>
                </BookItem>
                <BookItem target='_blank' to={'https://www.google.com.ua/books/edition/Kodansha_s_Furigana_Japanese_Dictionary/3aJNEAAAQBAJ?hl=ru'}>
                    <BookImg>
                        <img
                            src={Kodansha}
                        />
                    </BookImg>
                    <BookText>
                        <BookName>Kodansha’s Furigana</BookName>
                        <BookDesc>
                            2nd Edition•ISBN: 9780076602186 Carter, Cuevas, Day,
                            Malloy
                        </BookDesc>
                        <BookHelp>
                            <BsFillPatchCheckFill />
                            922 tips.
                        </BookHelp>
                    </BookText>
                </BookItem>
                <BookItem last target='_blank' to={'https://www.google.com.ua/books/edition/とびら/eYCHzgEACAAJ?hl=ru&sa=X&ved=2ahUKEwjLvr7NiZiCAxX_FRAIHdgqDIwQiKUDegQIDRAE'}>
                    <BookImg>
                        <img
                            src={Tobira}
                        />
                    </BookImg>
                    <BookText>
                        <BookName>Tobira</BookName>
                        <BookDesc>
                            2nd Edition•ISBN: 9780076602186 Carter, Cuevas, Day,
                            Malloy
                        </BookDesc>
                        <BookHelp>
                            <BsFillPatchCheckFill />
                            1443 tips.
                        </BookHelp>
                    </BookText>
                </BookItem>
            </BookContainer>
        </RecomendationContainer>
    )
}

export default BookRecomendation
