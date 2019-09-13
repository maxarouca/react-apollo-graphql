import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(to bottom, #6FB1FC, #4364F7, #3F51B5)',
    padding: '30px',
    color: '#FFF',
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    width: '50%',
    minWidth: 600,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 400,
  },
  pictureContainer: {
    width: '400px',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  picture: {
    width: '100%',
  },
  button: {
    width: 200
  },
  link: {
    textDecoration: 'none',
    color: '#FFF'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  title: {
    color: '#3F51B5',
    margin: 0
  },
  info: {
    padding: 0,
    display: 'flex',
    listStyle: 'none',
    flexDirection: 'row',
    marginTop: -50
  },

});

export default useStyles