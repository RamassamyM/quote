import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  modalImageWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.surface.main,
  },
  modalImageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  boxIdeaImage: {
    height: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  boxIdeaImageWrapper: {
    maxWidth: '100%',
    height: '300px',
  },
  boxIdeaImageColumn: {
    margin: 'auto',
  },
  modalChip: {
    marginRight: theme.spacing(1),
  },
  modalWrapperChip: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  modalCategory: {
    color: theme.palette.primary.main,
  },
  modalDescription: {
    marginBottom: theme.spacing(5)
  },
  separator: {
    flexGrow: '1',
  }
}));

export default useStyles;