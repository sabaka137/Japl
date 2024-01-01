import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IFilter } from '../../../../../types/Teachers/TeachersType'
const Wrapper = styled.div`
    width: 100%;
    background: white;
    position: absolute;
    top: 100%;
    margin-top: 10px;
    border-radius: 7px;
    z-index: 3;
    left: 0;
    height: 100px;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0 0 0 2px #dcdce5;
`
const RangeSlider = styled.div`
    height: 5px;
    border-radius: 5px;
    background: #e3e5e6;
    position: relative;
`
const RangeValues = styled.div`
    width: 100%;
    display: flex;
    font-family: Inter;
    font-weight: 500;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 1.3rem;
`

const ProgressBar = styled.div`
    height: 5px;
    left: 2%;
    right: 20%;
    position: absolute;
    border-radius: 5px;
    background: #3bb3bd;
`
const RangeInputContainer = styled.div`
    position: relative;
`

const RangeInput = styled.input`
    position: absolute;
    top: 5px;
    left: -2px;
    height: 5px;
    width: 100%;
    background: none;
    pointer-events: none;
    -webkit-appearance: none;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        pointer-events: auto;
        border: none;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: white;
        border: 4px solid #3bb3bd;
        margin-top: -10px;
        cursor: pointer;
        position: relative;
        z-index: 1;
    }
`

type Props = {
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
    price: { min: number; max: number }
}

function PriceRangeModal({ setFilters, price }: Props) {
    const [minValue, setMinValue] = useState<any>(price.min)
    const [maxValue, setMaxValue] = useState<any>(price.max)
    const minRef = useRef<HTMLInputElement | null>(null)
    const maxRef = useRef<HTMLInputElement | null>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (progressBarRef.current !== null) {
            progressBarRef.current.style.left = (minValue / 50) * 100 + '%'
            progressBarRef.current.style.right =
                100 - (maxValue / 50) * 100 + '%'
        }
    }, [minValue, maxValue])

    function mouseUp() {
        setFilters((prev) => ({
            ...prev,
            price: { min: minValue, max: maxValue },
        }))
    }
    return (
        <Wrapper>
            <RangeValues>
                {minValue} $ - {maxValue} $
            </RangeValues>

            <RangeSlider>
                <ProgressBar ref={progressBarRef} />
                <RangeInputContainer>
                    <RangeInput
                        onMouseUp={() => mouseUp()}
                        ref={minRef}
                        value={minValue}
                        min={1}
                        max={50}
                        step={1}
                        onChange={(e) => setMinValue(e.target.value)}
                        type="range"
                    />
                    <RangeInput
                        onMouseUp={() => mouseUp()}
                        ref={maxRef}
                        value={maxValue}
                        min={1}
                        max={50}
                        step={1}
                        onChange={(e) => setMaxValue(e.target.value)}
                        type="range"
                    />
                </RangeInputContainer>
            </RangeSlider>
        </Wrapper>
    )
}

export default PriceRangeModal
