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
            <h1>Practice Task of the Dots Estimation Experiment</h1>
            <div>
                <p>Get to know how the Dots Estimation Experiment works.</p>
                <Container>
                    <Row>
                        <ImportantInformation></ImportantInformation>
                    </Row>
                    <Row>
                        <Card>
                            <Card.Title>Dots Estimation Experiment</Card.Title>
                            <Card.Body >
                                <div>
                                    <div className="card-body-practise-intro">
                                        <ListGroup as="ol" variant="flush">
                                            <ListGroup.Item
                                                as="li"
                                            >
                                                Following you will have the chance to test the experiment by playing two practice rounds.
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                as="li"
                                            >
                                                Take your time to figure out how the user interface works and how you can interact with it.
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                as="li"
                                            >
                                                The practice game does not influence the payment.
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                    <div>
                                        <Button variant="primary" onClick={handleClickNext} >Go to the practice game</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default PractiseIntroduction;