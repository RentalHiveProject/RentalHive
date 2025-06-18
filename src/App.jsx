import Header from "./components/Header/Header";
import './App.css'
import Nav from "./components/Nav/Nav";
import MainPage from "./Pages/MainPage";
import { useEffect, useState } from "react";
import DB from "./assets/db.json"
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Reports from "./Pages/Reports";

function App() {
  const [nav, setNav] = useState('true');
  const [title, setTitle] = useState('');
  const [obj, setObj] = useState(DB.tracks)
  const [form, setForm] = useState(false)
  const [project, setProject] = useState()
  
  const onSum = (array) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += Number(array[i])
    }
    return sum;
  }



  useEffect(() => {
    axios.get('http://localhost:3001/projects?_embed=tracks').then(({data}) => {

      data.map(obj => {
        if (obj.tracks.length > 0) {
          const total = obj.tracks.map(track => {
            const array = track.total.split(':')
            const sum = Number(array[0]) * 3600 + Number(array[1]) * 60 + Number(array[2])
            return +sum
          })
          axios.patch(`http://localhost:3001/projects/${obj.id}`, {
            total: onSum(total)
          })
        }
          if (obj.tracks.length == 0) {
            axios.patch(`http://localhost:3001/projects/${obj.id}`, {
              total: 0
            })


        }
          

      })
      
  })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3001/tracks?_sort=-unix&_embed=project').then(({data}) => {
      setObj(data)
    })
  }, [])

  const onAddObj = track => {
    const newObjects = [track, ...obj]
    setObj(newObjects);
  }


  return (
    <>
      <Nav nav={nav}/>
      <Header nav={nav} setNav={setNav} />
     
      <div className="main">
        <Routes>
            <Route exact path="/" element={
              <MainPage 
                title={title} 
                setTitle={setTitle} 
                onAddObj={onAddObj} 
                setForm={setForm} 
                form={form} 
                project={project} 
                setProject={setProject} 
                tracks={obj} 
                nav={nav} 
                setNav={setNav}
              />
            } />
            
            <Route path="/Reports" element={<Reports />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
