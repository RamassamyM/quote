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
    borderColor: 'transparent',
  },
  boxQtyField: {
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '5px',
    minWidth: '50px'
  },
  boxQtyFieldText: {
    fontSize: '14px',
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
    marginLeft: '10px',
    marginTop: '5px',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  boxIcon: {
    marginRight: '5px',
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  buttonEditForm: {
    borderRadius: '0px 4px 4px 0px',
    width: '50px',
    minHeight: '55px',
    backgroundColor: theme.palette.primary.variant,
  },
  inputEditName: {
    textAlign: 'left',
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '100%'
  },
  boxCardControls: {
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
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
  fullHeightBox: {
    height: '100%',
  },
  inputEditQty: {
    fontSize: '14px',
  },
  buttonValidateQty: {
    border: '1px solid blue',
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.main,
    '&:hover': {
      backgroundColor: 'rgba(0, 148, 202, 0.04)',
    }
  },
  boxLabel: {
    fontSize: '12px',
  },
  actionIcon: {
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