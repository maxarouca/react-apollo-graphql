import React from 'react';
import { Icon } from '@material-ui/core';
import useStyles from './styles'

const StationItem = ({ icon, name, hasItem }) => {
  const classes = useStyles();
  return (
    <li className={classes.item}>
      <Icon
        fontSize="large"
        className={classes.icon}
        style={{ color: hasItem ? '#6CACFC' : '#A7ABAE' }}
      >
        {icon}
      </Icon>
      {name}
    </li>
  )
}



export default StationItem;
