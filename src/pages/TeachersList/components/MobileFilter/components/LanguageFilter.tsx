import React, { useState } from 'react'
import styled from 'styled-components'
import { IFilter } from '../../../../../types/Teachers/TeachersType'
import { BsCheckLg } from 'react-icons/bs'

const Wrpper = styled.div`
    margin-top: 20px;
    max-height: 400px;

`
const Item = styled.div<{ isChecked: boolean }>`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    input {
        display: none;
    }
    span {
        color: #384047;
        cursor: pointer;
        padding-left: 30px;
        position: relative;
        &:hover {
            &:before {
                content: '';
                position: absolute;
                left: 0px;
                top: 1px;
                width: 18px;
                height: 18px;
                border-radius: 2px;
                border: 1px solid #6cb1b4;
                background-color: rgb(255, 255, 255);
                transition: all 50ms ease;
            }
        }
        &:before {
            content: '';
            position: absolute;
            left: 0px;
            top: 1px;
            width: 18px;
            height: 18px;
            border-radius: 2px;
            border: 1px solid rgb(218, 223, 225);
            background-color: rgb(255, 255, 255);
            transition: border-color 0s ease 0s, background-color 0s ease 0s,
                all 50ms ease 0s;
        }
    }
`
const ContentWrapper = styled.div`
    height: 360px;
    overflow-y: auto;
`
const InputWrapper = styled.div`
    box-sizing: border-box;
`
const Input = styled.input`
    border: 1px solid #dadfe1;
    border-radius: 2px;
    box-shadow: none;
    color: #384047;
    display: block;
    font-size: 14px;
    font-weight: 400;
    height: 38px;
    line-height: 1;
    margin-bottom: 8px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 15px;
    padding: 0 12px;
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
const CheckMark = styled.div<{ isChecked: boolean }>`
    position: absolute;
    left: 2px;
    top: 2px;
    display: ${(props) => (props.isChecked ? 'block' : 'none')};
`
type Props = {
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
    languages: {
        id: number
        language: { label: string; code: string }
        checked: boolean
    }[]
}
function LanguageFilter({ setFilters, languages }: Props) {
    const [value, setValue] = useState('')
    function changeHandler(id: number) {
        setFilters((prev) => ({
            ...prev,
            languages: prev.languages.map((c) =>
                c.id === id ? { ...c, checked: !c.checked } : { ...c }
            ),
        }))
    }
    return (
        <Wrpper onClick={(e) => e.stopPropagation()}>
            <InputWrapper>
                <Input
                    placeholder="Enter country for search"
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
                            <div>
                                <input type="checkbox" />
                            </div>
                            <span>
                                {c.language.label}
                                <CheckMark isChecked={c.checked}>
                                    <BsCheckLg />
                                </CheckMark>
                            </span>
                        </Item>
                    ))}
            </ContentWrapper>
        </Wrpper>
    )
}

export default LanguageFilter
