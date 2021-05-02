import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  heroContent: {
    backgroundColor: theme.palette.grey.main,
    padding: theme.spacing(2, 0, 2),
  },
  heroTitle: {
    color: theme.palette.secondary.lighter,
    fontSize: '38px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '34px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px',
    },
  },
  boxGridWrapper: {
    minHeight: 'calc(100vh - 213px)',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 209px)',
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: 'calc(100vh - 193px)',
    },
  },
  backToTopButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  separator: {
    flexGrow: '1',
  }
}));

export default useStyles;