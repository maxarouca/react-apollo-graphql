import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useStyles from './styles'
import { CircularProgress, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

const Station = (props) => {
  const classes = useStyles();
  const { number } = props.match.params

  const LOAD_STATION = gql`
    query Station($number: Int!) {
      stationWithStationNumber(stationNumber: $number){
        hasParking
        hasWiFi
        hasBicycleParking
        hasMobilityService
        hasCarRental
        name
        picture{
          url
        }
      }
    }
  `;

  const { error, loading, data } = useQuery(LOAD_STATION, {
    variables: { number },
  });

  if (loading) {
    return <div className={classes.root}>
      <CircularProgress className={classes.progress} />
    </div>
  }
  if (error) {
    return <h1>error</h1>
  }

  const station = data.stationWithStationNumber

  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <h1>Station {station.name}</h1>
      <img className={classes.picture} src={station.picture.url} alt={`Station ${station.name}`} />
      <Button variant="contained" className={classes.button} color="primary">
        <Link to="/" className={classes.link}>Back to home</Link>
      </Button>
    </Paper>
  </div>

}

export default Station;
