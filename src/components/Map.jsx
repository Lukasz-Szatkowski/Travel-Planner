import React, { useRef, useEffect } from "react";

const Map = ({ center, zoom }) => {
    const mapRef = useRef ();

    useEffect (() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
        });
        new window.google.maps.Marker({
            position: center,
            map,
        });
    }, [center, zoom]);

    return <div ref={mapRef} style={{
        width: "100%",
        height: "400px",
    }} />;
}

export default Map;