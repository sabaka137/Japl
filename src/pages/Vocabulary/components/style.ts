import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Item = styled.div`
border-top:1px solid #2e3856;
width:100%;
min-height:220px;
color:white;
padding 15px 30px;
display:flex;
text-decoration:none;
font-size:1.5rem;
font-height:1.5rem;
justify-content:space-between;
margin-top:20px;
box-sizing:border-box;
&:hover{
    cursor:pointer;
    box-shadow: 0px 0px 9px 10px rgba(255,255,255,0.05);

}
`;

export const ItemInfo = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const ItemTranslation = styled.div`
  flex: 2;
`;
export const Kanji = styled.div`
  font-size: 3.5rem;
`;

export const KanjiInf = styled.div`
  font-size: 1.1rem;
  margin-left: 20px;
  span {
    opacity: 0.6;
  }
`;
export const KanjiMeaning = styled.div`
  font-size: 1.6rem;
  margin-bottom: 30px;
  font-family:Nanum Gothic;
  color:#282E3E;
`;
export const ReadingType = styled.div`
  width: 50px;
  font-size: 1.5rem;
  opacity: 0.7;
  margin-right: 60px;
  font-weight: 200;
  line-height: 1.5rem;
  color:#282E3E;
`;
export const Reading = styled.div`
  margin-bottom: 20px;
  display: flex;
    color:#282E3E;
`;
export const Test = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ReadingContainer = styled.div`
  margin-right: 20px;
 
`;
export const ReadingJap = styled.div`
  font-size: 1rem;
  color:#5498c7;
  margin-right: ;
`;
export const ReadingRom = styled.div`
  font-size: 0.9rem;
  color: #5498c7;
`;
