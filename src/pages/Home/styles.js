import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(to bottom, #6FB1FC, #4364F7, #3F51B5)',
    padding: '30px',
    color: '#FFF',
    display: 'flex',
    height: '100vh',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: 20,
    width: '50%',
  },
});

export default useStyles