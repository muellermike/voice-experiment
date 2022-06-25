import "./Practise.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import QuestionImage from "../../components/QuestionImage/QuestionImage";
import AnswerForm from "../../components/AnswerForm/AnswerForm";
import ExperimentDescription from "../../components/ExperimentDescription/ExperimentDescription";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ex1 from "../../assets/images/ex17.PNG";
import ex2 from "../../assets/images/ex19.PNG";

function Practise() {
    let navigate = useNavigate();

    const exercises = [{
        question: "Where are more dots?",
        image: ex1
    },{
        question: "Where are more dots?",
        image: ex2
    }];

    const [exercise, setExercise] = useState(exercises[0]);
    const [count, setCount] = useState(1);
    const globalState = useSelector(state => state.userInfoState);

    const handleSubmit = (recording) => {
        if(recording.recording && recording.timeToRecording) {
            // forget recording and show next practise-exercise
            if(count === (exercises.length - 1)) {
                setExercise(exercises[0]);
                setCount(0);
            } else {
                setExercise(exercises[count + 1]);
                setCount(count + 1);
            }
        } else {
            alert("you shall not pass");
        }
    }

    const startExperiment = () => {
        // navigate to the experiment
        navigate("/" + globalState.experimentId + "/exercise")
    }

    // Daten anzeigen
    return (
        <div>
            <h1>Practise Game</h1>
            <Container>
                <Row className="Container-Row">
                    <ExperimentDescription></ExperimentDescription>
                </Row>
                <Row className="Container-Row">
                    <Col xs={12} sm={12} md={7}>
                        <QuestionImage question={exercise.question} image={exercise.image} />
                    </Col>
                    <Col className="Container-Col">
                        <div className="Answer-Part">
                            <p>You're in the practise mode. Start the experiment game below. </p>
                            <AnswerForm onSubmit={handleSubmit} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    You can keep going submitting those practise answers as long as you like. As soon as you hit the button below, the dots game as the experiment starts.
                    <Button variant="primary" onClick={startExperiment}>Start the experiment</Button>
                </Row>
            </Container>         
        </div>
    )
}

export default Practise;