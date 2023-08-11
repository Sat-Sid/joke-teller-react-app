import {useState, useEffect } from "react";



function useGetArrayOfVoices(){

    const [voicesArray, setVoicesArray] = useState([]);

    useEffect(function(){
        const synth = window.speechSynthesis;

        //Note: "window.speechSynthesis load's after webpage has loaded"
        //Note: We have "onvoiceschanged on window.speechSynthesis" which will trigger when it is ready to fetch

        synth.addEventListener("voiceschanged", function(){
            const arrayOfVoices = synth.getVoices();

            setVoicesArray(arrayOfVoices);
        });

    }, []);

    return voicesArray;
}


function useSpeechSynthesis(jokeTxt, playJoke, seleVoice){

    const [stillSpeaking, setStillSpeaking] = useState(false);


    useEffect(function(){

        if (jokeTxt && playJoke){

            let utterance = new SpeechSynthesisUtterance(jokeTxt);
            const synth = window.speechSynthesis;

            utterance.voice = seleVoice;
 
            speechSynthesis.speak(utterance);

            //check still speaking
            setStillSpeaking(synth.speaking);

            //check speaking has finished
            utterance.addEventListener("end", function(){
                setStillSpeaking(false);
            });
        }


    }, [jokeTxt, playJoke]);

    return stillSpeaking;
    
}

export  {useSpeechSynthesis, useGetArrayOfVoices};