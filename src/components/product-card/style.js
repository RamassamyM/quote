import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
  },
  cardActions: {
    padding: theme.spacing(2)
  },
  separator: {
    flexGrow: '1',
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90,
    },
  },
}));
export default useStyles;