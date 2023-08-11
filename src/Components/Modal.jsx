import React from "react";
import Spinner from "./Spinner";



function Modal(props){


    function handleBtnClickOnModal(e){
        const aType = e.type;
        const aOn = e.target.ariaLabel; 

        props.onAction(aType, aOn);
    }


    function handleVoiceSelect(e){
        const aType = e.type;
        const aOn = e.target.value; 

        props.onAction(aType, aOn);
    }


    let jk = [];

  
    if (props.jkInfo){
        if (props.jkInfo.jokeType === "twopart"){
            jk = props.modalBodyContent.split(" [second part] ");
        } else {
            jk = [props.modalBodyContent];
        }
    }


    return(
        <div id={props.modalId} className="modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">

                        {
                            (props.modalFor === "jokeModal") ?
                                <>
                                    <h5>Random Joke</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleBtnClickOnModal} ></button>
                                </>
                                
                            :
                                <>
                                    <h5>Choose Accent</h5>
                                </>

                        }

                    </div>


                    <div className="modal-body">
                        
                        {
                            (props.modalFor === "jokeModal") ?
                            <>
                                {
                                    (! props.modalBodyContent) ? 
                                    
                                    <Spinner />
                                :
                                    <>
                                        {/* //flex > Listen btn & Options btn */}
                                    <div className="d-flex justify-content-between mb-2">
                                        <div className="joke-info">
                                            <span className="badge text-bg-info text-capitalize">{props.jkInfo.jokeCat}</span>
                                            <span className="badge text-bg-info text-capitalize ms-2">{props.jkInfo.jokeType}</span>
                                        </div>
                                        <div className="d-flex joke-play-options-btn">
                                            <button type="button" className="btn btn-primary btn-sm" aria-label="Play Joke" onClick={handleBtnClickOnModal} disabled={props.isSpeaking}>
                                                <i className="bi bi-volume-up-fill me-1"></i>
                                                Listen
                                            </button>
                                            <button type="button" className="btn btn-outline-primary btn-sm ms-2" data-bs-toggle="modal" data-bs-target={props.modalTargetId} aria-label="Voice Options" disabled={props.isSpeaking}>
                                                <i className="bi bi-gear-fill"></i>
                                            
                                            </button>
                                        </div>
                                    </div>
                                    {/* //p > joke */}
                                    <div className="card p-2 my-2">
                                    {
                                        jk.map(function(eachPart, index){
                                            if (index === 1){
                                                return <p  key={index} className="text-end">{eachPart}</p>
                                            } else {
                                                return <p key={index} className="text-start">{eachPart}</p>
                                            }

                                        })
                                    }
                                    </div>
                                    
                                    
                                    <p className="text-end fw-light source-info">Joke Source: <a href="https://sv443.net/jokeapi/v2/" target="_blank">Joke API</a></p>
                                    </>
                                }
                                
                            </>

                            :

                            <>
                                {/* //lable */}
                                <label htmlFor="voiceSelectElement" className="form-label">Available Options :</label>

                                {/* //select > options */}
                                <select id="voiceSelectElement" className="form-select" onChange={handleVoiceSelect}>
                                    {
                                        props.modalBodyContent.map(function(eachObj, index){
                                            return <option key={index} value={index} >{eachObj.name}</option>
                                        })
                                    }
                                
                                </select>

                                {/* //btn back to modal 1 (joke modal) */}
                                <button type="button" className="btn btn-primary my-3 float-end" data-bs-toggle="modal" data-bs-target={props.modalTargetId} aria-label="Back to Joke Modal" >
                                    <i className="bi bi-arrow-left me-1"></i>
                                    Back
                                </button>
                            </>
                        

                        }

                    </div>
                </div>
            </div>
        </div>
    );
}


export default Modal;

