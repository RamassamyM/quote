import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heroMailIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.reverted,
  },
  heroContent: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2, 0, 2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2, 0, 2),
    },
  },
  heroBoxTitle: {
    height: '100%',
    minHeight: '70px',
    // [theme.breakpoints.up('sm')]: {
    //   marginTop: '20px',
    // },
  },
  heroTitle: {
    fontWeight: '700',
    color: theme.palette.text.reverted,
    // [theme.breakpoints.down('sm')]: {
    //   fontSize: '36px',
    //   '& h2': {
    //     margin: 'none',
    //   }
    // },
  },
  heroSubtitle: {
    color: theme.palette.text.reverted,
    fontSize: '0.8rem',
  },
  heroMail: {
    color: theme.palette.text.reverted,
    // margin: theme.spacing(1),
  },
  heroInfos: {
    // 
  },
  cardGrid: {
    // paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 8, 2),
    },
  },
  viewBoxbutton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.secondary.variant,
      // color: theme.palette.text.reverted,
    }
  },
  costText: {
    color: theme.palette.text.reverted,
    fontWeight: '700',
    marginRight: '10px',
  },
  nbItemsText: {
    color: theme.palette.text.reverted,
    marginRight: '10px',
    fontWeight: '500',
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
    backgroundColor: theme.palette.surface.main,
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