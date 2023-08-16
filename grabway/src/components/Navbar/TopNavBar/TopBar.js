import React, { useState } from 'react'
import Logo from "../../../Assets/images/logo.png";
import {IoNotificationsSharp} from "react-icons/io5";
import { Avatar } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react';
import { Button} from '@chakra-ui/react';
import "./TopBar.css"
const TopBar = () => {
  const [userLogged, setUserLogged]=useState(false);
  return (
    <div className='flex flex-row justify-between items-center m-1 mt-2 border-b-2 border-[#77717150] p-2 pl-10 pr-10 rounded-full'>
      <Link href="/">
      <div className='flex flex-row justify-center items-center'>
          <div className='logo-text flex flex-row justify-center items-center text-2xl font-ubuntu'>GrabWay</div>
          <div className='flex justify-center items-center'>
          <img src={Logo}/>
          </div>
      </div>
      </Link>
      <div className='flex flex-row justify-center items-center gap-7'>
        <div>
        <IconButton sx={{bgColor:"white"}}
        icon={ <IoNotificationsSharp bbox="black"fill="#E51B23" className='h-8 w-8'/>} />
         </div>
        <div>
          {!userLogged && <>
            <Button colorScheme="red" sx={{bgColor:"#E51B23",
                        _hover:`bgColor:"#E51B23"`,
                        color:"white",
                        
          }}>Sign In</Button>
          </>}

          {userLogged && <>
            <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
        </>}
        </div>
        
      </div>
    </div>
  )
}

export default TopBar
