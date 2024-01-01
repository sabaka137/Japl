import { useEffect, useState } from 'react'

import { ResultNavigationItem } from '../../../types/Collections/CollectionType'

import {
    Close,
    Item,
    ResultNavigation,
    ResultNavigationMobal,
    ResultNavigationOpenModal,
    ResultNavigationWrapper,
    Text,
} from '../style'
import { BsCheckLg } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { MdOutlineMenuOpen } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
    ResultNav: ResultNavigationItem[]
    quizMode: string
}
export const QuizNavigation = ({ ResultNav, quizMode }: Props) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [navModalOpen, setNavModalOpen] = useState<boolean>(false)
    useEffect(() => {
        function listener() {
            setInnerWidth(window.innerWidth)
        }
        window.addEventListener('resize', listener)
        return () => window.removeEventListener('resize', listener)
    }, [])
    function handleClick(el: ResultNavigationItem) {
        window.scrollTo({
            top: el.position,
            behavior: 'smooth',
        })
        setNavModalOpen(false)
    }
    return (
        <>
            {innerWidth >= 1000 ? (
                <ResultNavigation>
                    {ResultNav.map((el: ResultNavigationItem) => (
                        <Item
                            key={el.order}
                            isCorrect={el.isCorrect}
                            onClick={() =>
                                window.scrollTo({
                                    top: el.position,
                                    behavior: 'smooth',
                                })
                            }
                        >
                            {el.isCorrect ? <BsCheckLg /> : <IoClose />}
                            {el.order}
                        </Item>
                    ))}
                </ResultNavigation>
            ) : (
                quizMode === 'results' && (
                    <ResultNavigationOpenModal
                        onClick={() => setNavModalOpen(!navModalOpen)}
                    >
                        <MdOutlineMenuOpen />
                    </ResultNavigationOpenModal>
                )
            )}
            {navModalOpen && (
                <ResultNavigationWrapper>
                    <ResultNavigationMobal>
                        <Close onClick={() => setNavModalOpen(false)}>
                            <AiOutlineClose />
                        </Close>
                        <Text>Cписок вопросов</Text>
                        {ResultNav.map((el: ResultNavigationItem, index) => (
                            <Item
                                key={index}
                                isCorrect={el.isCorrect}
                                onClick={() => handleClick(el)}
                            >
                                {el.isCorrect ? <BsCheckLg /> : <IoClose />}{' '}
                                {el.order}
                            </Item>
                        ))}
                    </ResultNavigationMobal>
                </ResultNavigationWrapper>
            )}
        </>
    )
}
