import { useEffect, useState } from 'react'

import { LoadSelectedKanji } from '../../redux/reducers/VocabularySlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { examples } from '../../types/Vocabulary/Kanji'

import {
    ContentContainer,
    Flex,
    PageWrapper,
    Text,
} from '../../components/Common'

import { useParams } from 'react-router-dom'
import { ExampleCard } from './components/ExampleCard'
import { InfoTypeContainer, InfoTypeItem } from './components/style'
import PageLoader from '../../components/Loader/PageLoader'
import {
    WritingContainer,
    WritingItem,
    ItemContainer,
    KanjiTop,
    KanjiSVG,
    KanjiMeaning,
    Reading,
    ReadingJap,
    ReadingRom,
    ReadingContainer,
    ReadingType,
} from './style'

export const SelectedKanji = () => {
    const [spinner, setSpinner] = useState<boolean>(true)
    const [infoType, setInfoType] = useState<'example' | 'drawingOrder'>(
        'example'
    )
    const path = useParams()
    const dispatch = useAppDispatch()
    const { currentKanji, selectedLoad } = useAppSelector(
        (state) => state.vocabulary
    )

    useEffect(() => {
        dispatch(LoadSelectedKanji(path.kanji!))
        setTimeout(() => setSpinner(false), 500)
    }, [path])

    return (
        <>
            <PageWrapper h={window.innerHeight}>
                <ContentContainer>
                    {!spinner && selectedLoad ? (
                        <>
                            <KanjiTop>
                                <KanjiSVG>
                                    {currentKanji != null &&
                                        currentKanji.kanji.character}
                                </KanjiSVG>
                                <div>
                                    <KanjiMeaning>
                                        {currentKanji?.kanji.meaning.english}
                                    </KanjiMeaning>
                                    <div>
                                        <Reading>
                                            <ReadingType>Kun</ReadingType>

                                            <ReadingContainer>
                                                <ReadingJap>
                                                    {currentKanji?.kunyomi}
                                                </ReadingJap>
                                                <ReadingRom>
                                                    {currentKanji?.kunyomi_ja}
                                                </ReadingRom>
                                            </ReadingContainer>
                                        </Reading>
                                        <Flex align="center">
                                            <ReadingType>On</ReadingType>
                                            <ReadingContainer>
                                                <ReadingJap>
                                                    {currentKanji?.onyomi}
                                                </ReadingJap>
                                                <ReadingRom>
                                                    {currentKanji?.onyomi_ja}
                                                </ReadingRom>
                                            </ReadingContainer>
                                        </Flex>
                                    </div>
                                </div>
                            </KanjiTop>
                            <div>
                                <InfoTypeContainer>
                                    <InfoTypeItem
                                        isActive={infoType === 'example'}
                                        onClick={() => setInfoType('example')}
                                    >
                                        Examples
                                    </InfoTypeItem>
                                    <InfoTypeItem
                                        isActive={infoType === 'drawingOrder'}
                                        onClick={() =>
                                            setInfoType('drawingOrder')
                                        }
                                    >
                                        Writing
                                    </InfoTypeItem>
                                </InfoTypeContainer>
                                {infoType == 'example' ? (
                                    currentKanji != null &&
                                    currentKanji.examples.map(
                                        (el: examples) => (
                                            <ExampleCard
                                                key={el.meaning.english}
                                                exampleItem={el}
                                            />
                                        )
                                    )
                                ) : (
                                    <WritingContainer>
                                        {currentKanji?.kanji.strokes.images.map(
                                            (el: string, index) => (
                                                <ItemContainer key={index}>
                                                    <Flex
                                                        direction="column"
                                                        align="center"
                                                        gap="5px"
                                                    >
                                                        <WritingItem>
                                                            <img src={el} />
                                                        </WritingItem>
                                                        <Text
                                                            fz="18px"
                                                            ff="Inter"
                                                        >
                                                            {index + 1}
                                                        </Text>
                                                    </Flex>
                                                </ItemContainer>
                                            )
                                        )}
                                    </WritingContainer>
                                )}
                            </div>
                        </>
                    ) : (
                        <PageLoader />
                    )}
                </ContentContainer>
            </PageWrapper>
        </>
    )
}

export default SelectedKanji
