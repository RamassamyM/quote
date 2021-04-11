import React from 'react';
import { Icon, Link, Box, Paper, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  heroContent: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: '56px',
    padding: theme.spacing(1, 0, 3),
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px',
      padding: theme.spacing(4, 0, 4),
    },
  },
  heroTitle: {
    color: theme.palette.secondary.light,
    [theme.breakpoints.down('xs')]: {
      fontSize: '36px',
    },
  },
  heroButtons: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    '& a': {
      padding: theme.spacing(2),
      color: theme.palette.secondary.light,
      '&:hover': {
        textDecoration: 'none',
      }
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
      }
    }
  },
  heroMail: {
    margin: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function BoxBuilderPage() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <React.Fragment>
      {/* Hero unit */}
      <div className={classes.heroContent} >
        <Grid container spacing={2}>
          <Grid item xs={0} sm={0} md={4}>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography component="h1" variant="h3" align="center" className={classes.heroTitle} gutterBottom>
              Build your box
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
              <Button component="a" href="mailto:sales@curakit.com" color="primary" className={classes.heroMail} >
                  <Icon className={classes.icon} >mail_outline</Icon>
                  I need a customized box 
              </Button>
              <Paper elevation={0} square="true" display="flex" alignItems="center" className={classes.heroButtons}>
                <Link href="#" onClick={preventDefault} disabled>
                {'12'} ITEMS | £{'15'} / BOX 
                </Link>
                <Link href="#" onClick={preventDefault}>
                  VIEW MY BOX {'>'}
                </Link>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}