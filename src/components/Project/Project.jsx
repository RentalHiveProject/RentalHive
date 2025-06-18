import React from 'react'
import cn from "./Project.module.css"
import classNames from 'classnames'

export default function Project({projectName, projectColor, className, addProject, id}) {
  return (
    <div className={classNames(cn.project, className)} onClick={() => addProject(id, projectColor, projectName)}>
        <div className={cn.color} style={{backgroundColor: projectColor}}></div>
        <span style={{color: projectColor}}>{projectName}</span>
    </div>
  )
}
