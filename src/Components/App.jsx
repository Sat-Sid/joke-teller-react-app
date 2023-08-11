import React, {useState, useEffect} from "react";
import {useSpeechSynthesis, useGetArrayOfVoices} from "./useSpeechSynthesis";
import Dialog from "./Dialog.jsx";




const jokeAPIURL = "https://v2.jokeapi.dev/joke/Any?safe-mode";


function App(){

    const [joke, setJoke]= useState("");
    const [readJoke, setReadJoke] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState(0);
    
    const voicesArray = useGetArrayOfVoices();
    const isStillSpeaking = useSpeechSynthesis(joke, readJoke, voicesArray[selectedVoice]);
    
    const [jokeInfo, setJokeInfo] = useState("");

    //fetch data from API
    async function fetchDataFromApi(){

        try {
            const res = await fetch(jokeAPIURL);
            const data = await res.json();
            
            const infoAbtJokeObj ={
                jokeCat: data.category,
                jokeType: data.type,
            }
 
            let randomJoke = "";

            if (infoAbtJokeObj.jokeType === "twopart"){
                randomJoke = `${data.setup} [second part] ${data.delivery}`;
            } else {
                randomJoke = data.joke;
            }
            
            setJoke(randomJoke);
            setJokeInfo(infoAbtJokeObj);
        }
        catch(error) {
            console.log(`Oops, there was error fetching data from Api: ${error}`);
        }
    }


    //To handle btn clickes or option on select element 
    function handleClicksOnDialog(dActionType, dActionOn){

        if (dActionType === "click"){

            if (dActionOn === "Close"){
                setJoke("");
                setReadJoke(false);

            }
            else if(dActionOn === "Play Joke"){
                setReadJoke(new Boolean(true));
            }

        } else if (dActionType === "change"){
            let userSelectedVoice = Number(dActionOn);    //There is no need to change value from "String" to "Number", because index value can be either string someArray["1"] or number someArray[1]
            setSelectedVoice(userSelectedVoice);
        }


    }


    return (
        
        <div className="d-flex flex-column justify-content-center align-items-center cust-container">
            <div className="roboIconDiv">
                <i className="bi bi-robot"></i>
            </div>
            <button type="button" className="btn btn-primary" onClick={fetchDataFromApi} data-bs-toggle="modal" data-bs-target="#jokeModalId">Tell me a Joke</button>
            <Dialog jokeMsg={joke} onDialogAction={handleClicksOnDialog} stillSpeaking= {isStillSpeaking} voices= {voicesArray} jokeInfo={jokeInfo}/>
        </div>
        
    );
}

export default App;


