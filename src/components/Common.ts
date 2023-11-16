import styled from 'styled-components'
export const Flex = styled.div<Props>`
    display: flex;
    justify-content: ${(props) => props.justify || 'stretch'};
    align-items: ${(props) => props.align || 'stretch'};
    height: ${(props) => props.h || 'auto'};
    flex-direction: ${(props) => props.direction || 'row'};
    margin: ${(props) => props.margin || '0px'};
    gap: ${(props) => props.gap || '0'};
    margin: ${(props) => props.m || '0'};
    flex-wrap: ${(props) => props.wrap || 'no-wrap'};
`
interface Props {
    fz?: string
    fw?: string
    align?: string
    lh?: string
    justify?: string
    direction?: string
    margin?: string
    gap?: string
    wrap?: string
    w?: number
    m?: string
    h?: string | number
    inline?: boolean
    ff?: string
    padding?: string
    bg?: string
    opacity?:number;
    borderBox?: boolean
}
export const Text = styled.div<Props>`
    font-size: ${(props) => props.fz || '1rem'};
    font-weight: ${(props) => props.fw || '400'};
    text-align: ${(props) => props.align || 'left'};
    opacity:${(props) => props.opacity || '1'};
    font-family: ${(props) => props.ff};
    line-height: ${(props) => props.lh || props.fz}rem;
    color: ${(props) => props.color || 'black'};
    display: ${(props) => (props.inline ? 'inline' : 'block')};
    margin: ${(props) => props.margin || '0px'};
`
export const Box = styled.div<Props>`
    width: ${(props) => props.w || 'auto'}%;
    margin: ${(props) => props.margin || '0px'};
    padding: ${(props) => props.padding || '0px'};
    background: ${(props) => props.bg || 'transparent'};
    box-sizing: ${(props) => (props.borderBox ? 'border-box' : 'content-box')};
`

export const ContentContainer = styled.div`
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0px 140px;
    @media (max-width: 1028px) {
        padding: 0px 80px;
    }
    @media (max-width: 550px) {
        padding: 0px 20px;
    }
`
//bg #0a092d
export const PageWrapper = styled.div<Props>`
    background:#f6f7fb;
    min-width:100%;
    min-height:${(props) => props.h}px;

    padding 50px 0px;
`
export const Container = styled.div<Props>`
    width: ${(props) => props.w || '100'}%;
    margin: ${(props) => props.m || '0'};
    @media (max-width: 1028px) {
        width: 100%;
    }
`
