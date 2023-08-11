import React from "react";
import Modal from "./Modal";


function Dialog(props){

    //to pass action performed on Modal to App
    function handleActionOnModal(actionType, actionOn){
        props.onDialogAction(actionType, actionOn);
    }



    return (
        <>
            <Modal modalId= "jokeModalId" modalFor="jokeModal" modalTargetId="#voiceOptionsModalId" modalBodyContent={props.jokeMsg} onAction={handleActionOnModal} isSpeaking= {props.stillSpeaking} jkInfo={props.jokeInfo}/>
            <Modal modalId= "voiceOptionsModalId" modalFor="voice options" modalTargetId="#jokeModalId" modalBodyContent={props.voices} onAction={handleActionOnModal} />
        </>
    );
}

export default Dialog;





