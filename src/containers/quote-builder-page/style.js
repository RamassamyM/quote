import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  heroContent: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2, 0, 2),
    minHeight: '98px',
  },
  heroTitle: {
    color: theme.palette.text.reverted,
    fontWeight: '700',
  },
  heroMail: {
    color: theme.palette.primary.main,
    fontSize: 12,
    marginTop: '5px',
  },
  heroMailIcon: {
    fontSize: 14,
    marginRight: '5px',
  },
  quoteContentWrapper: {
    backgroundColor: theme.palette.background.main,
    paddingTop: theme.spacing(2),
    minHeight: 'calc(100vh - 212px)',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 208px)',
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: 'calc(100vh - 192px)',
    },
  },
  backToTopButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  emptyContent: {
    maxWidth: '400px',
  },
  emptyBoximage: {
    maxHeight: '300px',
  },
  totalCostBar: {
    backgroundColor: theme.palette.surface.main,
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    width: '100%',
    // height: '74px',
    padding: theme.spacing(3),
  },
  separator: {
    flexGrow: 1,
  },
  quoteTotalCostText: {
    color: theme.palette.text.secondary,
    marginRight: '20px',
  },
  quoteTotalCostTextBold: {
    color: theme.palette.primary.main,
    fontWeight: '700',
    marginRight: '20px',
  },
  totalCostInfosWrapper: {
    width: "200px",
  },
  addABoxButton: {
    marginTop: '20px',
    marginBottom: '60px',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  requestQuoteButton: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export default useStyles;