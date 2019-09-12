import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #000000 30%, #434343 90%)',
    padding: '30px',
    color: '#FFF',
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: 20,
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  picture: {
    width: 200,
    borderRadius: 4,
  },
  button: {
    width: 200
  },
  link: {
    textDecoration: 'none',
    color: '#FFF'
  }
});

export default useStyles