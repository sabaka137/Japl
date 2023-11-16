import styled from "styled-components";

export const VocabularyWrapper = styled.div`
background:#0a092d;
width:100%;
height:100%;
color:white;
padding 50px 0px;

`;

export const VocabularyInput = styled.div`
	width: 100%;
	height: 40px;
	background: #2e3856;
	padding: 0px 20px;
	box-sizing: border-box;
	border-radius: 10px;
	margin-bottom: 20px;
	display: flex;
	align-items: center;

	input {
		width: 100%;
		height: 100%;
		border: none;
		background: transparent;
		font-size: 1.5rem;
		color: white;
		&:focus {
			outline: none;
		}
	}
`;

export const Item = styled.div`
background:#2e3856;
width:100%;
height:220px;
color:white;
padding 15px 30px;
border-radius:15px;
display:flex;
font-size:1.5rem;
font-height:1.5rem;
justify-content:space-between;
margin-top:20px;

`;

export const ItemInfo = styled.div`
	flex: 1;
`;

export const ItemTranslation = styled.div`
	flex: 3;
`;
export const Kanji = styled.div`
	font-size: 4rem;
`;

export const KanjiInf = styled.div`
	font-size: 1.5rem;
	margin-left: 20px;
	span {
		opacity: 0.6;
	}
`;
export const KanjiTop = styled.div`
display: flex;
border-bottom: 1px solid rgba(255,255,255,0.5);
padding: 30px 0px;
margin-bottom: 10px;
@media(max-width:770px){
	flex-direction:column;
	justify-content:center;
	align-items:center;
	gap:20px;
}
`;
export const KanjiSVG = styled.div`
	width: 200px;
	height: 200px;
	border: 1px solid #282E3E;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 7rem;
	line-height:7rem;
	margin-right:200px;
	color:#282E3E;
	@media(max-width:770px){
		margin-right:0px;
}
`;
