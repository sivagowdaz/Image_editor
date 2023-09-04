import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

const CATEGORIES = [
    'Nature',
    'Sport',
    'Business',
    'Birds',
    'Animals',
    'Planel',
    'Automobile',
    'Bikes',
    'Flowers',
    'Artistic',
    'Man',
    'Electronics',
]

function Home() {
    const [images, setImages] = useState([])
    const [query, setQuery] = useState('')

    const [apiError, setApiError] = useState(false)
    console.log('API KEY', process.env.REACT_APP_API_KEY)
    useEffect(() => {
        fetchImages('https://api.unsplash.com/photos/random?count=30')
    }, [])

    const fetchImages = async(url, type='random') => {
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Client-ID ${process.env.REACT_APP_API_KEY}`,
            },
        })
        if(!response.ok){
            setApiError(true)
            return
        }

        const data = await response.json()
        let links = []
        if(type == 'query'){
            links = data.results.map((imgObj) => imgObj.urls.regular)
        }else{
            links = data.map((imgObj) => imgObj.urls.regular)
        }
        setImages(links)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        fetchImages(`https://api.unsplash.com/search/photos?query=${query}`, 'query')
        setQuery('')
    }
    
    if(apiError){
        return(
            <div>
                <p className='text-center text-[25px] text-red-400 font-medium'>Api Limit Exceed. Try After One Hour</p>
            </div>
        )
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <header className='px-3 py-6 border-b-[1px] w-full border-gray-300'>
                <p className="text-center w-full text-3xl text-blue-600 font-medium">ImageCanva</p>
            </header>
            <div className='w-[320px] sm:w-[400px] md:w-[600px] flex flex-row items-center h-[50px] border-blue-500 border-[1px] rounded-full pl-4 overflow-hidden mt-4'>
                <input placeholder='search'
                    onChange={(e)=>{setQuery(e.target.value)}}
                    className='outline-none h-full w-4/5 text-xl text-black'/>
                <button
                    onClick={handleSearch}
                    className='outline-none  text-blue-700 bg-blue-200 text-[15px] border-l-2 w-1/5 h-full border-gray-300'>
                    Search
                </button>
            </div>
            <div className='flex flex-row w-[320px] sm:w-[600px] md:w-[700px] lg:w-[1000px] lg:overflow-x-hidden overflow-x-scroll gap-x-2 my-4'>
                {
                    CATEGORIES.map((category, index) => 
                        <div
                        onClick={()=>fetchImages(`https://api.unsplash.com/search/photos?query=${category}`, 'query')}
                        key={index} className='p-3 bg-gray-100 rounded-[8px] cursor-pointer'>
                            <p className='text-center'>{category}</p>
                        </div>)
                }
            </div>
            <div className='flex flex-row flex-wrap justify-center items-center'>
                {
                    images.map((image, index) => 
                        <Link to="edit-image" state={{ url: image }}>
                            <div key={index} className='flex flex-row flex-wrap m-1 cursor-pointer'>
                                <img className='w-[300px] h-fit object-fill rounded-sm' src={image}/>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Home