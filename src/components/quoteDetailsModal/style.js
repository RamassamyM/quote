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
}));

export default useStyles;