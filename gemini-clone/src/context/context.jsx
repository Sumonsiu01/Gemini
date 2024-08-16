import { createContext, useState} from "react";
import run from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props) =>{


    const [input,setInput] = useState("");
    const [recentPrompt,setRecentprompt] = useState("");
    const [prevPrompt,setPrevprompt] = useState([]);
    const [showresult,setShowresult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState();

    const delyPara = (index,nextWord) =>{

        setTimeout(() => {
            setResultData(prev=>prev+nextWord)
        }, 75*index);

    }

    const newChat = () => {
        setLoading(false);
        setShowresult(false);
    }


    const onSent = async(prompt) =>{

        setResultData("");//firstly need to delete the privous fetch data
        setLoading(true);//and then client need to wait until the data show in front page
        setShowresult(true);//then the data will show to the front end
        let response;

        if(prompt !== undefined)
        {
            response = await run(prompt);
            setRecentprompt(prompt);
        }
        else{
            setPrevprompt(prev=>[...prev,input])
            setRecentprompt(prompt);
            response = await run(input);
        }
        //setRecentprompt(input);//the recect prompt will update with the change of input change
        //setPrevprompt(prev=>[...prev,input])
        //const response = await run(input);
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i = 0;i<responseArray.length;i++)
        {
            if(i === 0 || i%2 !== 1)
            {
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join ("</br>");
        let newResponseArray = newResponse2.split(" ")
        for(let i = 0;i<newResponseArray.length;i++)
        {
            const nextWord = newResponseArray[i];
            delyPara(i,nextWord + " ");

        }
        setLoading(false);//loading animation will vanish when the data show to the client
        setInput("");//after showing the result data input field will be clean
    }


    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentprompt,
        prevPrompt,
        setPrevprompt,
        showresult,
        setShowresult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
        newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;