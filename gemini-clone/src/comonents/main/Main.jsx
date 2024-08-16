import  React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context';
const Main = () => {

    const{onSent,recentPrompt,showresult,loading,resultData,setInput,input} = useContext(Context);
  return (
    <div className='main'>
        <div className="nav">
        <p>Gemini</p>
         <img src={assets.user_icon} alt="" />
         </div>
         <div className="main-container">
            {!showresult?<><div className="greet">
            <p><span>Hello, dev.</span></p>
            <p>How can i help you today?</p>
        </div>
        <div className="cards">
            <div className="card">
                <p>Suggest beautiful places to upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
                <p>Breifly summerize the concept of urban planning</p>
                <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
                <p>Brain storm team bonding activity for out team retreat</p>
                <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
                <p>Improve the readibility to this code</p>
                <img src={assets.code_icon} alt="" />
            </div>
        </div>
        </>
        :<div className='result'>
            <div className='result-title'>
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
                <img src={assets.gemini_icon} alt="" />
                {
                    loading?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
                
            </div>
        </div>
        }
           
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value = {input} type="text" placeholder='Enter the prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className="bottom-info">Gemini may be display inaccurate info,Including about people.So double check it's respones.Your Privacu & policy</p>
            </div>
         </div>
        </div>
  )
}

export default Main