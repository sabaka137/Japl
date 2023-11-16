import React, { useState, useEffect } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import styled from 'styled-components'
import { IFilter } from '../../../../../types/Teachers/TeachersType'

const Wrapper = styled.div`
    width: 100%;
    background: white;
    min-width: 304px;
    max-height: 400px;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    margin-top: 10px;
    border-radius: 15px;
    z-index: 3;
    left: 0;
`
const Item = styled.div<{ isChecked: boolean }>`
    display: flex;
    width: 100%;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    padding: 7px 15px;
    input {
        display: none;
    }
    &:hover {
        background: #fafafa;
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
                display: flex;
                justify-content: center;
                align-items: center;
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
            display: flex;
            justify-content: center;
            align-items: center;
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
    height: 304px;
    overflow-y: auto;
`
const CheckMark = styled.div<{ isChecked: boolean }>`
    position: absolute;
    left: 2px;
    top: 2px;
    display: ${(props) => (props.isChecked ? 'block' : 'none')};
`
const InputWrapper = styled.div`
    box-sizing: border-box;
    padding: 15px;
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
    width: 100%;
    box-sizing: border-box;
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

type Props = {
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
    countries: {
        id: number
        country: { label: string; code: string }
        checked: boolean
    }[]
}

function CountryModal({ setFilters, countries }: Props) {
    const [value, setValue] = useState('')

    function changeHandler(id: number) {
        setFilters((prev) => ({
            ...prev,
            countries: prev.countries.map((c) =>
                c.id === id ? { ...c, checked: !c.checked } : { ...c }
            ),
        }))
    }

    return (
        <Wrapper>
            <InputWrapper>
                <Input
                    placeholder="Enter country for search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </InputWrapper>
            <ContentWrapper>
                {countries
                    .filter((el) => {
                        return value.toLowerCase() === ''
                            ? el
                            : el.country.label
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
                                {c.country.label}
                                <CheckMark isChecked={c.checked}>
                                    <BsCheckLg />
                                </CheckMark>
                            </span>
                        </Item>
                    ))}
            </ContentWrapper>
        </Wrapper>
    )
}

export default CountryModal
