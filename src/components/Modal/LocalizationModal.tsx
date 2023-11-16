import React from 'react'
import styled from 'styled-components'
import { Text } from '../Common'
import { IoIosArrowDown } from 'react-icons/io'
const Wrapper = styled.div`
    position: absolute;
    width: 180px;
    background: white;
    top: 30px;
    left: -20px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
    transition: all 0.25s;
    padding: 12px 12px 15px;
    color: black;
    border-radius: 0 0 2px 2px;
    z-index: 4;
`
const Select = styled.select`
    position: relative;
    display: block;
    width: 100%;
    max-width: 100%;
    height: 38px;
    padding: 0 30px 0 12px;
    box-sizing: border-box;
    border: 1px solid #dadfe1;
    border-radius: 4px;
    color: #384047;
    background-color: #fff;
    box-shadow: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    transition: color 50ms, border 50ms, box-shadow 0.2s;
    backface-visibility: hidden;
    cursor: pointer;
    user-select: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    option {
        font-weight: normal;
        display: block;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        min-height: 1.2em;
        padding: 0px 2px 1px;
        box-sizing: border-box;
    }
`
const SelectItem = styled.div`
position:relative;
`
const SelectArrow = styled.div`
position:absolute;
right:10px;
top:10px;
`
type Props = {}

function LocalizationModal({}: Props) {
    return (
        <Wrapper onClick={(e) => e.stopPropagation()}>
              <Text
                    margin="0px 0px 10px 0px"
                    color="#6F757B"
                    fw="500"
                    fz="13px"
                >
                    Язык
                </Text>
            <SelectItem>
                <Select>
                    <option>Русский</option>
                    <option>English</option>
                    <option>Polski</option>
                    <option>Deutsch</option>
                   
                </Select>
                <SelectArrow><IoIosArrowDown/></SelectArrow>
            </SelectItem>
            
            <Text margin="15px 0px 10px 0px" color="#6F757B" fw="500" fz="13px">
                Валюта
            </Text>
            <SelectItem>
                <Select>
                <option>RUB</option>
                    <option>EUR</option>
                    <option>UAH</option>
                    <option>USD</option>
                   
                </Select>
                <SelectArrow><IoIosArrowDown/></SelectArrow>
            </SelectItem>
        </Wrapper>
    )
}

export default LocalizationModal
