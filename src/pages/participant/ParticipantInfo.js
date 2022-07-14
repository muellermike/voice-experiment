import { Col, Form, Row, Button, Card } from "react-bootstrap";
import AudioInput from "../../components/AudioInput/AudioInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { storeExperimentId, storeUserId } from '../../actions';
import "./ParticipantInfo.css";

// redux: https://levelup.gitconnected.com/react-redux-hooks-useselector-and-usedispatch-f7d8c7f75cdd
function ParticipantInfo() {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMicCheckRecorded, setMicCheckRecorded] = useState(false);
    const [isRuleAccepted, setRuleAccepted] = useState(false);
    const [micCheckRecording, setMicCheckRecording] = useState(null);
    const globalState = useSelector(state => state.userInfoState);
    const imageState = useSelector(state => state.imageState);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(micCheckRecording) {
            // POST user and recordings
            const requestOptions = {
                mode: 'cors',
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE },
                body: JSON.stringify({ id: globalState.externalUserId })
            };
            fetch(process.env.REACT_APP_API_BASE_URL + '/users', requestOptions)
            .then(response => {
                if(response.status !== 200) {
                    throw new Error("Server Error");
                }

                return response.json();
            })
            .then(data =>  {
                dispatch(storeUserId(data));
                requestOptions.body = JSON.stringify({ user: data, start: new Date().toISOString(), imageTime: imageState.imageTime});
                fetch(process.env.REACT_APP_API_BASE_URL + '/experiments', requestOptions)
                .then(response => {
                    if(response.status !== 200) {
                        throw new Error("Server Error");
                    }

                    return response.json();
                })
                .then(data => {
                    dispatch(storeExperimentId(data))
                    navigate("/practise-intro");
                });
            })
            .catch(function(err) {
                navigate("/error");
            });
        } else {
            alert("you shall not pass");
        }
    }

    const handleMicCheckRecording = (recording, timeToRecording) => {
        setMicCheckRecording({
            timeToRecording: timeToRecording,
            recording: recording
        });
    }

    const setMicCheckAudioRecording = (value) => {
        setMicCheckRecorded(value);
    }

    const toggleAcceptRule = () => {
        setRuleAccepted(!isRuleAccepted);
    };

    return (
        <div>
            <h2>Microphone Check</h2><br />
            <p>
                To check the audio for the experiment please test below.
                All data is being recorded anonymously. We never have the possibility to find out who you are.
                Answer the questions with an audio input. Please check your surrounding.
            </p>
            <Card>
                <Form className="form-container">
                    <Row>
                        <Form.Group className=" no-padding" controlId="formHorizontalMicCheck">
                            <Card className="participant-card">
                                <Card.Header as="h5">Mic Check</Card.Header>
                                <Card.Body>
                                    <Card.Title>Test your microphone. </Card.Title>
                                    <Card.Text>
                                        You can test the microphone for example by saying <b>"I'm ready to start the dots estimation experiment"</b>. After recording, you can listen to your audio.
                                        Please check that there aren't any surrounding sounds and that you are clearly hearable in the audio.
                                    </Card.Text>
                                    <AudioInput setAudioRecording={setMicCheckAudioRecording} showPlayAudio setValue={handleMicCheckRecording}></AudioInput>
                                    <div className="mb-3 checkbox-understand-group">
                                        <Form.Check 
                                            inline
                                            type="checkbox"
                                            id={'checkbox-understand'}
                                            label={"I confirm that the audio works and I'm clearly hearable and understandable. I hereby certify that if my records are not clearly understandable, I cannot be paid."}
                                            checked={isRuleAccepted}
                                            onChange={toggleAcceptRule}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Form.Group>
                    </Row>
                    <Row className="button-row">
                        <Col>
                            <Button variant="primary" disabled={!(isMicCheckRecorded && isRuleAccepted)} type="submit" onClick={handleSubmit}>
                                Go to practice game
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    )
}

export default ParticipantInfo;