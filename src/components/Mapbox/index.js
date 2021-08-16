import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl'; 
import * as ROUTES from "../../constants/routes";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css';
require('dotenv').config(); 
var GeoJSON=require('geojson');
mapboxgl.accessToken =process.env.REACT_APP_MAPBOX_API_KEY;
//mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(38);
  const [lat, setLat] = useState(8);
  const [zoom, setZoom] = useState(3.5);
 
  // Add the control to the map.
  
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
   // map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        })
        );
    map.on('click', function(e) {
          // If the user clicked on one of your markers, get its information.
          var features = map.queryRenderedFeatures(e.point, {
            layers: ['point'] // replace with your layer name
          });
          if (!features.length) {
            return;
          }
          var feature = features[0];
        
          // Code from the next step will go here.
          var popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(feature.geometry.coordinates)
          .setHTML(
            
            '<p>' + feature.properties.type + '</p>'+
            '<p>' + feature.geometry.coordinates + '</p>'
            )
          .addTo(map);    
    });
var json = JSON.stringify();
map.on('load', function () {
  map.loadImage(
    './icon-man.png',
    function (error, image) {
    if (error) throw error;
     
    // Add the image to the map style.
    map.addImage('user', image);

  var request = new XMLHttpRequest();
  //window.setInterval(function () {
  // make a GET request to parse the GeoJSON at the url
  request.open('GET', ROUTES.API_GET_ADDRESS, true);
  //request.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      json=GeoJSON.parse(JSON.parse(this.response).data,
        {
          Point:['latitude','longitude']
        }
      );
      console.log(json);
      // update the drone symbol's location on the map
      map.getSource('point').setData(json); 
      // fly the map to the drone's current location 
    }
  };
  request.send();
  //}, 100000);
  map.addSource('point', { type: 'geojson', data: json }); 
  map.addLayer({
    'id': 'point',
    'type': 'symbol',
    'source': 'point',
    'layout': {
      // This icon is a part of the Mapbox Streets style.
      // To view all images available in a Mapbox style, open
      // the style in Mapbox Studio and click the "Images" tab.
      // To add a new image to the style at runtime see
      // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
      'icon-image': 'user',
      'icon-size': 0.02
    }
  });
});
});
    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
     
      <div className='map-container' ref={mapContainerRef} />
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </div>
  );
};

export default Map;
