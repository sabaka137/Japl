import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IFilter } from '../../../../../types/Teachers/TeachersType'
const RangeSlider = styled.div`
    height: 5px;
    border-radius: 5px;
    background: #e3e5e6;
    position: relative;
`
const RangeValues = styled.div`
    margin-bottom: 15px;
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
        margin-top: -13px;
        cursor: pointer;
        position: relative;
        z-index: 1;
    }
`
type Props = {
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
    price:{min:number,max:number}
}

function PriceRange({setFilters,price}: Props) {
    const [minValue, setMinValue] = useState<any>(price.min)
    const [maxValue, setMaxValue] = useState<any>(price.max)
    const minRef = useRef<HTMLInputElement | null>(null)
    const maxRef = useRef<HTMLInputElement | null>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (progressBarRef.current !== null) {
 
            progressBarRef.current.style.left = (minValue / 35) * 100 + '%'
            progressBarRef.current.style.right =
                100 - (maxValue / 35) * 100 + '%'
        }
    }, [minValue, maxValue])
    function mouseUp() {
        setFilters((prev) => ({
            ...prev,
            price: { min: minValue, max: maxValue },
        }))
    }
    return (
        <div>
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
                        max={35}
                        step={1}
                        onChange={(e) => setMinValue(e.target.value)}
                        type="range"
                    />
                    <RangeInput
                     onMouseUp={() => mouseUp()}
                        ref={maxRef}
                        value={maxValue}
                        min={1}
                        max={35}
                        step={1}
                        onChange={(e) => setMaxValue(e.target.value)}
                        type="range"
                    />
                </RangeInputContainer>
            </RangeSlider>
        </div>
    )
}

export default PriceRange
