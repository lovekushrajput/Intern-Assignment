import React, { useEffect, useState } from 'react'
import Event from './Event'

function App() {
    const [state, setState] = useState([])
    const [show, setShow] = useState("")


    useEffect(() => {
        fetch(' https://api.tvmaze.com/search/shows?q=all', {
            method: 'GET'
        })
            .then(res => res.json())
            .then((data) => {
                setState(data.sort((a, b) => b.score - a.score))
            })
            .catch(err => console.log(err))

    }, [])


    const handleClick = (event) => {
        setShow(event)
    }

    const events = (event, i) => (
        <>
            <div className='w-1/4 flex flex-col pr-2 mb-8 cursor-pointer' key={i} onClick={() => handleClick(event.show)}>
                <img src={event.show.image.medium} alt="show-imag" />
                <div >
                    <h2 className='text-center text-2xl'>{event.show.name}</h2>
                    <p className='text-center  text-gray-400 font-bold'>{event.show.genres.join("/")}</p>
                </div>
            </div>
        </>
    )

    if (state.length === 0) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h1 className='text-center text-4xl font-bold mb-7'>Show Booking</h1>
            <div className='flex flex-wrap justify-start p-2'>
                {
                    show ? <Event show={show} setshow={setShow} /> : state.map(events)
                }
            </div>
        </>
    )
}

export default App