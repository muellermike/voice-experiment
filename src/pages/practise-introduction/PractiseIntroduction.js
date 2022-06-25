import "./PractiseIntroduction.css";
import { Card, Container, Row, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ImportantInformation from "../../components/ImportantInformation/ImportantInformation";

function PractiseIntroduction() {
    let navigate = useNavigate();

    const imageState = useSelector(state => state.imageState);

    const handleClickNext = (event) => {
        event.preventDefault();
        navigate("/practise");
    }

    /*
    *   Show introduction to the practise part.
    */
    return (
        <div>
            <h1>Practise Task of the Dots Experiment</h1>
            <div>
                <p>Get to know how the Dots Experiment works</p>
                <Container>
                    <Row>
                        <ImportantInformation></ImportantInformation>
                    </Row>
                    <Row>
                        <Card>
                            <Card.Title>Dots Game</Card.Title>
                            <Card.Body>
                                <p>In the next step you have the chance to test the experiment. You will see the dots game almost as it is during the experiemnt. The only difference is that there are more hints how the user interface works. Take your time to figure out how the user interface works and how you can interact with it. The practise game does not influence the payment.</p>
                                <ListGroup as="ol" numbered>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold">Dots Image on the left side</div>
                                        There is a dots image shown on the left side. Look at it first, as <b>it is only shown {imageState.imageTime / 1000} seconds</b>. After this time, it is replaced with an empty image. Make sure to look at the image and decide what to answer.
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold">Record your answer on the right side</div>
                                        On the right side, you see the answer opportunity. Click on the green button with the microphone icon in it. This starts the recording. <b>Then you can state your answer</b>. While recording, the button is yellow and shows a pause icon. <b>To stop the recording press the yellow button.</b>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold">Submit answer</div>
                                        Once you have recorded your answer, you can submit the answer <b>by clicking on the blue button on the bottom.</b>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold">Next exercise</div>
                                        <b>After clicking the submit button, the next exercise is shown immediately</b>. Start again with step 1.
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                                <br /><p>Once you are ready, <b>scroll down to start the experiment</b>.</p>
                                <p>Please note once again, that you are being paid according to your stated answer even if your answer was wrong.</p>
                                <Button variant="primary" onClick={handleClickNext} >Go to the practise game</Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default PractiseIntroduction;