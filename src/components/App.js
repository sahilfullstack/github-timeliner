import * as React from 'react';
import { Timeline } from './timeline/timeline';
import { 
          Button, 
          InputGroup, 
          FormControl, 
          Container,
          Jumbotron,
          Card,
          Row,
          Col,
          Figure,
          Alert,
          Toast
        } from 'react-bootstrap';

export function App({ initialData }) {
  let DEFAULT_NAME = "Sahil Sarpal";
  let DEFAULT_IMAGE = "https://avatars2.githubusercontent.com/u/44086298?v=4";
  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [user_data, setUserData] = React.useState({});
  const [suggested_profile, setSuggestedProfile] = React.useState({img:DEFAULT_IMAGE, name: DEFAULT_NAME});
  const [alert, setAlertShow] = React.useState({status: false});

  var checkForErrors = (response) => {
    if(response.status == 404 || response.status == 403) {
      setAlertShow({
        status: true,
        statusText: response.statusText
      })
    }
  }

  var getGitubStuff = () => {
    let username = document.getElementById("input-username").value;
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        checkForErrors(response);
        return response.json();
      })
      .then(data => {
        setUserData(data)
      })
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setCount(count+1)
      })
  }

  var getGitubSuggestion = (username) => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if(response.staus == 404) {
          setSuggestedProfile({img:DEFAULT_IMAGE, name: DEFAULT_NAME});
        }
        return response.json()
      })
      .then(data => {
        let profile ={img:DEFAULT_IMAGE, name: DEFAULT_NAME};
        if(data) {
          profile = {
            img: data.avatar_url,
            name: data.name
          };      
        }
        setSuggestedProfile(profile);
      })
      .catch(error => {
        setSuggestedProfile({img:DEFAULT_IMAGE, name: DEFAULT_NAME});
      })
  }

  return (
    <React.Fragment>
      {
         alert.status && <Alert variant="danger" onClose={() => setAlertShow({status: false})} dismissible>
         <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
         <p>
          { alert.statusText }
         </p>
         </Alert>
         
      }    
       <Container >
        <Jumbotron>
          <Container>
            <Row>
              <Col xs={12} md={10}>
                <h1>{initialData.appName}</h1>
                <InputGroup>
                  <FormControl
                    placeholder="Github Username"
                    aria-label="Github Username"
                    aria-describedby="basic-addon"
                    id="input-username"
                    onChange={(event)=>{
                      if(event && event.target) {
                        getGitubSuggestion(event.target.value);
                      }
                    }}
                    onKeyDown={(event)=>{
                      if(event.key == "Enter") {
                        getGitubStuff();
                      }
                    }}
                  />
                  <InputGroup.Append>
                    <Button 
                    onClick={()=>{
                      getGitubStuff();
                    }}
                    variant="outline-secondary">Button</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
              <Col xs={8} md={2}>
              <Card>
                <Card.Img variant="top" src={suggested_profile.img} />
                <Card.Body>
                  <Card.Title>{suggested_profile.name}</Card.Title>                 
                </Card.Body>
              </Card>  
              </Col>
            </Row>
          </Container>      
        </Jumbotron>
      </Container>
      
      {
    data.length > 0 && user_data &&

        <Container >
  <Row>
    <Col>
    <Figure>
      <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={user_data.avatar_url}
      />
      <Figure.Caption>
      <p>{user_data.name}</p>
      <p>{user_data.bio}</p>
      </Figure.Caption>
    </Figure>
    </Col>
    <Col>
      <Card>
        <Card.Header>Timeline</Card.Header>
        <Card.Body>
          <Timeline repos={data} />
          <footer className="blockquote-footer">
              powered by <cite title="Sahil Sarpal">Sahil Sarpal</cite>
            </footer>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
       

      } 
    </ React.Fragment>
  );
}
