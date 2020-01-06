import React from 'react';
import {EarthProps} from '../Earth';
import {GoogleMapProps} from '../GoogleMap';
import {MapProps} from '../Map';

export const MapData: MapProps = {
	size: '3:1',
	center: {lat: 54.900349, lng: -1.49205},
	markers: [
		{
			title: 'Los Angeles',
			position: {lat: 34.052235, lng: -118.243683},
		},
		{
			title: 'London',
			position: {lat: 51.507351, lng: -0.127758},
		},
		{
			title: 'Sydney',
			position: {lat: -33.86882, lng: 151.20929},
		},
	],
};

export const MapDemo = () => <div>demo</div>;

export const EarthData: EarthProps = {
	...MapData,
};

export const EarthDemo = () => <div>demo</div>;

export const GoogleMapData: GoogleMapProps = {
	...MapData,
	...{
		apiKey: '',
	},
};

export const GoogleMapDemo = () => <div>demo</div>;
