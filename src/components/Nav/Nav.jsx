import React from 'react';
import { MdDomainVerification } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { Link } from 'react-router-dom';

export default function Nav({}) {

    return (
        <div className='nav'>
        <uv className='nav__links'>
           <Link to="/">
            <li className='nav__link'>
                <MdDomainVerification className='nav__icon'/>
                <span>Головна</span>
            </li> 
           </Link>
           <Link to="/reports">
            <li className='nav__link'>
                <TbReportAnalytics className='nav__icon'/>
                <span>Звіти</span>
            </li> 
           </Link>
        </uv>
    </div>
    )

  
}
