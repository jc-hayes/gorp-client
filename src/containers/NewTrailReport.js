import React, { useRef, useState, useEffect } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewTrailReport.css";
import API from "@aws-amplify/api";

export default function NewNote(props) {
//const file = useRef(null);
  const [trailName, setTrailName] = useState("");
  const [peakElevation, setPeakElevation] = useState("");
  const [trailDuration, setTrailDuration] = useState("");
  const [roundtripLength, setRoundtripLength] = useState("");
  const [elevationGain, setElevationGain] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return trailName.length > 0;
  }

//   function handleFileChange(event) {
//     file.current = event.target.files[0];
//   }

async function handleSubmit(event) {
  event.preventDefault();

  // if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
  //   alert(
  //     `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
  //       1000000} MB.`
  //   );
  //   return;
  // }

  setIsLoading(true);

  try {
    await createTrailReport({ trailName, peakElevation, trailDuration, roundtripLength, elevationGain, description });
    props.history.push("/");
  } catch (e) {
    alert(e);
    setIsLoading(false);
  }
}

function createTrailReport(trailReport) {
  return API.post("trails", "/trails", {
    body: trailReport
  });
}

  return (
    <div className="NewNote">
      <div className="Home">
        <div className="lander">
            <h1>GORP</h1>
            <p>All Fields Required</p>
        </div>
      </div> 
      <form onSubmit={handleSubmit}>
      <FormGroup controlId="trailName">
          <FormControl
            value={trailName}
            placeholder="Name"
            onChange={e => setTrailName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="peakElevation">
          <FormControl
            value={peakElevation}
            placeholder="Peak Elevation"
            onChange={e => setPeakElevation(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="trailDuration">
          <FormControl
            value={trailDuration}
            placeholder="Trail Duration"
            onChange={e => setTrailDuration(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="elevationGain">
          <FormControl
            value={elevationGain}
            placeholder="Elevation Gain"
            onChange={e => setElevationGain(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="roundtripLength">
          <FormControl
            value={roundtripLength}
            placeholder="Roundtrip Length"
            onChange={e => setRoundtripLength(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="description">
          <FormControl
            value={description}
            placeholder="Description"
            componentClass="textarea"
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
        {/* <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup> */}
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}