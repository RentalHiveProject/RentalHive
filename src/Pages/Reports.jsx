import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'


export default function Reports() {
    const [time, setTime] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/projects?total_gt=0').then(({data}) => {
            const newObj = data.map(obj => {
                
                return {
                    name: obj.projectName,
                    data: [Number((obj.total/60).toFixed(2))],
                    y: Number((obj.total/60).toFixed(2)),
                    color: obj.color
                }
            })
        setTime(newObj)
        })
    }, [])

    const optionsDashboard = {
        chart: {
            type: 'column',
            height: "610px",

        },
        title: {
          text: 'Звіт по проектам',
          style: {
            fontFamily: 'Roboto',
            color: "#5ed2d2"
        }
        },
        xAxis: {
            categories: ['Проекти'],
            labels: {
                style: {
                    fontFamily: 'Roboto',
                    color: "#5ed2d2"
                }
            }
        },
    
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Хвилини',
                style: {
                    fontFamily: 'Roboto',
                    color: "#5ed2d2"
                }
            },
            labels: {
                style: {
                    fontFamily: 'Roboto',
                    color: "#feffff"
                }
            }
           
        },
        series: time
      }
    const optionsPie = {
        chart: {
            type: 'pie',
            height: "610px",

        },
        title: {
          text: 'Звіт по проектам',
          style: {
            fontFamily: 'Roboto',
            color: "#5ed2d2"
        }
        },
        xAxis: {
            categories: ['Проекти'],
            labels: {
                style: {
                    fontFamily: 'Roboto',
                    color: "#5ed2d2"
                }
            }
        },
    
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Хвилини',
                style: {
                    fontFamily: 'Roboto',
                    color: "#5ed2d2"
                }
            },
           
        },
        series: [
            {
                name: 'Затрачено хвилин',
                colorByPoint: true,
                data: time
            }
        ]
      }

  return (
    <div className='main__reports'>
        <HighchartsReact
            highcharts={Highcharts}
            options={optionsDashboard}
            className='column'
        />
        <HighchartsReact
            highcharts={Highcharts}
            options={optionsPie}
            className='column'
        />
    </div>
  )
}
