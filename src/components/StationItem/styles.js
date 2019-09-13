import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  item: {
    width: '20%',
    margin: '0 auto',
    textAlign: 'center'
  },
  icon: {
    display: 'block',
    fontSize: '3rem',
    margin: '20px auto',
    textAlign: 'center',
  },
}));

export default useStyles