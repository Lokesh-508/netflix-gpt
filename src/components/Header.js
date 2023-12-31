import React from 'react'
import {  signOut } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {addUser, removeUser} from "../utils/userSlice";
import { useEffect } from "react";
import {  onAuthStateChanged } from "firebase/auth";
import {LOGO, SUPPORTED_LANGUAGES} from '../utils/constants'
import { toggleGptSearchView } from '../utils/GptSlice';
import lang from '../utils/languageConstants';
import {changeLanguage} from "../utils/configSlice"

const Header = () => {

   const navigate=useNavigate();
   const user=useSelector(store=>store.user);
   const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
   const dispatch =useDispatch();
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.'
      //  navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
    
  }

  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL} = user;
        dispatch(
          addUser({
            uid:uid,
          email:email,
          displayName:displayName,
          photoURL:photoURL,
        }));
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    return ()=> unsubscribe();
    
  },[])



  const handleGptSearchClick =()=>{
    // toggle gpt search component
    dispatch(toggleGptSearchView())

  }


  const handleLanguageChange =(e)=>{
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className=" text-sm md:text-3xl  flex absolute w-screen px-8 py-1 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between ">
        <img 
        className='w-44 mx-auto md:mx-0' 
         src={LOGO}
          alt="logo"/>
        {user && <div className='flex p-2 justify-between'>
          {/* <select className="p-2 bg-gray-900 text-white m-2"
          onChange={handleLanguageChange}
          >

            {SUPPORTED_LANGUAGES.map(lang=> (
            <option 
            key={lang.identifier} 
            value={lang.name}>
            {lang.name}
            </option>
            ))}

          </select> */}
          <button
           className=" text-sm md:text-3xl py-2 px-4 m-2 mx-4 my-2 font-bold text-black rounded-lg bg-white" 
            onClick={handleGptSearchClick}>
          { showGptSearch? "HomePage": "GPT Search"}
            </button>
          <img 
               className=' hidden md:block w-12 h-12 '
          alt ="user-icon"
           src={user.photoURL}/>

          <button onClick={handleSignOut} className='text-white font-bold text-sm md:text-3xl '>Sign out</button>
        </div>}
    </div> 
  )
}

export default Header