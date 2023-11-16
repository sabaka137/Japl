import React, { useEffect, useState } from 'react'
import {
    HeaderInput,
    HistoryContainer,
    InputContainer,
    InputIcon,
    Kanji,
    ResultItem,
    ResultLoader,
    SearchResultsWrapper,
    SearchWrapper,
} from './style'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hook'
import { BasicSearch, setLoad } from '../../../../redux/reducers/SearchSlice'
import { useLocation } from 'react-router-dom'
import { Flex, Text } from '../../../../components/Common'
import { ButtonLoader } from '../../../../components/Loader/ButtonLoader'
import SearchLoader from '../../../../components/Loader/SearchLoader'
import { BiSearchAlt2 } from 'react-icons/bi'

//fix add search history
function HeaderSearch() {
    const [value, setValue] = useState('')
    const [enterPressed, setPressed] = useState(false)
    const [searchHistory, setHistory] = useState('')
    const dispatch = useAppDispatch()
    const { searchResults, isLoad } = useAppSelector((state) => state.search)
    useEffect(() => {
        if (!value) {
            dispatch(setLoad())
            setPressed(false)
        }
    }, [value])
    useEffect(() => {
        document.body.addEventListener('click', () => {
         setPressed(false)
        })
    }, [])
    const handlePress = () => {
        dispatch(BasicSearch(value))
        setPressed(true)
        if (localStorage.getItem('searchHistory') === null) {
            localStorage.setItem('searchHistory', JSON.stringify([value]))
        } else {
            let tepmHistory = JSON.parse(localStorage.getItem('searchHistory')!)
            tepmHistory.push(value)
            setHistory(tepmHistory)
            localStorage.setItem('searchHistory', JSON.stringify(tepmHistory))
        }
    }
    const path = useLocation()
    return (
        <SearchWrapper>
            <InputContainer onClick={(e)=>e.stopPropagation()}>
                <HeaderInput
                    pathname={path.pathname}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key == 'Enter' && handlePress()}
                    value={value}
                    placeholder="search for kanji"
                />
                {value && <InputIcon onClick={()=>handlePress()} ><BiSearchAlt2/></InputIcon>}
            </InputContainer>

            {value && enterPressed && (
                <SearchResultsWrapper>
                    {isLoad ? (
                        searchResults?.length == 0 ? (
                            <ResultLoader>Sorry, nothing found.</ResultLoader>
                        ) : (
                            <>
                                {searchResults?.map((el) => (
                                    <ResultItem
                                        to={`/vocabulary/${el.kanji.character}`}
                                        onClick={() => (
                                            setValue(''), setPressed(false)
                                        )}
                                    >
                                        <Kanji> {el.kanji.character}</Kanji>{' '}
                                        <span> {el.kanji.meaning.english}</span>
                                    </ResultItem>
                                ))}
                            </>
                        )
                    ) : (
                        <ResultLoader>
                            <SearchLoader />
                        </ResultLoader>
                    )}
                </SearchResultsWrapper>
            )}
        </SearchWrapper>
    )
}

export default HeaderSearch
