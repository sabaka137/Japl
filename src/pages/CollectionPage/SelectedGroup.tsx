import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'

import { CollectionSliceAsyncActions } from '../../redux/reducers/CollectionSlice'

import {
    CollectionName,
    TypeButton,
    TypesContainer,
} from '../UserCollections/style'
import {
    Container,
    ContentContainer,
    Flex,
    PageWrapper,
} from '../../components/Common'
import FlashcardGame from './FlashcardsGame'
import { CollectionRating, ShareButton } from './FlashcardsGame/style'
import { BsCollectionFill } from 'react-icons/bs'
import { HiDocumentText } from 'react-icons/hi'
import { IoShareOutline } from 'react-icons/io5'
import { AiOutlineLock, AiTwotoneStar } from 'react-icons/ai'

export const SelectedGroup = () => {
    const { pathname } = useLocation()
    const { currentCollection } = useAppSelector((state) => state.collections)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(
            CollectionSliceAsyncActions.GetCollection(
                pathname.split('/')[pathname.split('/').length - 1]
            )
        )
    }, [dispatch, pathname])

    return (
        <PageWrapper>
            <ContentContainer>
                <Container
                    w={60}
                    m={'0 auto'}
                    style={{ minHeight: window.innerHeight }}
                >
                    {currentCollection && (
                        <>
                            <div>
                                <Flex justify="space-between">
                                    <div>
                                        <CollectionName>
                                            {currentCollection?.name}
                                        </CollectionName>
                                    </div>
                                    <div>
                                        <ShareButton>
                                            <IoShareOutline /> Publish
                                        </ShareButton>
                                    </div>
                                </Flex>
                                <CollectionRating>
                                    <AiTwotoneStar /> Leave your first rating
                                </CollectionRating>
                                <div>
                                    <TypesContainer>
                                        <TypeButton active to={'#'}>
                                            <div>
                                                <BsCollectionFill /> Cards
                                            </div>
                                        </TypeButton>
                                        <TypeButton to={`${pathname}/quiz`}>
                                            <div>
                                                <HiDocumentText /> Quiz
                                            </div>
                                        </TypeButton>
                                        <TypeButton disabled to={'/'}>
                                            <div>
                                                <AiOutlineLock /> Games
                                            </div>
                                        </TypeButton>
                                    </TypesContainer>
                                </div>
                            </div>
                            <FlashcardGame collection={currentCollection} />
                        </>
                    )}
                </Container>
            </ContentContainer>
        </PageWrapper>
    )
}

export default SelectedGroup
