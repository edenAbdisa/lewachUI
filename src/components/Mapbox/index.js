import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl'; 
import * as ROUTES from "../../constants/routes";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

require('dotenv').config(); 
var GeoJSON=require('geojson');
mapboxgl.accessToken =process.env.REACT_APP_MAPBOX_API_KEY;
mapboxgl.workerClass = MapboxWorker;
const Map = (props) => {
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
  const popup = new  mapboxgl.Popup({
    
    closeButton: false,
    closeOnClick: false
    });
  map.on('mouseenter', 'point', (e) => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';

      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.type;
       
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
       
      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(description).addTo(map);
      });
       
      map.on('mouseleave', 'point', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
      });  
});
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
