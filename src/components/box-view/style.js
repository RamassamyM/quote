import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boxPanel: {
    width: 500,
    padding: theme.spacing(2),
  },
  fullBoxPanel: {
    width: 'auto',
    minHeight: '200px',
  }
}));

export default useStyles;