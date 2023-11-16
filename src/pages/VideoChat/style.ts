import styled from 'styled-components'

export const DefaultScreenContent = styled.div<any>`
    width: ${(props) => (props.view === 1 ? '100' : '50')}%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    flex-wrap: wrap;
`
export const PDFSide = styled.div`
    width: 50%;
    height: 100%;
    background: black;
    color: white;
`

export const LocalVideo = styled.div<any>`
    width: 600px;
    height: 400px;
    overflow:hidden;
    video {
        min-width: 100%;
        min-height: 100%;
    }
`
export const RemoteVideo = styled.div<any>`
width: 600px;
height: 400px;
overflow:hidden;
    video {
        width: 100%;
        height: 100%;
    }
`

export const ChangeViewWrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

export const ChangeViewModal = styled.div`
    width: 400px;
    height: 600px;
    background: black;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    div {
        width: 100px;
        height: 100px;
        color: black;
        background: white;
    }
`
