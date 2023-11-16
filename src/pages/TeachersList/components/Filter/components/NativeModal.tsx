import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Text } from '../../../../../components/Common'
import { IFilter } from '../../../../../types/Teachers/TeachersType'
const Wrapper = styled.div`
    width: 300px;
    background: white;
    position: absolute;
    top: 100%;
    margin-top: 10px;
    border-radius: 15px;
    z-index: 3;
    left: 0;
    box-sizing: border-box;
    padding: 20px;
`
const ToggleWrapper = styled.label`
    position: relative;
    display: inline-block;
    width: 53px;
    height: 28px;
`
const ToggleInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`
const Toggle = styled.div<{ isChecked: boolean }>`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => (props.isChecked ? '#2196F3' : '#ccc')};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
    &:before {
        position: absolute;
        content: '';
        height: 20px;
        width: 20px;
        left: 4px;
        bottom: 4px;
        border-radius: 50%;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        -webkit-transform: ${(props) =>
            props.isChecked ? 'translateX(22px)' : 'translateX(0px)'};
        -ms-transform: ${(props) =>
            props.isChecked ? 'translateX(22px)' : 'translateX(0px)'};
        transform: ${(props) =>
            props.isChecked ? 'translateX(22px)' : 'translateX(0px)'};
    }
`

type Props = {
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
    isNative: boolean
}

function NativeModal({ setFilters, isNative }: Props) {
    function handleChange() {
        setFilters((prev) => ({ ...prev, isNative: !isNative }))
    }
    return (
        <Wrapper>
            <Flex justify="space-between">
                <Text fz="18px" fw="500">
                    Native speakers only
                </Text>
                <ToggleWrapper onClick={() => handleChange()}>
                    <ToggleInput type="checkbox" />
                    <Toggle isChecked={isNative}></Toggle>
                </ToggleWrapper>
            </Flex>
            <Text fz="15px" margin="10px 0px 0px">
                We will only show tutors who teach their native language.
            </Text>
        </Wrapper>
    )
}

export default NativeModal
