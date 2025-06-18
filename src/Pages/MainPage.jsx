import React from 'react'
import AddTrack from '../components/AddTrack.jsx/AddTrack'
import Main from '../components/Main'

export default function MainPage({title, setTitle, onAddObj, setForm, form, project, setProject, tracks}) {
  return (
      <div className="main__tracking">
        <AddTrack 
          title={title} 
          setTitle={setTitle} 
          onAdd={onAddObj} 
          setForm={setForm} 
          form={form} 
          project={project} 
          setProject={setProject}
        />
        <Main 
          tracks={tracks} 
          form={form} 
          setForm={setForm} 
          project={project} 
          setProject={setProject}
        />  
      </div>
  )
}
