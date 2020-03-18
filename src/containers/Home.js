import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import API from "@aws-amplify/api";
import "./Home.css";

export default function Home(props) {

  const [trails, setTrails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
							console.log('not authenticated');
        return;
      }

      try {
        const trails = await loadTrails();
        setTrails(trails);
      } catch (e) {
								console.log('onLoad ERROR ' + e.message);
        alert(e);
      }

      setIsLoading(false);
   	}

    onLoad();
		}, [props.isAuthenticated]);
		
		function loadTrails() {
			return API.get("trails", "/trails");
		}

  function renderTrailsList(trails) {
    return [{}].concat(trails).map((trail, i) =>
      i !== 0 ? (
      <LinkContainer key={trail.trailId} to={`/trails/${trail.trailId}`}>
        <ListGroupItem header={trail.trailName.trim().split("\n")[0]}>
          {"Created: " + new Date(trail.createdAt).toLocaleString()}
        </ListGroupItem>
      </LinkContainer>
      ) : (
      <LinkContainer key="new" to="/trails/new">
        <ListGroupItem>
          <h4>
            <b>{"\uFF0B"}</b> Create a new trail report
          </h4>
        </ListGroupItem>
      </LinkContainer>
      )
    );
	}

  function renderLander() {
    return (
      <div className="lander">
        <h1>GORP</h1>
        <p>Good Old Raisins and Peanuts (GORP) is a simple trail report app.</p>
        <LinkContainer to="/signup">
          <Link>Create Account</Link>
        </LinkContainer>
        <br></br>
        <br></br>
        <LinkContainer to="/signin">
          <Link>Sign In</Link>
        </LinkContainer>      
      </div>
    );
  }

  function renderTrails() {
    return (
      <div className="trails">
        <h3>Your Trail Reports</h3>
        <ListGroup>
          {!isLoading && renderTrailsList(trails)}
        </ListGroup>
      </div>
    );
  }
  return (
    <div className="Home">
      {props.isAuthenticated ? renderTrails() : renderLander()}
    </div>  
  );
}