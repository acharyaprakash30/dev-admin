import React, { Fragment, useState } from 'react';

const GeoTracker = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      setError(null);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  return (
    <Fragment>
      {error ? (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      ) : (
        <div>
          <b>{error}</b>
        </div>
      )}
      <button onClick={getLocation}>Get Location</button>
    </Fragment>
  );
};
export default GeoTracker;
