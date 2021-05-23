import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  boxCard: {
    display: 'flex',
    marginBottom: '10px',
    backgroundColor: theme.palette.background.main,
    borderRadius: '3px',
    border: '1px solid',
    // borderColor: theme.palette.surface.border,
    borderColor: 'transparent',
  },
  cardContentArea: {
    '&:last-child': {
      paddingBottom: theme.spacing(1),
    }
  },
  iconClose: {
    color: theme.palette.text.reverted,
  },
  boxCardDetails: {
    display: 'flex',
    flexGrow: '1',
    // overflow: 'hidden',
    // whiteSpace: 'nowrap',
  },
  boxCardContentTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.reverted,
  },
  boxCardCover: {
    minWidth: 100,
    width: 100,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  boxCardHeaderBar: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '6px 6px 0px 0px',
  },
  boxCardHeader: {
    '& .rdn-drop': {
      top: '0',
      bottom: 'auto',
    },
  },
  boxIcon: {
    marginRight: '5px',
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  boxCardControls: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: "row-reverse",
  },
  boxCardIcon: {
    height: 38,
    width: 38,
  },
  boxContent: {
    textAlign: "left",
    margin: '0px',
    backgroundColor: theme.palette.surface.main,
  },
  boxContentTitle: {
    fontWeight: '500',
    fontSize: '10px',
    marginRight: '10px',
  },
  boxExpanded: {
    paddingTop: '10px',
    paddingRight: '20px',
  },
  separator: {
    flexGrow: '1',
  },
  qtySlider: {
    // width: 250,
  },
  input: {
    marginLeft: '10px',
    width: 50,
    fontSize: '14px'
  },
  boxLabel: {
    marginTop: theme.spacing(1),
    fontSize: '12px',
  },
  deleteIcon: {
    color: theme.palette.text.reverted,
  },
  contentList: {
    padding: 0,
  },
  totalText: {
    fontWeight: '700',
  },
}));
export default useStyles;