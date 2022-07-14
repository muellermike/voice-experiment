import "./AnswerForm.css";
import { ButtonGroup, ToggleButton, Button, Form, Spinner } from "react-bootstrap";
import AudioInput from "../AudioInput/AudioInput";
import { useState } from "react";

function AnswerForm(props) {
    const [isRecorded, setRecorded] = useState(false);
    const [recording, setRecording] = useState({});

    const answers = [
        { value: "left", name: "There are more dots on the left side.", payout: "(payout 0.5 Cents)" },
        { value: "right", name: "There are more dots on the right side.", payout: "(payout 5 Cents)" }
    ];
    
    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(recording);
        setRecorded(false);
    }

    const setAudioRecording = (value) => {
        setRecorded(value);    
    }

    const handleExerciseRecording = (recording, timeToRecording) => {
        setRecording({
            "recording": recording,
            "timeToRecording": timeToRecording,
            "endTime": new Date()
        });
    }

    // show form to input audio file
    return (
        <div>
            <Form className="vertical-center">
                <Form.Group className="mb-3" controlId="formBasicAudio">
                    <Form.Label>
                        Please answer the question with an audio input by using either one of the two sentences (only those words written in <b>bold</b>).<br />
                        <ButtonGroup>
                            {answers.map((a, idx) => (
                            <ToggleButton
                                required
                                disabled={true}
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={'outline-success'}
                                name="radio"
                                value={a.value}
                            >
                                <b>{a.name}</b> <br /> {a.payout}
                            </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Form.Label><br />
                    <AudioInput setAudioRecording={setAudioRecording} isRecorded={isRecorded} setValue={handleExerciseRecording}></AudioInput>
                </Form.Group>
                <Button variant="primary" disabled={!isRecorded} type="submit" onClick={handleSubmit}>
                    { false ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    /> : '' }
                    Play next round
                </Button>
            </Form>
            
        </div>
    )
}

export default AnswerForm;