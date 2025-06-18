import React, {useEffect, useState} from 'react'
import FormAddingTag from '../FormAddingTag/FormAddingTag';
import { CiCirclePlus } from 'react-icons/ci';
import axios from 'axios';
import Project from '../Project/Project';

export default function Tag({setForm, id, project, setProject, form}) {
  const [projects, setProjects] = useState();

  useEffect(() => {
    axios.get('http://localhost:3001/projects/').then(({data}) => {
      setProjects(data)
    })
  }, [])

  const addProject = (projectId, color, name) => {
    if (id) {
      axios.patch(`http://localhost:3001/tracks/${id}`, {
      projectId: projectId
    })
    } else {
        setProject({
          color: color,
          projectName: name,
          id: projectId
        })
      }
    }
  
  return (
    <div className='tag'>
        <div>

            <div className='tag__projects'>
                {projects 
                  ? projects.map(obj => (
                    <Project projectColor={obj.color} projectName={obj.projectName} id={obj.id} key={obj.id} className={'tag__project'} 
                      addProject={addProject}/>)) 
                  : "проектів ще нема"}
            </div>
            <div onClick={() => setForm(true)} className='addTrack_button'>
              <CiCirclePlus className='icon'/>
              <span>Новий проект</span>
            </div>
        </div>
        {form && <FormAddingTag setForm={setForm} project={project} setProject={setProject} id={id}/>}
    </div>
  )
}
