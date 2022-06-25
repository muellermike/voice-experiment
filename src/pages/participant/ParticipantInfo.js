import { Col, Form, Row, Button, Spinner, Card } from "react-bootstrap";
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
    const [isGenderRecorded, setGenderRecorded] = useState(false);
    const [isAgeRecorded, setAgeRecorded] = useState(false);
    const [isMicCheckRecorded, setMicCheckRecorded] = useState(false);
    const [isRuleAccepted, setRuleAccepted] = useState(false);
    const [ageRecording, setAgeRecording] = useState(null);
    const [genderRecording, setGenderRecording] = useState(null);
    const [micCheckRecording, setMicCheckRecording] = useState(null);
    const globalState = useSelector(state => state.userInfoState);
    const imageState = useSelector(state => state.imageState);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(genderRecording  && ageRecording) {
            // POST user and recordings
            const requestOptions = {
                mode: 'cors',
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE },
                body: JSON.stringify({ id: globalState.externalUserId, age: ageRecording, gender: genderRecording })
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
                //.then(data => navigate("/" + data + "/exercise"));
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

    const handleGenderRecording = (recording, timeToRecording) => {
        setGenderRecording({
            timeToRecording: timeToRecording,
            recording: recording
        });
    }

    const handleAgeRecording = (recording, timeToRecording) => {
        setAgeRecording({
            timeToRecording: timeToRecording,
            recording: recording
        });
    }

    const handleMicCheckRecording = (recording, timeToRecording) => {
        setMicCheckRecording({
            timeToRecording: timeToRecording,
            recording: recording
        });
    }

    const setGenderAudioRecording = (value) => {
        setGenderRecorded(value);
    }

    const setAgeAudioRecording = (value) => {
        setAgeRecorded(value);
    }

    const setMicCheckAudioRecording = (value) => {
        setMicCheckRecorded(value);
    }

    const toggleAcceptRule = () => {
        setRuleAccepted(!isRuleAccepted);
    };

    // check cards (Header and Footer): https://react-bootstrap.github.io/components/cards/#header-and-footer
    // show data to receive participant information
    return (
        <div>
            <h2>Microphone Check and Participant Information</h2><br />
            <p>
                To check the audio for the experiment please test below. Additionally, please provide information about yourself. 
                All data is being recorded anonymously. We never have the possibility to find out who you are.
                Please answer the question with an audio input. Please check your surrounding.
            </p>
            <Card>
                <Form className="form-container">
                    <Row>
                        <Form.Group className=" no-padding" controlId="formHorizontalMicCheck">
                            <Card className="participant-card">
                                <Card.Header as="h5">Mic Check</Card.Header>
                                <Card.Body>
                                    <Card.Title>Please test your microphone. </Card.Title>
                                    <Card.Text>
                                        You can test the microphone for example by saying <b>"I'm ready to start the experiment game"</b>. After recording, you can listen to your audio.
                                        Please check that there aren't any surrounding sounds and that you are clearly hearable in the audio.
                                    </Card.Text>
                                    <AudioInput setAudioRecording={setMicCheckAudioRecording} showPlayAudio setValue={handleMicCheckRecording}></AudioInput>
                                    <div key={'checkbox'} className="mb-3">
                                        <Form.Check 
                                            type="checkbox"
                                            id={'checkbox-understand'}
                                            label={"I confirm that the audio works and I'm clearly hearable and understandable. I hereby certify that if my records are not clearly understandable, I cannot be paid."}
                                            checked={isRuleAccepted}
                                            onClick={toggleAcceptRule}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Form.Group>
                        <Form.Group className=" no-padding" controlId="formHorizontalGender">
                        {(micCheckRecording) ? 
                            <Card className="participant-card">
                                <Card.Header as="h5">Gender</Card.Header>
                                <Card.Body>
                                    <Card.Title>Provide your gender through speech</Card.Title>
                                    <Card.Text>
                                        Please answer with a sentence like: <b>"I am a female / male / diverse"</b>.
                                    </Card.Text>
                                    <AudioInput setAudioRecording={setGenderAudioRecording} setValue={handleGenderRecording}></AudioInput>
                                </Card.Body>
                            </Card> : ""}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formHorizontalAge">
                            {(micCheckRecording && genderRecording) ? 
                            <Card className="participant-card">
                                <Card.Header as="h5">Age</Card.Header>
                                <Card.Body>
                                    <Card.Title>Provide your age through speech</Card.Title>
                                    <Card.Text>
                                        Please answer with a sentence like: <b>"I am x years old"</b>. Please replace 'x' with your current age.
                                    </Card.Text>
                                    <AudioInput setAudioRecording={setAgeAudioRecording} setValue={handleAgeRecording}></AudioInput>
                                </Card.Body>
                            </Card> : ""}
                        </Form.Group>
                    </Row>
                    <Row className="button-row">
                        <Col>
                            <Button variant="primary" disabled={!(isMicCheckRecorded && isGenderRecorded && isAgeRecorded && isRuleAccepted)} type="submit" onClick={handleSubmit}>
                                { false ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                /> : '' }
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    )
}

export default ParticipantInfo;