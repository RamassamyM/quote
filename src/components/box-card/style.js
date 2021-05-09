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
    backgroundColor: theme.palette.surface.main,
    borderRadius: '3px',
    border: '1px solid',
    borderColor: theme.palette.surface.border,
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
    color: theme.palette.primary.main,
  },
  boxCardCover: {
    minWidth: 150,
    width: 150,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  boxCardHeader: {
    '& .rdn-drop': {
      top: '0',
      bottom: 'auto',
    }
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
    textAlign: "right",
    fontWeight: '700',
  },
  boxExpanded: {
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
  }
}));
export default useStyles;