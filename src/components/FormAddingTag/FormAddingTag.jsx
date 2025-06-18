import React, { useRef, useState } from 'react'
import cn from'./FormAddingTag.module.css'
import { IoIosClose } from "react-icons/io";
import Badge from '../Badge/Badge';
import { FaCaretDown } from "react-icons/fa";
import axios from 'axios';

export default function FormAddingTag({setForm, setProject, id}) {
    const formRef = useRef(null)
    const [color, setColor] = useState("#29B6F6");
    const [visibleBadge, setVisibleBadge] = useState(false);
    const [projectName, setProjectName] = useState();

    const onAddProject = () => {
        axios
            .post('http://localhost:3001/projects', {
                color: color,
                projectName: projectName,
            })
            .then(({data}) => {
                const projectId = data.id
                if (setProject) { setProject({
                    id: data.id,
                    color: data.color,
                    projectName: data.projectName
                })}
                if (id) {   
                    axios
                        .get(`http://localhost:3001/tracks/${id}`)
                            .then(({data}) => {
                            const info = data
                            console.log(info);
                            axios.put(`http://localhost:3001/tracks/${id}`, {
                                id: info.id,
                                description: info.description,
                                start: info.start,
                                stop: info.stop,
                                total: info.total,
                                unix: info.unix,
                                projectId: projectId
                        })
                    })}}
        )
        setForm(false)
    }

  return (
        <div className={cn.form} ref={formRef}>
        <div className={cn.form__wrapper}>
            <div className={cn.form__title}>
                <h1>
                    Створити новий проект
                </h1>
                <IoIosClose className={cn.icon} onClick={() => {setForm(false)}}/>
            </div>
            <div className={cn.form__picker}>
                <input placeholder='Введіть назву проекту' value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
                <div className={cn.form__badge} >
                    <div className={cn.badgeWrapper} onClick={() => {setVisibleBadge(!visibleBadge)}}>
                        <div className={cn.form__color} style={{backgroundColor: color}} />
                        <FaCaretDown />
                    </div>
                    {visibleBadge && <Badge color={color} setColor={setColor} setVisibleBadge={setVisibleBadge}/>}

                </div>
            </div>
            <div className={cn.form__buttons}>
                <div className={cn.form__cancel} onClick={() => {setForm(false)}}>Відмінити</div>
                <div className='button' onClick={onAddProject}>Створити</div>
            </div>
        </div>
    </div>
  )
}
