import "./Exercise.css";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import QuestionImage from "../../components/QuestionImage/QuestionImage";
import AnswerForm from "../../components/AnswerForm/AnswerForm";
import ExperimentDescription from "../../components/ExperimentDescription/ExperimentDescription";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ImportantInformation from "../../components/ImportantInformation/ImportantInformation";

function Exercise() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { experimentId } = useParams();
    const [exercise, setExercise] = useState({});
    const [startTime, setStartTime] = useState(new Date());
    const [count, setCount] = useState(1);
    const globalState = useSelector(state => state.userInfoState);
    const imageState = useSelector(state => state.imageState);

    // lade die nächste "Aufgabe" über das API

    useEffect(() => {

        const requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE }
        };

        // load exercise data from the API the first time
        fetch(process.env.REACT_APP_API_BASE_URL + '/experiments/' + experimentId + '/' + globalState.userId + '/exercises/next', requestOptions)
        .then(response => {
            if(response.status !== 200) {
                throw new Error("Server Error");
            } else if(response.status === 204) {
                navigate("/thankyou");
            }

            return response.json();
        })
        .then(data => {
            setExercise(data);
            setStartTime(new Date());
        })
        .catch(function(err) {
            navigate("/error");
        });
    }, [experimentId, globalState.userId, navigate, dispatch]);

    const handleSubmit = (recording) => {
        if(recording.recording && recording.timeToRecording) {
            // POST recording
            const requestOptions = {
                mode: 'cors',
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE },
                body: JSON.stringify({ recording: recording.recording, timeToRecording: recording.endTime - startTime, userId: globalState.userId, experimentId: parseInt(experimentId), exerciseId: parseInt(exercise.id) })
            };
            fetch(process.env.REACT_APP_API_BASE_URL + '/recordings', requestOptions)
            .then(response => {
                if(response.status !== 200) {
                    throw new Error("Server Error");
                }

                return response.json();
            })
            .then(data =>  {
                const requestOptions = {
                    mode: 'cors',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE }
                };
                
                // load next exercise data from the api
                fetch(process.env.REACT_APP_API_BASE_URL + '/experiments/' + experimentId + '/' + globalState.userId + '/exercises/next', requestOptions)
                .then(response => {
                    if (response.status === 204) {
                        navigate("/thankyou");
                    } else if (response.status !== 200) {
                        throw new Error("Server Error");
                    }

                    return response.json();
                })
                .then(data => {
                    setExercise(data);
                    setStartTime(new Date());
                    setCount(count + 1);
                });
            })
            .catch(function(err) {
                navigate("/error");
            });
        } else {
            alert("you shall not pass");
        }
    }

    // Daten anzeigen
    return (
        <div>
            <h1>Dots Estimation Experiment</h1>
            <Container>
                <Row>
                    <ImportantInformation></ImportantInformation>
                    <ExperimentDescription></ExperimentDescription>
                </Row>
                <Row>
                    <Col>
                        <ProgressBar now={(count / process.env.REACT_APP_NUM_EX) * 100} label={(count / process.env.REACT_APP_NUM_EX) * 100 + " %"}></ProgressBar>
                    </Col>
                </Row>
                <Row className="Container-Row">
                    <Col xs={12} sm={12} md={7}>
                        <QuestionImage question={exercise.question} image={"data:" + exercise.mimeType + ";base64, " + exercise.encodedString} imageDuration={imageState.imageTime} />
                    </Col>
                    <Col className="Container-Col">
                        <AnswerForm onSubmit={handleSubmit} />
                    </Col>
                </Row>
            </Container>        
        </div>
    )
}

export default Exercise;