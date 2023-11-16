import styled from "styled-components";

export const ModalWrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 50px 0px;
	top: 0;
	left: 0;
	bottom:0;
	background: #f6f7fb;
	position:fixed;
	z-index:2;
	overflow-y:scroll;
	::-webkit-scrollbar {
		display: none;
	}

`;

export const CancelImport = styled.button`
	font-size: 1.2rem;
	font-weight:600;
	color: white;
	text-transform:uppercase;
	box-sizing: border-box;
	text-decoration: none;
	background: transparent;
	border: none;
	font-family:Inter;
	border-bottom: 4px solid #3ccfcf;
	padding: 0;
	padding-bottom: 10px;
	margin-bottom: 20px;
	color:#2E3856;
	&:hover {
		cursor: pointer;
		border-bottom: 4px solid #FFCD1F;
		color:#FFCD1F;
	}
`;
export const DragButtons = styled.div`
	width: 25%;
	color:#2e3856;
	font-family:Inter;
	font-size: 1.5rem;
	padding: 10px 15px;
	border-radius: 5px;
	margin-bottom: 40px;
	background: white;
	box-shadow: 0 0.25rem 1rem 0 #2e385614;
	&:hover {
		cursor: grab;
	}
`;
export const ConfirmButton = styled.button`
max-height:60px;
padding: 20px 30px;
border: none;
background: #3ccfcf;
font-size: 1.2rem;
color: white;
font-weight: bold;
border-radius: 5px;
@media(max-width:450px){
	padding:5px 5px;
	font-size:0.9rem;
	max-height:40px;
}
`;

export const ImportTextArea = styled.textarea`
	font-size: 1.4rem;
	color: #2E3856;
	font-family:Inter;
	background: transparent;
	border: 2px solid #2E3856;
	box-sizing:border-box;
	padding:10px;
	width: 100%;
	&:focus{
		outline: none;
		border:2px solid #F9DF08;
	}
	@media(max-width:550px){
		font-size:1.3rem;
	}
	@media(max-width:390px){
		font-size:1.1rem;
	}
	@media(max-width:320px){
		font-size:0.9rem;
	}
`;
export const SeparatorContainer = styled.div`
	margin-bottom:20px;
	color:#2E3856;
`;
export const SeparatorType = styled.div`
	font-size:1.2rem;
	font-family:Inter;
	font-weight:500;
	margin-bottom:10px;
`;
export const ItemContainer = styled.div`
	display:flex;
	
	@media(max-width:700px){
		display:block;
	}
`;
export const SeparatorItem = styled.div`
	width:100%;	
	display: flex;
	color:#2E3856;
	align-items: center;
	justify-content: center;
    margin-right:20px;
	@media(max-width:710px){
		margin-bottom:10px;
	}
	div{
		width:100%;	
        input {
            position: absolute;
            opacity: 0;
            &:hover {
                cursor: pointer;
            }
			&:focus{
				& + label::before {
					border: 2px solid red;
				}
			}
        }
        input:checked {
            & + label::before {
                border: 2px solid #ffcd1f;
            }
            & + label::after {
                content: "";
                position: absolute;
                display: block;
                width: 14px;
                height: 14px;
                background: black;
                left: 5px;
                border-radius: 50%;
                background: #ffcd1f;
            }
        }
       
        label {
            &:hover {
                cursor: pointer;
            }
			font-family:Inter;
            display: flex;
            position: relative;
            align-items: center;
        
            &::before {
                content: "";
                margin-right:10px;
                border: 2px solid #939bb4;
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }
        }
    }

`;
export const SeparatorInput = styled.input`
	background: transparent;
	border: none;
	border-bottom: 2px solid #2E3856;
	color: #2E3856;
	font-size: 1.3rem;
	width: 50px;
	margin-left: 5px;
	&:focus {
		outline: none;
	}
`;




export const CardContainer = styled.div<{count:boolean}>`
overflow-y:${(props)=> props.count ? 'scroll' : 'auto'};
::-webkit-scrollbar {
    display: none;
}
height:400px;
]
`;


