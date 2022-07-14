import React from "react";
import './AudioInput.css';
import { Button } from "react-bootstrap";
import { HiOutlineMicrophone, HiOutlineStop, HiOutlineBadgeCheck } from "react-icons/hi";
import { Outlet } from 'react-router-dom';

/*
*   Functionality implemented as: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
*   https://github.com/Matheswaaran/react-mp3-audio-recording/blob/master/src/App.js
*/
class AudioInput extends React.Component {
    constructor(props){
        super(props);

        // set basic state values
        this.state = {
            isRecording: false,
            isBlocked: false,
            startTime: '',
            endTime: ''
        };
        this.mediaRecorder = undefined;
        this.audioBlob = undefined;
        this.audioBase64 = "";

        // bind methods to the current state
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.playBlob = this.playBlob.bind(this);
        this.checkAudioPermission = this.checkAudioPermission.bind(this);
    }

    /*
    *   Start recording the audio when the user has the permission to do so.
    *   Otherwise ask for permission again.
    */
    startRecording() {
        if (this.state.isBlocked) {
            console.log('Permission Denied');
            this.checkAudioPermission();
        } else {
            this.setState({ isRecording: true, endTime: new Date() });
            this.mediaRecorder.start();
            console.log("Recording started");
        }
    }

    /*
    *   Stop recording and store blob into URL in current state
    */
    async stopRecording() {
        this.mediaRecorder.stop();
        console.log("Recording stopped.");
    }

    /*
    *   check whether the user has the permission to record audio in browser
    */
    checkAudioPermission() {
        // check if the permission for the microphone is allowed in the browser
        let ac = [];

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                console.log("Permission Granted");
                this.mediaRecorder = new MediaRecorder(stream);
                ac = [];

                /*
                ** Push recorded data into a chunk array
                */
                this.mediaRecorder.ondataavailable = function(e) {
                    ac.push(e.data);
                };

                /*
                ** store all information into the state and call prop methods from parent
                */
                const storeAllInformation = (base64Audio, blobOfAudio, isRecordingState, setAudioRecordingValue) => {
                    this.setState({isRecording: isRecordingState, blob: blobOfAudio, base64String: base64Audio});
                    this.props.setAudioRecording(setAudioRecordingValue);
                    this.props.setValue(base64Audio, this.state.endTime - this.state.startTime);
                };

                /*
                ** handle stop recording click -> bring chunks into audio/wav blob and convert it to base64 string
                */
                this.mediaRecorder.onstop = function(e) {
                    // create blob of the chunk array as audio/wav
                    this.audioBlob = new Blob(ac, { type: "audio/wav" });
                    // clear chunk array for next recording
                    ac = [];

                    let reader = new FileReader();
                    reader.readAsDataURL(this.audioBlob);
                    reader.onloadend = () => {
                        this.audioBase64 = reader.result;
                        storeAllInformation(this.audioBase64, this.audioBlob, false, true);
                    };
                };

                this.setState({ isBlocked: false });
            })
            .catch(() => {
                console.log("Permission Denied");
                this.setState({ isBlocked: true });
            });
    }
    
    /*
    *   Run steps after component is mounted:
    *   get permission to record audio in browser
    */
    componentDidMount() {
        // check audio recording permission
        this.checkAudioPermission();
        this.setState( {startTime: new Date()});
    }

    /*
    ** On component unmount all open stream tracks are stopped because mediaRecorder is not used anymore
    */
    componentWillUnmount() {
        // stop all mediarecord stream tracks.
        if(this.mediaRecorder && this.mediaRecorder.stream) {
            this.mediaRecorder.stream.getTracks().forEach( track => track.stop());
        }
    }

    /*
    *   Play sound recorded before (only if there is a base64 audio string)
    */
    playBlob() {
        if(this.state.base64String) {
            let tmp = new Audio(this.state.base64String);
            tmp.play();
        }
        return "";
    }

    /*
    *   Render buttons which show the recording and pause icon
    */
    render(){
        return (
            <div>
                { !this.state.isRecording && !this.props.isRecorded ? 
                    <div><Button variant="success" className="Mic-button" onClick={this.startRecording}><HiOutlineMicrophone size={"2em"} /> </Button> <p>Start recording with this button.</p></div> :
                this.state.isRecording ? 
                    <div><Button variant="danger" className="Mic-button" onClick={this.stopRecording}><HiOutlineStop size={"2em"} /> </Button> <p>Stop recording with this button.</p></div> :
                this.props.isRecorded ? <Button disabled variant="success"><HiOutlineBadgeCheck size={"2em"} /> successfully recorded</Button> : "" }
                { this.state.base64String && this.props.showPlayAudio ?  <Button onClick={this.playBlob}>play audio</Button> : ""}
                <Outlet />
            </div>
          );
    }
  
}

export default AudioInput;
