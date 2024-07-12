import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

const cards = [1, 2, 3];

function HomePage() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Travel Planner
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        pt: 8,
                        pb: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '60vh',
                        textAlign: 'center',
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
                    }}
                >
                    <Container
                        maxWidth="sm"
                        sx={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="inherit"
                            gutterBottom
                        >
                            Welcome to Travel Planner
                        </Typography>
                        <Typography variant="h5" align="center" color="inherit" paragraph>
                            Plan your next trip with ease and explore the world!
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={handleLogin}>Login</Button>
                            <Button variant="outlined" onClick={handleSignUp}>Sign Up</Button>
                        </Stack>
                    </Container>
                </Box>
                {/* End hero unit */}
                <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', py: 8 }}>
                    <Container maxWidth="md">
                        {/* Feature section */}
                        <Typography variant="h4" align="center" gutterBottom>
                            Features
                        </Typography>
                        <Grid container spacing={4}>
                            {cards.map((card) => (
                                <Grid item key={card} xs={12} sm={6} md={4}>
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{ pt: '56.25%' }}
                                            image="https://source.unsplash.com/random"
                                            alt="random"
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Feature {card}
                                            </Typography>
                                            <Typography>
                                                This is a feature description. You can use this section to describe the feature.
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">View</Button>
                                            <Button size="small">Edit</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
                {/* End feature section */}
                {/* Testimonials section */}
                <Box
                    sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="md">
                        <Typography variant="h4" align="center" gutterBottom>
                            Testimonials
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        John Doe
                                    </Typography>
                                    <Typography>"Travel Planner helped me plan my trip effortlessly!"</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Jane Smith
                                    </Typography>
                                    <Typography>"A must-have tool for any traveler."</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                {/* End testimonials section */}
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Travel Planner
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Your next adventure is just ahead!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </React.Fragment>
    );
}

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Travel Planner
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default HomePage;