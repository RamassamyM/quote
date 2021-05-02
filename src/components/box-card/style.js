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
  },
  iconClose: {
    color: theme.palette.white.main,
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
  },
  boxCardCover: {
    minWidth: 100,
    width: 100,
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