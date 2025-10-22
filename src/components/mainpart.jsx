import { useContext } from 'react'
import { assets } from '../assets/assets'
import './mainpart.css'
import { Context } from './context/context'

const Mainpart = () => {
  const { 
    onSent,
    setrecentPrompt,
    loading,
    showResult,
    resultData,
    recentPrompt,
    input,
    setInput 
  } = useContext(Context)

  const loadprompt = async (prompt2) => {
    setrecentPrompt(prompt2)
    await onSent(prompt2)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      onSent()
    }
  }

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.pranay} alt="Profile" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div onClick={() => loadprompt("Suggest beautiful places to see on an upcoming road trip")} className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div onClick={() => loadprompt("Briefly summarize this concept: urban planning")} className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div onClick={() => loadprompt("Brainstorm team bonding activities for our work retreat")} className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div onClick={() => loadprompt("Improve the readability of the following code")} className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type="text" 
              placeholder='Enter a prompt here'
              onKeyDown={handleKeyDown}
            />
            <div className='search-icons'>
              <img src={assets.gallery_icon} alt="Gallery" className="icon-gallery" />
              <img src={assets.mic_icon} alt="Microphone" className="icon-mic" />
              <img 
                onClick={() => input && onSent()} 
                src={assets.send_icon} 
                alt="Send" 
                className={`icon-send ${input ? 'active' : ''}`}
                style={{ opacity: input ? 1 : 0.3, cursor: input ? 'pointer' : 'default' }}
              />
            </div>
          </div>
          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Mainpart
