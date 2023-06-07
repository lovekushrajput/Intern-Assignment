import React, { useState } from 'react'
import { BsFillStarFill } from 'react-icons/bs'

function Event({ show, setshow }) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [bookedData, setBookedData] = useState({})


    const handleClick = () => {
        setIsFormOpen(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setBookedData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Retrieve previous form data from localStorage
        const previousFormData = localStorage.getItem(show.name)
        const previousData = previousFormData ? JSON.parse(previousFormData) : [];


        // Add the current user's data to the previous data array
        previousData.push({ ...bookedData, movieName: show.name, language: show.language })

        // Store the updated data in localStorage
        localStorage.setItem(show.name, JSON.stringify(previousData))

        setIsFormOpen(false)
    }


    const renderForm = () => (
        <div className='flex w-full justify-center'>
            <form action="#" onSubmit={handleSubmit} className='border border-gray-400  w-2/5 flex flex-col p-4'>
                <label htmlFor="name" className='mb-2'>Movie Name</label>
                <input type="text" id='name' name='name' value={show.name} className='border border-gray-300 pl-1 py-2 mb-6' readOnly />


                <label htmlFor="language" className='mb-2'>Movie Language</label>
                <input type="text" id='language' name='language' value={show.language} className='border border-gray-300 pl-1 py-2 mb-6' readOnly />

                <input type="text" name='username' placeholder='Enter Your name' className='border border-gray-300 pl-1 py-2 mb-6' onChange={handleChange} required/>

                <input type="text" name='phone' placeholder='Phone Number' className='border border-gray-300 pl-1 py-2 mb-6' onChange={handleChange} required/>

                <input type="number" name='tickets' placeholder='Number of Ticket' className='border border-gray-300 pl-1 py-2 mb-6' onChange={handleChange} required/>

                <input type="date" name='date' className='border border-gray-300 pl-1 py-2 mb-6' onChange={handleChange} required />

                <button className='bg-blue-500 py-2 text-white'>Book</button>
            </form>
        </div>
    )


    const renderShow = () => (
        <>
            <button onClick={() => setshow('')} className='border border-red-400 p-1 mb-5'>Back</button>
            <div className='flex'>
                <img className='w-1/4 mr-3' src={show.image.original} alt="event-images" />
                <div>
                    <h2 className='text-3xl mb-3'>{show.name}</h2>
                    {/* rating */}
                    <div className='flex items-center text-xl'>
                        <BsFillStarFill className='text-red-400' />
                        <span>   {show.rating.average || 0}/10 rating</span>
                    </div>


                    {/* about the movie or summary */}
                    <p className='my-3'>
                        {show.summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "")}
                    </p>


                    {/* language */}
                    <p className='border inline-block py-1 px-2'>{show.language}</p>

                    <ul className='flex justify-between w-1/2 my-5'>
                        <li>
                            00h {show.runtime}m
                        </li>
                        <li className='list-disc'>
                            {show.genres.join(',')}
                        </li>
                        <li className='list-disc '>
                            {'UA'}
                        </li>
                        <li className='list-disc'>
                            {show.premiered}
                        </li>
                    </ul>

                    <button onClick={handleClick} className='bg-red-500 text-white px-6 py-2 rounded cursor-pointer'>Book Show</button>
                </div>

                <div className='w-1/4 flex flex-col'>

                    {
                        localStorage.getItem(show.name) &&
                        <>
                            <label htmlFor="bookedUser">Booked User: </label>
                            <select name="watchedUsers" id='bookedUser' className='border'>
                                {JSON.parse(localStorage.getItem(show.name)).map((user, i) => (
                                    <option key={i} value={user.username}>{user.username}</option>
                                ))}
                            </select>
                        </>
                    }
                </div>
            </div>
        </>
    )


    return (
        <>
            {
                isFormOpen ? renderForm() : renderShow()
            }

        </>
    )
}

export default Event