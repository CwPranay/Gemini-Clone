import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import '../components/mainpart.css'
import { Context } from './context/context'

const mainpart = () => {
  const { previousPrompt,
    onSent,
    setrecentPrompt,
    setResultData,
    setpreviousPrompt,
    setShowResult,
    loading,
    setLoading,
    
    showResult,
    resultData,
    recentPrompt,
    input,
    setInput } = useContext(Context)

    let loadprompt= async (prompt2)=>{
    
      setrecentPrompt(prompt2)
      await onSent(prompt2)

  }

  return (
    <>
      <div className='main flex-1 min-h-[100vh] pb-[15vh] relative'>
        <div className="nav flex items-center justify-between p-[20px] text-[#585858] text-[22px]">
          <p>Gemini</p>
          <img className='w-[40px] rounded-full' src={assets.pranay} alt="" />
        </div>
        <div className="main-cont max-w-[900px] m-auto">
          
          {!showResult
            ? <>
              <div className="greet mt-[30px] mb-[30px] text-[50px] text-[#c4c7c5] font-medium p-[20px]  ">
                <p><span className=''>Hello, Dev.</span></p>
                <p>How can i help you today?</p>
              </div>

              <div className="cards">
                <div onClick={()=>loadprompt("Suggest beautiful places to see on an upcoming road trip")} className="card">

                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                  <img src={assets.compass_icon} alt="" />

                </div>
                <div onClick={()=>loadprompt("Briefly summarize this conecpt: urban planning")} className="card">
                  <p>Briefly summarize this conecpt: urban planning</p>
                  <img src={assets.bulb_icon} alt="" />

                </div>
                <div onClick={()=>loadprompt("Brainstorm team bonding activites for our work retreat")} className="card">
                  <p>Brainstorm team bonding activites for our work retreat</p>
                  <img src={assets.message_icon} alt="" />


                </div>
                <div onClick={()=>loadprompt("Improve the readability of the following code")} className="card">
                  <p>Improve the readability of the following code</p>
                  <img src={assets.code_icon} alt="" />

                </div>
              </div>

            </> :
            <div className='result'>
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading?
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                
              </div>

            </div>}




          <div className="main-bottom absolute bottom-0 w-full max-w-[900px] pl=[20px] pr-[20px] m-auto ">

            <div className="search-box flex items-center justify-between gap-[20px] bg-[#f0f4f9] py-[10px] px-[20px] rounded-[50px]">
              <input  onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
              <div className='flex'>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <img  onClick={() => onSent()} src={assets.send_icon} alt="" />
              </div>

            </div>
            <p className='botom-info text-[13px] text-center my-[15px] mx-auto font-thin '>
              Gemini may display inaccurate info,including about people,so double-check its responses.Your privacy and Gemini App
            </p>

          </div>
        </div>



      </div>
    </>
  )
}

export default mainpart
