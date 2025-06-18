import React, { useState, useEffect  } from 'react'
import AddTagButton from '../AddTagButton/AddTagButton';
import Project from '../Project/Project';
import axios from 'axios';

export default function AddTrack({title, setTitle, form, setForm, project, setProject}) {

  const [start, setStart] = useState(false);


  const [seconds, setSeconds] = useState(JSON.parse(localStorage.getItem("seconds")) || 0);
  const [minutes, setMinutes] = useState(JSON.parse(localStorage.getItem("minutes")) || 0);
  const [hours, setHours] = useState(JSON.parse(localStorage.getItem("hours")) || 0);

  const [startTime, setStartTime] = useState();

  const [newTrackObj, setNewTrackObj] = useState(JSON.parse(localStorage.getItem("newTrack")))

  useEffect(() => {
    if(newTrackObj && newTrackObj.projectId) {
      axios.get(`http://localhost:3001/projects/${newTrackObj.projectId}`).then(({data}) => {
        setProject(data)
      })
    }

    if(newTrackObj) {
      setStart(true)
      setStartTime(newTrackObj.start)
      setTitle(newTrackObj.description)
    }
  }, [])


  const onStart = () => {
    setStart(true)

    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();


    setStartTime(`${nowHours < 10 ? "0" + nowHours : nowHours}:${nowMinutes < 10 ? "0" + nowMinutes : nowMinutes}`)
  }

  useEffect(() => {
    localStorage.getItem('newTrack')
  }, [])

  useEffect(() => {
    if (start) {
  
      const now = new Date();
      const nowHours = now.getHours();
      const nowMinutes = now.getMinutes();
  
      const total = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`

      const timer = setInterval(() => {
        setSeconds(seconds + 1)

        if (seconds === 59) {
          setMinutes(minutes + 1)
          setSeconds(0)
        }
  
        if (minutes === 59) {
          setHours(hours + 1);
          setMinutes(0);
        }

      if (project) {
        setNewTrackObj({
          description: title,
          start: startTime,
          stop: `${nowHours < 10 ? "0" + nowHours : nowHours}:${nowMinutes < 10 ? "0" + nowMinutes : nowMinutes}`,
          total: total,
          unix: now.getTime(),
          projectId: project.id
        })
      } else  {
        setNewTrackObj({
          description: title,
          start: startTime,
          stop: `${nowHours < 10 ? "0" + nowHours : nowHours}:${nowMinutes < 10 ? "0" + nowMinutes : nowMinutes}`,
          total: total,
          unix: now.getTime(),
      })}
      // const totalTime = {
      //   seconds: seconds,
      //   minutes: minutes,
      //   hours: hours
      // }
      localStorage.setItem('newTrack', JSON.stringify(newTrackObj));
      localStorage.setItem('seconds', JSON.stringify(seconds))
      localStorage.setItem('minutes', JSON.stringify(minutes))
      localStorage.setItem('hours', JSON.stringify(hours))

      console.log(newTrackObj);
      }, 1000)
    return () => clearInterval(timer) 
}
})

  const onStop = () => {
    setStart(false)
    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();

    const total = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`

    setSeconds(0)
    setMinutes(0)
    setHours(0)



    if (project) {
      axios.post('http://localhost:3001/tracks',{
        description: title,
              start: startTime,
              stop: `${nowHours < 10 ? "0" + nowHours : nowHours}:${nowMinutes < 10 ? "0" + nowMinutes : nowMinutes}`,
              total: total,
              unix: now.getTime(),
              projectId: project.id
      })
    } else axios
            .post('http://localhost:3001/tracks', {
              description: title,
              start: startTime,
              stop: `${nowHours < 10 ? "0" + nowHours : nowHours}:${nowMinutes < 10 ? "0" + nowMinutes : nowMinutes}`,
              total: total,
              unix: now.getTime(),
            })
    
    setProject()
    setTitle('');
    setNewTrackObj({})
    localStorage.removeItem('newTrack');
    localStorage.removeItem('seconds');
    localStorage.removeItem('minutes');
    localStorage.removeItem('hours');
  }
if (newTrackObj) 
  return (
    <div className='addTrack'>
    <div className='addTrack_main'>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className='input addTrack__input' placeholder='що ми робимо?'/>
        <div className='addTrack__set'>
          <div className='addTrack_tag'>
              {project ? <Project projectColor={project.color} projectName={project.projectName}/> : <AddTagButton project={project} setProject={setProject} form={form} setForm={setForm} id={false}/>}
          </div>
          <div>{newTrackObj.total || "00:00:00"}</div>
          {!start ? <div onClick={onStart} className='button'>Start</div> : <div onClick={onStop} className='button red'>Зупинити</div>}
        </div>
    </div>
</div>
  )
  return (
    <div className='addTrack'>
        <div className='addTrack_main'>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className='input addTrack__input' placeholder='що ми робимо?'/>
            <div className='addTrack__set'>
              <div className='addTrack_tag'>
                  {project ? <Project projectColor={project.color} projectName={project.projectName}/> : <AddTagButton project={project} setProject={setProject} form={form} setForm={setForm} id={false}/>}
              </div>
              <div>{hours < 10 ? "0" + hours : hours}:{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</div>
              {!start ? <div onClick={onStart} className='button'>Розпочати</div> : <div onClick={onStop} className='button red'>Зупинити</div>}
            </div>
        </div>
    </div>
  )
}
