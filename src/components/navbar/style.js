import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  avatarMenuIcon: {
    '& span': {
      color: "#ffffff",
    }
  },
  link: {
    '& a': {
      color: '#FFF',
      marginRight: '20px',
      '&:hover': {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
      } 
    }
  },
  linkWithBadge: {
    color: theme.palette.white.main,
    marginRight: '5px',
    '& span': {
      color: theme.palette.white.main,
    }
  },
  loginLink: {
    color: theme.palette.white.main,
  },
  navbarLink: {
    textDecoration: 'none',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  logo: {
    height: '100%',
    maxHeight: '30px',
  },
  pro: {
    color: 'white',
    marginLeft: '10px',
    fontWeight: '500',
    fontSize: '28px',
    fontFamily: 'montserrat',
  }
}));

export default useStyles;