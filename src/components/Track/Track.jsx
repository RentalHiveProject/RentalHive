import React from 'react'
import Project from '../Project/Project'
import AddTagButton from '../AddTagButton/AddTagButton';
import axios from 'axios';

export default function Track({track, form, setForm}) {
    const onDelete = () => {
        axios.delete(`http://localhost:3001/tracks/${track.id}`).catch(() => {
          alert('Не удалось удалить задачу')
      })
    }
    const onEdit = () => {
        const newDescription = window.prompt('Текст задачи', track.desciption)
        axios.patch(`http://localhost:3001/tracks/${track.id}`, {
            description: newDescription
    })
  }

  return (
    <div key={track.id} className='tracker__wrapper'>
    <div className='tracker_header'>

  </div>
  <div className='tracker__time'>
      <div className='tracker__info'>
        <input value={track.description} onClick={() => onEdit()} className='input' placeholder='Добавити назву'/>
        {track.project
          ? <Project projectColor={track.project.color} projectName={track.project.projectName}/> 
          : <AddTagButton id={track.id} form={form} setForm={setForm}/>}
      </div>
      <div>
        <input value={track.start} className='input'/>
        <input value={track.stop} className='input'/>
        <span>{track.total}</span>
      </div>
      <div onClick={() => onDelete()} className='button red'>
        Видалити
      </div>
  </div>
  </div>
  )
}
