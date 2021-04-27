import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boxPanel: {
    width: 500,
    padding: theme.spacing(2),
    paddingBottom: '75px',
  },
  fullBoxPanel: {
    width: 'auto',
    minHeight: '200px',
  },
  boxItemCard: {
    display: 'flex',
    maxWidth: 400,
    marginBottom: '10px',
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
    marginBottom: '64px',
  },
  totalCostBar: {
    top: 'auto',
    bottom: 0,
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
    marginBottom: '64px',
  }
}));

export default useStyles;
