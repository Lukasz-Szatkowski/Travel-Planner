import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import {
    TextField, Button, Typography, Box, Grid,
    Card, CardContent, CardActions, CardMedia, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectIcon from '@mui/icons-material/CheckCircle';

const TripPlannerPage = () => {
    const [trips, setTrips] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [newTrip, setNewTrip] = useState({ departure: '', departureLatitude: 0, departureLongitude: 0, destination: '', destinationLatitude: 0, destinationLongitude: 0, startDate: '', endDate: '' });
    const [selectedTrip, setSelectedTrip] = useState(null);

    const departureInputRef = useRef(null);
    const destinationInputRef = useRef(null);

    useEffect(() => {
        const fetchTrips = async () => {
            let token = null;
            try {
                token = localStorage.getItem('token');
            } catch (error) {
                console.error('Error accessing localStorage:', error);
            }
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const response = await axios.get('http://localhost:5005/api/trips', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTrips(response.data);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };
        fetchTrips();
    }, []);

    useEffect(() => {
        if (!window.google) {
            console.error("Google Maps JavaScript API is not loaded.");
            return;
        }

        const departureAutocomplete = new window.google.maps.places.Autocomplete(departureInputRef.current);
        departureAutocomplete.addListener('place_changed', () => {
            const place = departureAutocomplete.getPlace();
            console.log('Departure place:', place);
            setNewTrip(prevState => ({
                ...prevState,
                departure: place.formatted_address,
                departureLatitude: place.geometry.location.lat(),
                departureLongitude: place.geometry.location.lng(),
            }));
        });

        const destinationAutocomplete = new window.google.maps.places.Autocomplete(destinationInputRef.current);
        destinationAutocomplete.addListener('place_changed', () => {
            const place = destinationAutocomplete.getPlace();
            console.log('Destination place:', place);
            setNewTrip(prevState => ({
                ...prevState,
                destination: place.formatted_address,
                destinationLatitude: place.geometry.location.lat(),
                destinationLongitude: place.geometry.location.lng(),
            }));
        });
    }, []);

    const fetchImage = async (city) => {
        try {
          const searchUrl = `https://www.googleapis.com/customsearch/v1?key=AIzaSyAiiUiYqubkFaJ3wATy6IzxE1t4Lcsy2Tc&cx=5704e4a85be1e4f8e&searchType=image&q=${city}&num=1`;
  
          const response = await axios.get(searchUrl);
          const images = response.data.items;
          if (images && images.length > 0) {
            return images[0].link;
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };

    useEffect(() => {
        if (trips?.length > 0 && !imageUrls.length) {
            (async () => {
                const urls = await Promise.all(trips.map(async (trip) => {
                    const imageUrl = await fetchImage(encodeURI(`city ${trip.destination}`));
                    return { id: trip._id, imageUrl };
                }));

                setImageUrls(urls);
            })();
        }
    }, [trips]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const buttonName = e.nativeEvent.submitter.name;
        if (buttonName === 'clear-selected-trip') {
            setSelectedTrip(null);
            return;
        }

        let token = null;
        try {
            token = localStorage.getItem('token');
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5005/api/trips', newTrip, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTrips([...trips, response.data]);
            setNewTrip({ departure: '', departureLatitude: 0, departureLongitude: 0, destination: '', destinationLatitude: 0, destinationLongitude: 0, startDate: '', endDate: '' });
        } catch (error) {
            console.error('Error adding trip:', error);
        }
    };

    const handleDeleteTrip = async (tripId) => {
        let token = null;
        try {
            token = localStorage.getItem('token');
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            await axios.delete(`http://localhost:5005/api/trips/${tripId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTrips(trips.filter(trip => trip._id !== tripId));
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    };

    const handleSelectTrip = (trip) => {
        setSelectedTrip(trip);
    };

    const markers = trips.flatMap(trip => [
        new window.google.maps.Marker({
            position: { lat: trip.departureLatitude, lng: trip.departureLongitude },
        }),
        new window.google.maps.Marker({
            position: { lat: trip.destinationLatitude, lng: trip.destinationLongitude },
        })
    ]);

    const getCardImage = useCallback((tripId) => {
        if (!tripId || !imageUrls) return null;
        return (
            <CardMedia
            component="img"
            image={imageUrls.find(url => url.id === tripId)?.imageUrl || ''}
            alt={tripId?.destination}
        />
        );
    }, [imageUrls]);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                My Trips
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Departure"
                    inputRef={departureInputRef}
                    value={newTrip.departure}
                    onChange={(e) => setNewTrip({ ...newTrip, departure: e.target.value })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Destination"
                    inputRef={destinationInputRef}
                    value={newTrip.destination}
                    onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    label="Start Date"
                    InputLabelProps={{ shrink: true }}
                    value={newTrip.startDate}
                    onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    label="End Date"
                    InputLabelProps={{ shrink: true }}
                    value={newTrip.endDate}
                    onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })}
                />
                <Button name="add-trip" type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Add Trip
                </Button>
                {selectedTrip && (
                    <Button name="clear-selected-trip" type="submit" variant="contained" formNoValidate color="primary" sx={{ mt: 2 }} style={{marginLeft: '10px'}}>
                        Clear Selection
                    </Button>
                )}
            </Box>

            <Grid container spacing={4}>
                {trips.map((trip) => (
                    <Grid item key={trip._id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            { getCardImage(trip?._id) }
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {trip.destination}
                                </Typography>
                                <Typography>
                                    {trip.departure} - {trip.destination}
                                </Typography>
                                <Typography>
                                    {trip.startDate} - {trip.endDate}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTrip(trip._id)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="select" onClick={() => handleSelectTrip(trip)}>
                                    <SelectIcon color={selectedTrip?._id === trip?._id ? 'primary' : undefined} />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {selectedTrip && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h3">
                        Selected Trip
                    </Typography>
                    <Typography variant="body1">
                        {selectedTrip.departure} - {selectedTrip.destination}
                    </Typography>
                    <Typography variant="body1">
                        {selectedTrip.startDate} - {selectedTrip.endDate}
                    </Typography>
                    <Map center={{ lat: selectedTrip.destinationLatitude, lng: selectedTrip.destinationLongitude }} zoom={10} markers={[
                        { position: { lat: selectedTrip.departureLatitude, lng: selectedTrip.departureLongitude }, title: `Departure: ${selectedTrip.departure}` },
                        { position: { lat: selectedTrip.destinationLatitude, lng: selectedTrip.destinationLongitude }, title: `Destination: ${selectedTrip.destination}` },
                    ]} />
                </Box>
            )}

            {!selectedTrip && (
                <Map center={{ lat: 0, lng: 0 }} zoom={2} markers={markers} />
            )}
        </Box>
    );

};

export default TripPlannerPage;