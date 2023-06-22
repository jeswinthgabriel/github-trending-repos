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
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
    }
    return error;
  }
);
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
  const [datefilter, setDateFilter] = useState('');
  const navigate = useNavigate();
  var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  var firstDay = new Date(y, m, 1).toISOString().substring(0, 10);
  var lastDay = new Date(y, m + 1, 0).toISOString().substring(0, 10);
var firstdayweek = new Date(date.setDate(date.getDate() - date.getDay())).toISOString().substring(0, 10);
var lastdayweek = new Date(date.setDate(date.getDate() - date.getDay()+6)).toISOString().substring(0, 10);
  const thisMonth = `-created:<=${firstDay} -created:>=${lastDay}`;
  const thisWeek = `-created:<=${firstdayweek} -created:>=${lastdayweek}`;
  const today = `-created:<=${new Date(new Date().setDate(new Date().getDate()-1)).toISOString().substring(0, 10)}`;
  console.log(thisWeek);
  useEffect(() => {
    const getRepositories = async () => {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=created${datefilter}+language:${selectedLanguage}&sort=stars&order=desc`,
        config
      );
      setStatus(response.status);
      if (response.status == 200) {
        console.log(status);
        setRepositories(response.data.items);
      } else navigate("/login");
    };

    getRepositories();
    //console.log(repositories);
  }, [selectedLanguage,datefilter]);
  useEffect(() => {
    const getLanguages = async () => {
      const response = await axios.get("https://api.gitterapp.com/languages");
      setLanguages(response.data);
    };

    getLanguages();
    console.log(languages);
  }, []);

  return repositories.length > 1 ? (
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
                <Button variant="primary">Repositories</Button>                
                <Dropdown className="div-inline">
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
                <Dropdown className="div-inline">

                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown"
                  > Date Filter</Dropdown.Toggle>

                  <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>setDateFilter(today)}>Today</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setDateFilter(thisWeek)}>This Week</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setDateFilter(thisMonth)}>This Month</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                {repositories.map((rep) => (
                  <div key={rep.full_name} className="border-bottom text-start">
                    <Repositories data={rep} />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    "No Results found"
  );
};

export default ReposPage;
