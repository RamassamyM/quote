import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boxPanel: {
    width: 500,
    maxWidth: '100vw',
    backgroundColor: theme.palette.grey.lighter,
  },
  fullBoxPanel: {
    width: 'auto',
    minHeight: '200px',
  },
  boxViewHeader: {
    // backgroundColor: theme.palette.white.main,
    // color: theme.palette.grey.main,
    // width: 500,
    // maxWidth: '100vw',
    // height: "64px",
    // zIndex: "10",
    // position: "fixed",
    // padding: theme.spacing(1),
    // top: 0,
  },
  boxContentWrapper: {
    minHeight: 'calc(100vh - 128px)',
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      minHeight: 'calc(100vh - 115px)',
    },
  },
  boxItemCard: {
    display: 'flex',
    maxWidth: 400,
    marginBottom: '10px',
  },
  iconClose: {
    color: theme.palette.white.main,
  },
  boxItemCardDetails: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  boxItemCardContentTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  boxItemCardCover: {
    minWidth: 100,
    width: 100,
  },
  boxItemCardControls: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: "row-reverse",
  },
  boxItemCardIcon: {
    height: 38,
    width: 38,
  },
  boxAnimationWrapper: {
    // width: '500px',
    // height: '400px',
    // marginBottom: '64px',
  },
  totalCostBar: {
    backgroundColor: theme.palette.grey.main,
    position: 'sticky',
    top: 'auto',
    bottom: 0,
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  boxTotalCostText: {
    fontWeight: '700',
    color: theme.palette.white.main,
    marginRight: '20px',
  },
  boxItemsWrapper: {
    // marginBottom: '64px',
  },
  emptyItems: {
    paddingTop: theme.spacing(4),
  }
}));

export default useStyles;
