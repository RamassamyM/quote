import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.variant,
    padding: theme.spacing(3),
  },
}));

export default useStyles;