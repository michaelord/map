import {EventEmitter} from 'components/events';
import {getModifiers} from 'components/libs';
import * as Types from 'components/types';
import React, {memo} from 'react';
import {MapData} from './Map';
import './Map.scss';

export type GoogleMapProps = MapData & {
	apiKey: Types.Text;
};

export const GoogleMap = memo((props: GoogleMapProps) => {
	const base: string = 'map';
	const {size = '16:9', apiKey, zoom = 14, center, markers} = props;

	const ref = React.createRef<HTMLDivElement>();

	const atts: object = {
		className: getModifiers(base, {
			ratio: `ratio-${size}`,
		}),
	};

	// @ts-ignore
	if (!window.mapsCallback) {
		// @ts-ignore
		window.mapsCallback = function() {
			EventEmitter.dispatch('init-google-map');
		};

		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=mapsCallback`;

		document.body.appendChild(script);
	}

	const init = () => {
		// @ts-ignore
		const map = new google.maps.Map(ref.current, {
			center,
			zoom,
			scrollwheel: false,
			streetViewControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [],
			},
		});

		if (markers) {
			markers.forEach(marker => {
				// @ts-ignore
				const item = new google.maps.Marker(marker);

				item.setMap(map);
			});
		}
	};

	EventEmitter.subscribe(`init-google-map`, init);

	return (
		<div {...atts}>
			<div className={`${base}__map`} ref={ref} />
		</div>
	);
});
