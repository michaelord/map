import {getModifiers} from 'components/libs';
// import L from 'leaflet';

// @ts-ignore
import L from './Leaflet';

import React, {memo, useEffect, useState} from 'react';
import './Map.scss';

export type Ratio = '3:1' | '4:1' | '16:9';

export type LatLng = {
	lat: number;
	lng: number;
};

export type Marker = {
	position: LatLng;
	title: string;
};

export type MarkerGroup = {
	label?: string;
	markers?: Array<Marker>;
};

export type MapData = {
	id?: string;
	size?: Ratio;
	zoom?: number;
	center: LatLng;
	markers?: Array<Marker> | MarkerGroup;
};

export type MapProps = MapData & {};

export const Map = memo((props: MapProps) => {
	const base: string = 'map';
	const {size = '3:1', zoom = 14, center, id = 'testmap', markers} = props;
	const tilePattern: string = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
	const [active, setActive] = useState(0);

	const atts: object = {
		className: getModifiers(base, {
			ratio: `ratio-${size}`,
		}),
	};

	const allMarkers: Array<Marker> = [];
	const markerGroups: Array<any> = [];

	const createMarker = (marker: any, map: any) => {
		const id = allMarkers.length;

		const markerObj = L.marker([marker.position.lat, marker.position.lng])
			.addTo(map)
			.on('click', ev => {
				setActive(id);
			})
			.bindPopup(marker.title);

		allMarkers.push(marker);

		return markerObj;
	};

	const init = () => {
		try {
			// @ts-ignore
			const map = L.map(id, {
				center: [center.lat, center.lat],
				zoom: zoom,
				scrollWheelZoom: false,
			});

			L.tileLayer(tilePattern, {
				maxZoom: 14,
			}).addTo(map);

			// plot the markers

			const markerGroup = [];

			for (let i = 0; i < markers.length; i++) {
				markerGroup.push(createMarker(markers[i], map));
			}

			// @ts-ignore
			markerGroups.push(new L.featureGroup(markerGroup));

			map.fitBounds(markerGroups[0].getBounds());
		} catch (e) {
			console.log('Map already init..');
		}
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<div {...atts}>
			{/*
			<div className={`${base}__elements`}>
				<Chooser />
			</div>
			*/}
			<div className={`${base}__map`} id={id} />
		</div>
	);
});
