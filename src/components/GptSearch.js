import React from 'react'
import GptSearchbar from './GptSearchbar'
import  GptMovieSuggestion from './GptMovieSuggestion'
import {BG_URL} from "../utils/constants"
const GptSearch = () => {
  return (
    <div>
    <div className="absolute -z-10">
         <img className='w-screen  object-cover' src={BG_URL} alt="bg image"/>

         </div>
     <GptSearchbar/>
     <GptMovieSuggestion/>
   
    </div>
  )
}

export default GptSearch