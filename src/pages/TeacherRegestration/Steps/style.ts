import styled from 'styled-components'

export const LanguageLevelContiner = styled.div`
    display: flex;
    width: 65%;
    gap: 15px;
    margin: 20px 0px 5px 0px;
    fon-family: Inter;
    font-size: 0.9rem;
    font-weight: 500;
`

export const LanguageLevelIcon = styled.div`
    margin-left: 10px;
    top: 12px;
    position: absolute;
    cursor: pointer;
    left: 100%;
`

export const LoadButton = styled.button`
    outline: none;
    margin-bottom: 10px;
    cursor: pointer;
    color: #3bb3bd;
    border: 1px solid #74cfee;
    background: transparent;
    padding: 10px 30px;
    font-size: 14px;
    font-weight: 500;
`

export const DragImageContainer = styled.div<{
    fileExist: boolean
    isDragOver: boolean
}>`
    width: 98%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => (props.fileExist ? 'auto' : '300px')};

    background: ${(props) =>
        props.fileExist
            ? 'none'
            : props.isDragOver
              ? 'rgba(255, 199, 234,.2)'
              : 'none'};
    border-radius: 10px;
    border: ${(props) => (props.fileExist ? 'none' : '2px #ff8aff dashed')};
`
export const UploadIcon = styled.div`
    width: 120px;
    height: auto;
    img {
        width: 100%;
        height: 100%;
    }
`

export const SkipInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    gap: 5px;
    cursor: pointer;
`

export const ScheduleTip = styled.div`
    background: #e1fae3;
    padding: 15px 20px;
    margin-bottom: 20px;
`
export const ScheduleTipTop = styled.div`
    display: flex;
    align-items: center;
    color: #24bb36;
    font-size: 0.9rem;
    font-family: Inter;
    font-weight: 600;
    margin-bottom: 10px;
`

export const PriceTip = styled.div`
    color: #6f757b;
    font-family: Inter;
    font-size: 14px;
    margin-bottom: 20px;
    width: 70%;
`
