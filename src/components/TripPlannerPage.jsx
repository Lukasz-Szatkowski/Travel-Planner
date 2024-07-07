import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';

const TripPlannerPage = () => {
    const [trips, setTrips] = useState([]);
    const [newTrip, setNewTrip] = useState({ destination: '', startDate: '', endDate: '' });
    const [selectedTrip, setSelectedTrip] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const response = await axios.get('http://localhost:5001/api/trips', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTrips(response.data);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };
        fetchTrips();
    }, []);

    const handleAddTrip = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5001/api/trips', newTrip, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTrips([...trips, response.data]);
            setNewTrip({ destination: '', startDate: '', endDate: '' });
        } catch (error) {
            console.error('Error adding trip:', error);
        }
    };

    const handleDeleteTrip = async (tripId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            await axios.delete(`http://localhost:5001/api/trips/${tripId}`, {
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

    return (
        <div>
            <h2>My Trips</h2>
            <form onSubmit={handleAddTrip}>
                <input
                    type="text"
                    value={newTrip.destination}
                    onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                    placeholder="Destination"
                    required
                />
                <input
                    type="date"
                    value={newTrip.startDate}
                    onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={newTrip.endDate}
                    onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })}
                    required
                />
                <button type="submit">Add Trip</button>
            </form>

            <ul>
                {trips.map((trip) => (
                    <li key={trip._id}>
                        {trip.destination} ({trip.startDate} - {trip.endDate})
                        <button onClick={() => handleDeleteTrip(trip._id)}>Delete</button>
                        <button onClick={() => handleSelectTrip(trip)}>Select</button>
                    </li>
                ))}
            </ul>

            {selectedTrip && (
                <div>
                    <h3>Selected Trip</h3>
                    <p>{selectedTrip.destination}</p>
                    <p>{selectedTrip.startDate} - {selectedTrip.endDate}</p>
                    <Map center={{ lat: selectedTrip.latitude, lng: selectedTrip.longitude }} zoom={10} />
                </div>
            )}
        </div>
    );
};

export default TripPlannerPage;