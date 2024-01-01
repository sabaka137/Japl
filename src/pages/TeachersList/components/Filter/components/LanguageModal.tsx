import React, { useState, useEffect } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import styled from 'styled-components'
import { IFilter } from '../../../../../types/Teachers/TeachersType'

const Wrapper = styled.div`
    width: 100%;
    background: white;
    max-height: 400px;
    min-width: 304px;
    overflow: hidden;
    position: absolute;
    top: 100%;
    margin-top: 10px;
    border-radius: 15px;
    z-index: 3;
    left: 0;
    box-shadow: 0 0 0 2px #dcdce5;
`
const Item = styled.div<{ isChecked: boolean }>`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    box-sizing: border-box;
    padding: 12px 15px;
    border-bottom: 1px solid #dcdce5;
    input {
        display: none;
    }
    &:hover {
        background: #f4f4f8;
    }
    span {
        color: #121117;
        cursor: pointer;
        font-family: Noto Sans;
        font-weight: 400;
        font-size: 16px;
        padding-left: 35px;
        position: relative;
        &:hover {
            &:before {
                content: '';
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                left: 0px;
                top: 1px;
                width: 18px;
                height: 18px;
                border-radius: 3px;
                border: 2px solid #6cb1b4;
                background-color: rgb(255, 255, 255);
                transition: all 50ms ease;
            }
        }
        &:before {
            content: '';
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            left: 0px;
            top: 1px;
            width: 18px;
            height: 18px;
            border-radius: 3px;
            border: 2px solid rgb(218, 223, 225);
            background-color: rgb(255, 255, 255);
            transition:
                border-color 0s ease 0s,
                background-color 0s ease 0s,
                all 50ms ease 0s;
        }
    }
`
const ContentWrapper = styled.div`
    height: 324px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`
const CheckMark = styled.div<{ isChecked: boolean }>`
    position: absolute;
    left: 2px;
    top: 2px;
    display: ${(props) => (props.isChecked ? 'block' : 'none')};
`
const InputWrapper = styled.div`
    box-sizing: border-box;
    padding: 15px 15px 10px 15px;
`
const Input = styled.input`
    border: 2px solid #dcdce5;
    border-radius: 5px;
    box-shadow: none;
    color: #384047;
    display: block;
    font-size: 14px;
    font-weight: 400;
    height: 38px;
    font-family: Inter;
    line-height: 1;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0px 12px;
    &:before {
        content: '1111';
        color: black;
        display: block;
    }
    &:focus {
        outline: none;
    }
    &:hover {
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08);
    }
`

type Props = {
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
    languages: {
        id: number
        language: { label: string; code: string }
        checked: boolean
    }[]
}

function LanguageModal({ setFilters, languages }: Props) {
    const [value, setValue] = useState('')

    function changeHandler(id: number) {
        setFilters((prev) => ({
            ...prev,
            languages: prev.languages.map((l) =>
                l.id === id ? { ...l, checked: !l.checked } : { ...l }
            ),
        }))
    }

    return (
        <Wrapper>
            <InputWrapper>
                <Input
                    placeholder="Enter language for search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </InputWrapper>
            <ContentWrapper>
                {languages
                    .filter((el) => {
                        return value.toLowerCase() === ''
                            ? el
                            : el.language.label
                                  .toLowerCase()
                                  .includes(value.toLowerCase())
                    })
                    .map((c) => (
                        <Item
                            key={c.id}
                            onClick={() => changeHandler(c.id)}
                            isChecked={c.checked}
                        >
                            <span>
                                <div> {c.language.label}</div>
                                <CheckMark isChecked={c.checked}>
                                    <BsCheckLg />
                                </CheckMark>
                            </span>
                            <div>
                                <input type="checkbox" />
                            </div>
                        </Item>
                    ))}
            </ContentWrapper>
        </Wrapper>
    )
}

export default LanguageModal
