import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Repositories from "../components/Repositories";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
axios.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
  
 }
 return error;
});
const ReposPage = () => {
  const { token } = useSelector((state) => state.auth);
  let config = {
    headers: {
      Authorization: `token ${token}`,
    },
  };
  const [repositories, setRepositories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [searchLanguages, setSearchLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [languageInput, setLanguageInput] = useState();
  const [status, setStatus] = useState();
const navigate= useNavigate()

  useEffect(() => {
    const getRepositories = async () => {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=created+language:${selectedLanguage}&sort=stars&order=desc`,
        config
      );
      setStatus(response.status);
      if (response.status == 200) {
        console.log(status);
        setRepositories(response.data.items);
      }
      else(
        navigate("/login")
      )
    };

    getRepositories();
    //console.log(repositories);
  }, [selectedLanguage]);
  useEffect(() => {
    const getLanguages = async () => {
      const response = await axios.get("https://api.gitterapp.com/languages");
      setLanguages(response.data);
    };

    getLanguages();
    console.log(languages);
  }, []);

  return (
    repositories.length>1 ? (
      <>
        <Container fluid className="text-center bg-light border py-5">
          <h2>Trending</h2>
          <dic>See what the GitHub community is most excited about today.</dic>
        </Container>
        <Container className="mt-5">
          <Row className="justify-content-md-center text-start">
            <Col xs lg="10">
              <Card>
                <Card.Header>
                  <Button variant="primary">Repositories</Button>{" "}
                  <Button variant="light">Developers</Button>{" "}
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {selectedLanguage ? selectedLanguage : "Language"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Form.Label>Select a spoken language</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setLanguageInput(e.target.value);
                          const searcResult = languages.filter((f) =>
                            f.title
                              .toLowerCase()
                              .includes(e.target.value.toLowerCase())
                          );
                          setSearchLanguages(searcResult);
                        }}
                        type="text"
                      />

                      {languageInput === undefined
                        ? languages.map((lang) => {
                            return (
                              <Dropdown.Item
                                onClick={(e) => setSelectedLanguage(lang.title)}
                              >
                                {lang.title}
                              </Dropdown.Item>
                            );
                          })
                        : searchLanguages.map((lang) => {
                            return (
                              <Dropdown.Item
                                onClick={(e) => setSelectedLanguage(lang.title)}
                              >
                                {lang.title}
                              </Dropdown.Item>
                            );
                          })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
                <Card.Body>
                  {repositories.map((rep) => (
                    <div
                      key={rep.full_name}
                      className="border-bottom text-start"
                    >
                      <Repositories data={rep} />
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    ) : "Loading"
  );
};

export default ReposPage;
