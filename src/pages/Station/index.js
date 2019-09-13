import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useStyles from './styles'
import { CircularProgress, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import bgOut from './image.jpg'
import StationItem from '../../components/StationItem'

const Station = (props) => {
  const classes = useStyles();
  const { number } = props.match.params

  const LOAD_STATION = gql`
    query Station($number: Int!) {
      stationWithStationNumber(stationNumber: $number){
        hasLocalPublicTransport
        hasWiFi
        hasBicycleParking
        hasDBLounge
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
      <div
        className={classes.pictureContainer}
        style={{
          background: station.picture ? `url(${station.picture.url})` : `url(${bgOut})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '-webkit-filter': !station.picture ? 'blur(5px)' : null,
        }}
      />
      <div className={classes.content}>
        <h1 className={classes.title}>Station {station.name}</h1>
        <ul className={classes.info}>
          <StationItem hasItem={station.hasLocalPublicTransport} icon="departure_board" name="Public Transport" />
          <StationItem hasItem={station.hasWiFi} icon="wifi" name="Wifi" />
          <StationItem hasItem={station.hasBicycleParking} icon="directions_bike" name="Bicicle Parking" />
          <StationItem hasItem={station.hasDBLounge} icon="local_activity" name="DB Lounge" />
          <StationItem hasItem={station.hasCarRental} icon="directions_car" name="Car Rental" />
        </ul>
        <Button variant="contained" className={classes.button} color="primary">
          <Link to="/" className={classes.link}>Back to home</Link>
        </Button>
      </div>
    </Paper>
  </div>

}

export default Station;
