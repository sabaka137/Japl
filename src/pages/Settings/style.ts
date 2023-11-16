import styled from 'styled-components'

export const ContentForm = styled.form`
    box-sizing: border-box;
    padding: 20px 40px;
`
export const Title = styled.div`
    box-sizing: border-box;
    padding: 20px 40px;
    color: #090f19;
    font-weight: 500;
    font-family: Inter;
    font-size: 22px;
    border-bottom: 2px solid #f2f2f2;
`
export const SettingsInput = styled.input`
    width: 100%;
    margin-top: 5px;
    padding: 10px 12px;
    box-sizing: border-box;
    border-radius: 3px;
    outline: none;
    border: 1px solid #d5dde2;
    &:focus {
        box-shadow: rgb(206, 237, 240) 0px 0px 8px;
        border-color: rgb(59, 179, 189);
    }
`

export const SaveChangesButton = styled.button`
    height: 40px;
    width: 130px;
    display:flex;
    justify-content: center;
    align-items: center;
    outline: none;
    background: #3bb3bd;
    border-color: #3bb3bd;
    border: none;
    font-family: Inter;

    font-weight: bold;
    color: white;
    border-radius: 2px;
    &:hover {
        cursor: pointer;
        background: #63c3cb;
    }
`
export const LeftSide = styled.div`
    flex:1;
    color#384047;
    font-size:0.9rem;
    font-weight:500;
`

export const RightSide = styled.div`
    flex: 2;
`

export const LoadButton = styled.button`
    outline: none;
    color: #3bb3bd;
    border: 1px solid #74cfee;
    background: transparent;
    padding: 10px 30px;
    font-size: 14px;
    font-weight: 500;
`
export const ImageInfo = styled.div`
    color: #6f757b;
    width: 150px;
    font-size: 0.9re;
`
export const UserPhoto = styled.div`
    width: 150px;
    height: 150px;
    background: '#689f39';
    border-radius: 5px;
    img {
        width: 150px;
        height: 150px;
    }
`
