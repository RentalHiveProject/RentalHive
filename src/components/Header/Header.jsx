import React from 'react';
import { CiMenuBurger } from "react-icons/ci";

export default function Header() {

  return (
    <div className='Header'>
        <div className="header__main">
            <CiMenuBurger className='header__burger'/>
            <div>PavliukTracker</div>
        </div>
    </div>
  )
}
