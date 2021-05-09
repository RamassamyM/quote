import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.surface.main,
    borderRadius: '3px',
    border: '1px solid',
    borderColor: theme.palette.surface.border,
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  cardContent: {
    width: '100%',
  },
  productTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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