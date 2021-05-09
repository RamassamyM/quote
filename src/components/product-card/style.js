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
    margin: '10px',
    paddingTop: '60%', // 16:9
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  cardContent: {
    width: '100%',
  },
  productTitle: {
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
  },
  variantList: {
    fontSize: '11px',
    fontWeight: '500',
  },
  cardActions: {
    padding: theme.spacing(0,2,0)
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