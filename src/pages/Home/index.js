import React from 'react';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles'
import AutoSuggest from '../../components/AutoSuggest'

const Home = ({ history }) => {
  const classes = useStyles();

  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <h1>Pick a Station:</h1>
      <AutoSuggest history={history} />
    </Paper>
  </div>
}

export default Home;
