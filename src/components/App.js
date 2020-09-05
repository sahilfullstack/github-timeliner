import * as React from 'react';
import { Timeline } from './timeline/timeline';
import { Button, InputGroup, FormControl, Container,Jumbotron } from 'react-bootstrap';


export function App({ initialData }) {
  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState({});
  let myInput = null;
  var getGitubStuff = () => {
    let username = document.getElementById("input-username").value;
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setCount(count+1)
      })
  }

  return (
    <div>
       <Container className="p-3">
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
        (count > 0) && <Timeline repos={data} />
      } 
    </div>
  );
}
