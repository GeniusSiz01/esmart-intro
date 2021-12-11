import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React from 'react';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import PinDropIcon from '@mui/icons-material/PinDrop';
import NotificationSnackBar from './NotificationSnackBar';
import CallIcon from '@mui/icons-material/Call';


mapboxgl.accessToken = 'pk.eyJ1Ijoic2J1ZGljdGlvbiIsImEiOiJja281bnI5ZmYxdXNuMnJwZ3l2MWJ2eW84In0.P4hFPkV_mY0TKw3AQ0lzfA';

export default class MapBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lng: -26.2054,
            lat: 28.0396,
            zoom: 15,
            start: [28.10070, -26.00242]
        };
        this.mapContainer = React.createRef();
    }


    componentDidMount() {
        const { zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [28.10070, -26.00242],
            zoom: zoom,
        });


        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving',
        });

        map.addControl(directions, 'top-left');

        // Add geolocate control to the map.
        // map.addControl(
        //     new mapboxgl.GeolocateControl({
        //         positionOptions: {
        //             enableHighAccuracy: true
        //         },
        //         // When active the map will receive updates to the device's location as it changes.
        //         trackUserLocation: true,
        //         // Draw an arrow next to the location dot to indicate which direction the device is heading.
        //         showUserHeading: true
        //     })
        // );


        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

    }


    render() {
        return (
            <div>
                <div ref={this.mapContainer} className="map-container" />
                <div className="sidebar">
                    <PinDropIcon color='error' />{this.props.address}  <NotificationSnackBar cid={this.props.cid} />
                    <a href={`tel:${this.props.phone}`}><CallIcon /> Make a call</a>
                </div>
            </div>
        );
    }
}