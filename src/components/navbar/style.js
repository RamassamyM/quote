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
      color: theme.palette.primary.main,
    }
  },
  link: {
    '& a': {
      color: theme.palette.text.reverted,
      marginRight: '20px',
      '&:hover': {
        textDecoration: 'none',
        color: theme.palette.primary.main,
      } 
    }
  },
  linkWithBadge: {
    color: theme.palette.text.secondary,
    marginRight: '5px',
    '& span': {
      color: theme.palette.text.secondary,
      '& .MuiBadge-badge': {
        color: theme.palette.text.reverted,
      }
    }
  },
  linkSelected: {
    '& span': {
      color: theme.palette.primary.main,
    },
    color: theme.palette.primary.main,
  },
  loginLink: {
    color: theme.palette.text.reverted,
  },
  navbarLink: {
    textDecoration: 'none',
  },
  linkInMenu: {
    color: theme.palette.primary.main,
    '& span': {
      color: theme.palette.primary.main,
    },
    '&:hover': {
      color: theme.palette.secondary.main,
    }
  },
  iconClose: {
    color: theme.palette.primary.main,
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
    // height: '100%',
    maxHeight: '24px',
  },
  pro: {
    fontFamily: 'Montserrat',
    color: theme.palette.text.primary,
    marginLeft: '10px',
    fontWeight: '600',
    fontSize: '26px',
  }
}));

export default useStyles;