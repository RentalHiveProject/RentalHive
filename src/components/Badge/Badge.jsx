import React, { useRef } from 'react'
import cn from './Badge.module.css'
import { useClickOutside } from '../../hooks/useClickOutside'

export default function Badge({color, setColor, setVisibleBadge}) {
    const badgeRef = useRef(null)

    useClickOutside(badgeRef, () => {
        setVisibleBadge(false)
    })

  return (
    <div className={cn.badge} ref={badgeRef}>
        <div className={cn.badge__wrapper}>
            <div className={cn.badge__default}>
                <div onClick={() => setColor("#EC407A")} className={cn.badge__color} style={{backgroundColor: "#EC407A"}}></div>
                <div onClick={() => setColor("#BA68C8")} className={cn.badge__color} style={{backgroundColor: "#BA68C8"}}></div>
                <div onClick={() => setColor("#7986CB")} className={cn.badge__color} style={{backgroundColor: "#7986CB"}}></div>
                <div onClick={() => setColor("#1E88E5")} className={cn.badge__color} style={{backgroundColor: "#1E88E5"}}></div>
                <div onClick={() => setColor("#29B6F6")} className={cn.badge__color} style={{backgroundColor: "#29B6F6"}}></div>
                <div onClick={() => setColor("#26A69A")} className={cn.badge__color} style={{backgroundColor: "#26A69A"}}></div>
                <div onClick={() => setColor("#7CB342")} className={cn.badge__color} style={{backgroundColor: "#7CB342"}}></div>
                <div onClick={() => setColor("#FF7043")} className={cn.badge__color} style={{backgroundColor: "#FF7043"}}></div>
                <div onClick={() => setColor("#A1887F")} className={cn.badge__color} style={{backgroundColor: "#A1887F"}}></div>
            </div>
            <div className={cn.badge__custom}>
                <div className={cn.colorPicker}>
                    <input 
                        type='color' 
                        style={{backgroundColor: color}} 
                        onChange={(e) => setColor(e.target.value)} 
                        className='input__color'/>

                </div>
                <p>Custom</p>
            </div>
        </div>
    </div>
  )
}
