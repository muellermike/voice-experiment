import "./ImportantInformation.css";
import { Alert } from "react-bootstrap";

function ImportantInformation() {
    // show important information about the experiment
    return (
        <div>
            <Alert variant="warning" className="important-information">
                <b>Don't</b> ever <b>reload</b> the page <b>nor use the back button</b> of your browser. You are carried throughout the whole experiment process.
            </Alert>
        </div>
    )
}

export default ImportantInformation;