import React, { useRef, useEffect } from "react";

const Map = ({ center, zoom, markers }) => {
    const mapRef = useRef();

    useEffect(() => {
        if (!window.google) {
            console.error("Google Maps JavaScript API is not loaded.");
            return;
        }

        const mapInstance = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
        });

        markers.forEach(marker => {
            new window.google.maps.Marker({
                position: marker.position,
                map: mapInstance,
                title: marker.title,
            });
        });
    }, [center, zoom, markers]);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default Map;