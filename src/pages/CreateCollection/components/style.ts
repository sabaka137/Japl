import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const FlashcardWrapper = styled(NavLink)`
width:calc(33.33333% - 10px) ;
background:#2e3856;
height:150px;
margin:10px 0px 0px 10px;
padding:20px;
overflow:hidden;
text-decoration:none;
color:white;

`
export const Name = styled.div`
max-width:70%;
overflow:hidden;
white-space: nowrap;
text-overflow: ellipsis;
font-size:1.7rem;
`
export const Count = styled.div`
font-size:1.1rem;
font-weight:bold;
opacity:0.7
`

export const CreateCardWrapper = styled(NavLink)<{isActive:boolean}>`
width:calc(33.33333% - 10px) ;
background:white;
height:150px;
color:black;
margin:10px 0px 0px 10px;
padding:20px;
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
font-size:10rem;
line-height:10rem;

`