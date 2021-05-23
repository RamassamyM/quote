import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boxPanel: {
    width: 500,
    maxWidth: '100vw',
  },
  fullBoxPanel: {
    width: 'auto',
    minHeight: '200px',
  },
  boxViewHeader: {
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
    borderRadius: '3px',
    border: '1px solid',
    borderColor: theme.palette.surface.border,
    backgroundColor: theme.palette.surface.main,
  },
  iconClose: {
    color: theme.palette.text.reverted,
  },
  emptyBoximage: {
    maxHeight: '200px',
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
  quantityIcon: {
    color: theme.palette.primary.main,
  },
  deleteIcon: {
    color: theme.palette.text.secondary,
  },
  boxAnimationWrapper: {
  },
  totalCostBar: {
    backgroundColor: theme.palette.surface.main,
    position: 'sticky',
    top: 'auto',
    bottom: 0,
    width: '100%',
    padding: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  boxTotalCostText: {
    fontWeight: '500',
    color: theme.palette.text.main + '!important',
  },
  boxItemsWrapper: {
    // marginBottom: '64px',
  },
  emptyItems: {
    paddingTop: theme.spacing(4),
  },
  addToQuoteButton: {
    fontSize: '13px',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  bottomBarContentWrapper: {
    margin: 'auto',
  },
}));

export default useStyles;
