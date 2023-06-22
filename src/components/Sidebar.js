import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Sidebar = ({ repoInfo }) => {
  return (
    <>
      {" "}
      <Container>
        <Row>
          <Col>
            <h3>About</h3>
            {repoInfo.description}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Sidebar;
