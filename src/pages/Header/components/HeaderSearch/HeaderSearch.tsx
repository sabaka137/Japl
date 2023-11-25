import React, { useEffect, useState } from 'react'
import {
    HeaderInput,
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

import SearchLoader from '../../../../components/Loader/SearchLoader'
import { BiSearchAlt2 } from 'react-icons/bi'

//fix add search history
type Props = {
    isAuth?: boolean
}
function HeaderSearch({ isAuth }: Props) {
    const [value, setValue] = useState('')
    const [enterPressed, setPressed] = useState(false)
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
        dispatch(BasicSearch(value.toLowerCase()))
        setPressed(true)
    }
    const path = useLocation()
    return (
        <SearchWrapper isAuth={isAuth}>
            <InputContainer onClick={(e) => e.stopPropagation()}>
                <HeaderInput
                    autoFocus={window.innerWidth <= 650 ? true : false}
                    pathname={path.pathname}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key == 'Enter' && handlePress()}
                    value={value}
                    placeholder="search for kanji"
                />
                {value && (
                    <InputIcon onClick={() => handlePress()}>
                        <BiSearchAlt2 />
                    </InputIcon>
                )}
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
