import { FC, useRef } from 'react'
import styled from 'styled-components'

export const ResultStats = styled.div`
    width: 50%;
    display: flex;
    color: #2e3856;
    justify-content: space-between;
    margin-bottom: 30px;
    @media (max-width: 1600px) {
        width: 100%;
        justify-content: flex-start;
        gap: 30px;
    }
    @media (max-width: 450px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
    @media (max-width: 350px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
`
export const Count = styled.div<{ correct: boolean }>`
    color: ${(props) => (props.correct ? '#18AE79' : '#D05700')};
    font-weight: bold;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    padding: 5px 0px;
    justify-content: space-between;
    div {
        min-width: 30px;
        border-radius: 20px;
        background: ${(props) => (props.correct ? '#e6fcf4' : '#fff6ef')};
        border: ${(props) =>
            props.correct ? '1px solid #59e8b5' : '1px solid #ff983a'};
        padding: 2px 15px;
        display: flex;
        justify-content: center;
    }
    @media (max-width: 1600px) {
        width: 250px;
        justify-content: space-between;
        gap: 30px;
    }
    @media (max-width: 350px) {
        font-size: 1rem;
    }
    @media (max-width: 270px) {
        font-size: 1rem;
        width: 200px;
    }
`
export const CountContainer = styled.div`
    width: 60%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 350px) {
        width: 100%;
    }
`
type Props = {
    correct: number
    total: number
}
export const StatsDiagram = ({ correct, total }: Props) => {
    const svgRef = useRef<SVGCircleElement | null>(null)

    return (
        <ResultStats>
            <div
                style={{
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                }}
            >
                <svg
                    style={{
                        width: '100px',
                        height: '100px',
                        position: 'relative',
                    }}
                >
                    <circle
                        ref={svgRef}
                        style={{
                            width: '100px',
                            height: '100px',
                            transform: 'translate(10px,10px)',
                            strokeDasharray: '252',
                            strokeDashoffset: '0',
                        }}
                        fill="none"
                        strokeWidth={10}
                        stroke="#ff983a"
                        cx={40}
                        cy={40}
                        r={40}
                    />
                    <circle
                        style={{
                            width: '100px',
                            height: '100px',
                            transform: 'translate(10px,10px)',
                            strokeDasharray: '252',
                            strokeDashoffset:
                                252 - (252 * ((correct * 100) / total)) / 100,
                        }}
                        fill="none"
                        strokeWidth={10}
                        stroke="#59e8b5"
                        cx={40}
                        cy={40}
                        r={40}
                    />
                </svg>
                <div
                    style={{
                        fontSize: '1.2rem',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {Math.floor((correct * 100) / total)}%
                </div>
            </div>
            <CountContainer>
                <Count correct={true}>
                    Correct <div>{correct}</div>
                </Count>
                <Count correct={false}>
                    Incorrect <div>{total - correct}</div>
                </Count>
            </CountContainer>
        </ResultStats>
    )
}
