import { createContext, useState } from "react";
import run from "../gemini"



export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [previousPrompt, setpreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextword) => {
        setTimeout(function () {
            setResultData(prev => prev + nextword)
        }, 75 * index);


    }
    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }
    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        
        setShowResult(true)
        let response
        if (prompt !== undefined) {
            response = await run(prompt)
            setrecentPrompt(prompt)
        }
        else{
           setpreviousPrompt(prev=>[...prev,input])
           setrecentPrompt(input)
           response = await run(input)
           
        }
        


        let responeArray = response.split("**");
        let newArray = " ";
        for (let i = 0; i < responeArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newArray += responeArray[i]

            }
            else {
                newArray += "<b>" + responeArray[i] + "</b>";
            }
        }
        let newResponse2 = newArray.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {

            const nextword = newResponseArray[i];
            delayPara(i, nextword + " ")

        }
        setLoading(false)
        setInput("")

    }


    const contextValue = {
        previousPrompt,

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
        setInput,newChat

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider