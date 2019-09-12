import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useStyles from './styles'
import AutoSuggest from '../../components/AutoSuggest'

const Home = () => {
  const classes = useStyles();
  const [name, setName] = useState('')
  const LOAD_STATIONS = gql`
    query Station($name: String!) {
    search(searchTerm: $name){
      stations {
        name
      }
    }
  }
  `;
  
  const { loading, error, data } = useQuery(LOAD_STATIONS, {
    variables: { name },
    skip: !name,
    pollInterval: 250,
  });

  const handleChangeName = (nameText) => setName(nameText)

  const suggestions = data && data.search && data.search.stations ? data.search.stations
    .map(suggestion => ({
          value: suggestion.name,
          label: suggestion.name,
        }))
  : []

  const Container = ({children}) => (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h1>Pick a Station:</h1>
        {children}
      </Paper>
    </div>
  )

  if(loading){
    return <Container>
      <AutoSuggest suggestions={[]} handleChangeName={handleChangeName}/>
    </Container>
  }
  if(error){
    return <Container>
      <AutoSuggest suggestions={[]} handleChangeName={handleChangeName}/>
    </Container>
  }

  return <Container>
      <AutoSuggest suggestions={suggestions} handleChangeName={handleChangeName}/>
    </Container>
}

export default Home;
