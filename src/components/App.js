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
          Figure
        } from 'react-bootstrap';


export function App({ initialData }) {
  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState({});
  const [user_data, setUserData] = React.useState({});
  let myInput = null;
  var getGitubStuff = () => {
    let username = document.getElementById("input-username").value;
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
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

  return (
    <div>

       <Container >
        <Jumbotron>
          <h1>{initialData.appName}</h1>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Github Username"
              aria-label="Github Username"
              aria-describedby="basic-addon"
              id="input-username"
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
        </Jumbotron>
      </Container>
      
      {
        (count > 0) && 

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
    </div>
  );
}
