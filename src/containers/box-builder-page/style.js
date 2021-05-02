import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  heroContent: {
    backgroundColor: theme.palette.grey.main,
    // marginTop: '56px',
    padding: theme.spacing(0, 0, 2),
    [theme.breakpoints.up('md')]: {
      // marginTop: '64px',
      padding: theme.spacing(2, 0, 2),
    },
  },
  heroBoxTitle: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '20px',
    },
  },
  heroTitle: {
    color: theme.palette.secondary.lighter,
    [theme.breakpoints.down('sm')]: {
      fontSize: '36px',
      '& h2': {
        margin: 'none',
      }
    },
  },
  heroButtons: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',
    padding: theme.spacing(1),
    color: theme.palette.secondary.lighter,
  },
  heroMail: {
    margin: theme.spacing(1),
  },
  cardGrid: {
    // paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: '100vh'
  },
  buttonBoxPanel: {
    color: theme.palette.white.main,
    '&:disabled': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.white.main
    }
  },
  filterSection: {
    // backgroundColor: theme.palette.white.main,
    minHeight: "80px",
  },
  filterChip: {
    border: "none",
  },
  backToTopButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  modalImageWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  modalImageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  modalChip: {
    marginRight: theme.spacing(1),
  },
  modalWrapperChip: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  modalCategory: {
    color: theme.palette.primary.main,
  },
  modalDescription: {
    marginBottom: theme.spacing(5)
  },
  separator: {
    flexGrow: '1',
  }
}));

export default useStyles;