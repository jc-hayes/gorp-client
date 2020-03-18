import React, { useRef, useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Storage } from "@aws-amplify/storage";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import "./Trails.css";

export default function Trails(props) {

  // const file = useRef(null);

  const [trail, setTrail] = useState(null);
  const [trailName, setTrailName] = useState("");
  const [peakElevation, setPeakElevation] = useState("");
  const [trailDuration, setTrailDuration] = useState("");
  const [roundtripLength, setRoundtripLength] = useState("");
  const [elevationGain, setElevationGain] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
    
  useEffect(() => {

    function loadTrail() {
      return API.get("trails", `/trails/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const trail = await loadTrail();
        const { trailName, peakElevation, trailDuration, roundtripLength, elevationGain, description } = trail;

        // if (attachment) {
        //   note.attachmentURL = await Storage.vault.get(attachment);
        // }

        setTrailName(trailName);
        setPeakElevation(peakElevation);
        setTrailDuration(trailDuration);
        setRoundtripLength(roundtripLength);
        setElevationGain(elevationGain);
        setDescription(description);
        setTrail(trail);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return trailName.length > 0;
  }

  // For file upload
  // function formatFilename(str) {
  //   return str.replace(/^\w+-/, "");
  // }

  function saveTrail(trail) {
    console.log(trail);
    return API.put("trails", `/trails/${props.match.params.id}`, {
      body: trail
    });
  }

  async function handleSubmit(event) {
    // For file upload
    // let attachment;

    event.preventDefault();

    // For file upload
    // if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
    //   alert(
    //     `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
    //       1000000} MB.`
    //   );
    //   return;
    // }

    setIsLoading(true);  

    try {
      // For file upload
      // if (file.current) {
      //   attachment = await s3Upload(file.current);
      // }

      await saveTrail({
        trailName,
        peakElevation,
        trailDuration,
        roundtripLength,
        elevationGain,
        description
      });
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function deleteTrail() {
    return API.del("trails", `/trails/${props.match.params.id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this trail report?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteTrail();
      props.history.push("/");
    } catch(e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  return(
    <div className="Trails">
      <Link to="/">{"\u2190"}Back</Link>
      {trail && (
        <form onSubmit={handleSubmit}>
          <ControlLabel>Name</ControlLabel>
          <FormGroup controlId="trailName">
            <FormControl
              value={trailName}
              placeholder="Name"
              onChange={e => setTrailName(e.target.value)}
            />
          </FormGroup>
          <ControlLabel>Peak Elevation (ft)</ControlLabel>
          <FormGroup controlId="peakElevation">
            <FormControl
              value={peakElevation}
              placeholder="Peak Elevation"
              onChange={e => setPeakElevation(e.target.value)}
            />
          </FormGroup>
          <ControlLabel>Duration (hrs)</ControlLabel>
          <FormGroup controlId="trailDuration">
            <FormControl
              value={trailDuration}
              placeholder="Trail Duration"
              onChange={e => setTrailDuration(e.target.value)}
            />
          </FormGroup>
          <ControlLabel>Roundtrip Length (mi)</ControlLabel>
          <FormGroup controlId="roundtripLength">
            <FormControl
              value={roundtripLength}
              placeholder="Roundtrip Length"
              onChange={e => setRoundtripLength(e.target.value)}
            />
          </FormGroup>
          <ControlLabel>Elevation Gain (ft)</ControlLabel>
          <FormGroup controlId="elevationGain">
            <FormControl
              value={elevationGain}
              placeholder="Elevation Gain"
              onChange={e => setElevationGain(e.target.value)}
            />
          </FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormGroup controlId="description">
            <FormControl
              value={description}
              placeholder="Description"
              componentClass="textarea"
              onChange={e => setDescription(e.target.value)}
            />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}