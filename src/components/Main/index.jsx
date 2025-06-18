import React from 'react'
import Track from '../Track/Track'


export default function Main({tracks, form , setForm}) {


  
  return (
    <div className='tracker'>
      {tracks.map(track => (
        <Track track={track} form={form} setForm={setForm} />
      ))}
        
    </div>
  )
}
