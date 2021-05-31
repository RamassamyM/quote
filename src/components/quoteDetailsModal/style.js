import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  separator: {
    flexGrow: '1',
  },
  detailsFormContent: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1,1,0),
      // width: '25ch',
      width: '45%',
    },
  },
  downloadSection: {
    minHeight: "200px",
    width: "100%",
  },
  image: {
    width: "100px",
  },
  imageWrapper: {
    // maxWidth: "300px",
  },
  contactLink: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }
}));

export default useStyles;