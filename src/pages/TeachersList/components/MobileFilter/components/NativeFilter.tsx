import React from 'react'
import styled from 'styled-components'
import { Text } from '../../../../../components/Common'
import { IFilter } from '../../../../../types/Teachers/TeachersType'
import { BsCheckLg } from 'react-icons/bs'
const Item = styled.div`
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
const CheckMark = styled.div<{ isChecked: boolean }>`
    position: absolute;
    left: 2px;
    top: 2px;
    display: ${(props) => (props.isChecked ? 'block' : 'none')};
`
type Props = {
    isNative: boolean
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
}

function NativeFilter({ setFilters, isNative }: Props) {
    function onChange() {
        setFilters((prev) => ({
            ...prev,
            isNative: !prev.isNative,
        }))
    }
    return (
        <>
            <Item onClick={() => onChange()}>
                <div>
                    <input checked={isNative} type="checkbox" />
                </div>
                <span>
                    Native speakers only: Japanese
                    <CheckMark isChecked={isNative}>
                        <BsCheckLg />
                    </CheckMark>
                </span>
            </Item>
            <Text color="#6F757B" fz="14px">
                We will only show tutors who teach their native language.
            </Text>
        </>
    )
}

export default NativeFilter
