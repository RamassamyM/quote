import React from 'react';
import { Box, Chip, Grid, Typography, Container } from '@material-ui/core';
import { Zoom, Fab, useScrollTrigger } from '@material-ui/core';
import BoxIdeaCard from './../../components/boxIdeaCard';
import BoxIdeaModal from './../../components/boxIdeaModal';
import ProductModal from './../../components/product-modal';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import useStyles from './style';
import { useSelector, useDispatch } from 'react-redux';
import { selectBoxIdeas, filterBoxIdeas } from './boxIdeasSlice';
import { chooseBoxIdeaCategoryFilter, selectBoxIdeasCategories } from './categoriesSlice';

export default function BoxIdeasPage() {
  const dispatch = useDispatch();
  const boxIdeas = useSelector(selectBoxIdeas);
  const categories = useSelector(selectBoxIdeasCategories);
  const [scroll, setScroll] = React.useState('paper');
  const [boxIdeaViewModal, setBoxIdeaViewModal] = React.useState({
    boxIdea: null,
    display: false
  });
  const [productViewModal, setProductViewModal] = React.useState({
    product: null,
    display: false
  });
  const classes = useStyles();
  // const preventDefault = (event) => event.preventDefault();
  const ScrollTop = () => {
    const trigger = useScrollTrigger({
      // target: window(),
      disableHysteresis: true,
      threshold: 100,
    });
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.backToTopButton}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
      </Zoom>
    );
  }

  const handleClickOnViewBoxIdea = (boxIdea, scrollType) => {
    setBoxIdeaViewModal({
      boxIdea, 
      display: true
    });
    setScroll(scrollType);
  };
  const handleCloseBoxIdeaView = (event) => {
    setBoxIdeaViewModal({ boxIdea: null, display: false });
  };
  const modalRef = React.useRef(null);

  const handleClickOnViewProduct = (product, scrollType) => {
    setProductViewModal({
      product,
      display: true
    });
    setScroll(scrollType);
  };
  const handleCloseProductView = (event) => {
    setProductViewModal({ product: null, display: false });
  };
  const modalProductRef = React.useRef(null);

  const handleSelectFilter = (tag) => {
    dispatch(chooseBoxIdeaCategoryFilter(tag));
    dispatch(filterBoxIdeas(tag));
  };
    
  const BoxIdeasGrid = ({ boxIdeas }) => {
    const displays = boxIdeas.map((boxIdea) => boxIdea.display);
    if (displays.length > 0 && displays.reduce((a,b) => a || b)) {
      return (
        <Grid container spacing={4}>
          {boxIdeas.map((boxIdea) => boxIdea.display && (
            <BoxIdeaCard
              key={boxIdea.boxIdeaId}
              boxIdea={boxIdea}
              handleClickOnViewBoxIdea={() => handleClickOnViewBoxIdea(boxIdea, 'paper')}
            />
          ))}
        </Grid>
      );
    } else {
      return (
        <Box mt={2} display="flex" alignItems="center" justifyContent="center" width={'100%'}>
          <Typography component="h4" align="center">
            Sorry ! We did not find any box idea... Try another option :)
          </Typography>
        </Box>
      );
    }
  }

  const CategoryFilterSection = ({ tags }) => {
    if (tags) {
      return (
        <React.Fragment>
          {tags.map((tag) => {
            let variant;
            let color = "secondary"
            if (categories.selected !== tag) {
              variant = "outlined";
              color = undefined;
            }
            return (
              <Chip variant={variant} color={color} key={tag} label={tag} className={classes.filterChip} onClick={() => handleSelectFilter(tag)} ></Chip>
            );
          })}
        </React.Fragment>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
  // Return
  return (
    <React.Fragment>
      {/* Hero unit */}
      <div className={classes.heroContent} id="back-to-top-anchor">
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.grid}>
            <Box className={classes.heroBoxTitle} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography component="h1" variant="h4" align="center" className={classes.heroTitle}>
                Browse our box ideas
              </Typography>
              <Typography align="center" className={classes.heroSubtitle}>
                Start with our ideas and edit the content in the quote page if you wish
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
      <Box className={classes.filterSection} display="flex" alignItems="center" justifyContent="center">
        <CategoryFilterSection tags={["All"].concat(categories.list)} />
      </Box>
      {/* End hero unit */}
      <Container className={classes.cardGrid} maxWidth="md">
        <Box display="flex" alignItems="flex-start">
          <BoxIdeasGrid boxIdeas={boxIdeas}/>
        </Box>
      </Container>
      <BoxIdeaModal 
        boxIdea={boxIdeaViewModal.boxIdea}
        display={boxIdeaViewModal.display}
        handleCloseBoxIdeaView={handleCloseBoxIdeaView}
        handleClickOnViewProduct={(product) => handleClickOnViewProduct(product, 'paper')}
        reference={modalRef}
        scroll={scroll}
      />
      <ProductModal
        product={productViewModal.product}
        display={productViewModal.display}
        handleCloseProductView={handleCloseProductView}
        reference={modalProductRef}
        scroll={scroll}
        readOnly={true}
      />
      <ScrollTop/>
    </React.Fragment>
  );
}