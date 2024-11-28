import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import '../components/sidebar.css'
import { Context } from './context/context'

const sidebar = () => {
    const[extented,Setextented]=useState(false)
    const{onSent,setpreviousPrompt,newChat,setrecentPrompt,previousPrompt}=useContext(Context)
    let loadprompt= async (prompt)=>{
        setrecentPrompt(prompt)
        await onSent(prompt)

    }
  return (


    <div className="sidebar  h-screen inline-flex flex-col justify-between pt-[23px] pb-[12px] bg-slate-200">

    <div className="top">
        <img onClick={()=>{Setextented(prev=>!prev)}} className='menu block ml-6 cursor-pointer' src={assets.menu_icon} alt="" />
        <div onClick={()=>newChat()} className="newchat mt-12 inline-flex  m-[10px] items-center rounded-[50px] pr-4 pl-4 p-[10px]  bg-slate-300  text-gray-500 cursor-pointer font-[14px] gap-[10px]">
            <img  src={assets.plus_icon} alt="" />
          {extented?<p>New chat</p>:null}
        </div>

        {extented?<div className="recent flex flex-col">
            <p className="title mt-[30px] ml-3 mb-[20px]">Recent</p>
            {previousPrompt.map((item,index)=>{
                return(<div onClick={()=>loadprompt(item)} className="recent-entry ml-3 mr-3 items-center flex gap-[10px] p-[10px] pr-[40px] rounded-[50px] cursor-pointer text-gray-600">
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0,18)}...</p>
            </div>)


            })}
            
        </div>:null}

    </div>
    <div className="bottom  flex flex-col">
        <div className="bottom-items recent-entry mr-3 ml-3 flex items-center gap-[10px] p-[10px] pr-[40px] rounded-[50px] cursor-pointer text-gray-600">
            <img src={assets.question_icon} alt="" />
           {extented?<p>Help</p>:null}

        </div>
        <div className="bottom-items recent-entry ml-3  mr-3 flex items-center gap-[10px] p-[10px] pr-[40px] rounded-[50px] cursor-pointer text-gray-600">

            <img src={assets.history_icon} alt="" />
           {extented?<p>Activity</p>:null}
            
        </div>
        <div className="bottom-items recent-entry ml-3 mr-3 flex items-center gap-[10px] p-[10px] pr-[40px] rounded-[50px] cursor-pointer text-gray-600">

            <img src={assets.setting_icon} alt="" />
           {extented?<p>Setting</p>:null}
            
        </div>

    </div>
    </div>
  )
}

export default sidebar
