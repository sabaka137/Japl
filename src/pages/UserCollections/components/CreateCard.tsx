import React from 'react'

import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { CiCirclePlus } from "react-icons/ci";

export const CreateCardWrapper = styled(NavLink)`
    width: calc(33.33333% - 50px);
    min-width: 200px;
    background: white;
    height: 130px;
    color: #2e3856;
    box-shadow: 0 0.225rem 0.25rem #00000014;
    border-radius: 7px;
    padding: 20px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80px;
    line-height:70px;
  div{
  
  }
    text-decoration: none;
    &:hover {
        box-shadow: 0 0.55rem 0.55rem #00000014;
    }
    @media (max-width: 545px) {
        width: 100%;
    }
`
function CreateCard() {
    return <CreateCardWrapper to={'/group/create'}><div><CiCirclePlus /></div></CreateCardWrapper>
}

export default CreateCard
