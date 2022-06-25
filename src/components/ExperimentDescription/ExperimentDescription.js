import "./ExperimentDescription.css";
import { Alert } from "react-bootstrap";

function ExperimentDescription() {
    // show the rules of the experiment in an accordion
    return (
        <div>
            <Alert key="info" variant="info" className="Experiment-description">
                You have to solve the task by answering whether there are more dots on the right or left side.
                Therefore, please answer in a sentence such as "There are more dots on the right / left side".
                Note that we are going to pay according to your mentioned result and not whether the result was correct.
                In other words, when the true result was right but you stated left we pay you the amount for the answer left.
            </Alert>
        </div>
    )
}

export default ExperimentDescription;