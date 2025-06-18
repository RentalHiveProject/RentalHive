import React, { useRef, useState} from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { useClickOutside } from '../../hooks/useClickOutside';
import Tag from '../Tag/Tag';

export default function AddTagButton({value, id, form, setForm, project, setProject}) {
    const popupRef = useRef(null);
    const [visiblePopup, setVisiblePopup] = useState(false)



    const onPopup = () => {
      setVisiblePopup(!visiblePopup)
    }

    useClickOutside(popupRef, () => {
      setVisiblePopup(false)
    })

  return (
    <div  className='addTrack_button' ref={popupRef}>
        <div className='addTrack_button' onClick={onPopup}>
          <CiCirclePlus className='icon'/>
          {value ? <span>{value}</span> : <span>Проект</span>}
        </div>
        {visiblePopup && <div > <Tag setForm={setForm} form={form} id={id} project={project} setProject={setProject}/> </div>}
    </div>
  )
}
