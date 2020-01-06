import {useScript} from 'components/hooks';
import {getModifiers} from 'components/libs';
import React, {memo} from 'react';
import './Earth.scss';
import {MapData, Marker} from './Map';

export type EarthProps = MapData & {};

export const Earth = memo((props: EarthProps) => {
	const base: string = 'earth';

	const [loaded, error] = useScript('//www.webglearth.com/v2/api.js');

	const ref = React.createRef<HTMLDivElement>();

	const {center, zoom = 2} = props;

	const atts: object = {
		className: getModifiers(base, {
			//ratio: `ratio-${size}`,
		}),
		ref,
		id: 'earth_div',
	};

	let earth: any;

	const {markers} = props;

	const init = () => {
		// @ts-ignore
		earth = new WE.map('earth_div');

		earth.setView([center.lat, center.lat], zoom);

		// @ts-ignore
		WE.tileLayer('//webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
			tileSize: 256,
			bounds: [
				[-85, -180],
				[85, 180],
			],
			minZoom: 0,
			maxZoom: 16,
			attribution: '',
			tms: true,
			atmosphere: true,
		}).addTo(earth);

		if (markers) {
			for (let i = 0; i < markers.length; i++) {
				// @ts-ignore
				var marker = WE.marker([markers[i].position.lat, markers[i].position.lng]).addTo(earth);
				marker.bindPopup(markers[i].title, {maxWidth: 150, closeButton: true}).openPopup();
			}
		}

		return null;

		// @ts-ignore
		/*
		var marker = WE.marker([51.5, -0.09]).addTo(earth);
		marker.bindPopup('<b>Hello world!</b><br>I am a popup.', {maxWidth: 150, closeButton: true}).openPopup();

		// @ts-ignore
		var marker2 = WE.marker([30.058056, 31.228889]).addTo(earth);
		marker2.bindPopup('<b>Cairo</b><br>Yay, you found me!', {maxWidth: 120, closeButton: true}).openPopup();
		*/
	};

	/*

  <input type="button" value="Fly to Japan bounds" onclick="flyToJapan()"><br>
      <input type="button" value="Fly to Iceland" onclick="panTo([65, -19]);"><br>
      <input type="button" value="Fly to Cairo" onclick="panTo([30.058056, 31.228889]);"><br>


    function setZoom(zoom) {
        earth.setZoom(zoom);
      }


	  function getZoomLevel() {
        console.log('Current zoom is: ' + Math.round(earth.getZoom()));
      }

	  function flyToJapan() {
        earth.fitBounds([[22, 122], [48, 154]]);
        earth.panInsideBounds([[22, 122], [48, 154]],
                {heading: 90, tilt: 25, duration: 1});
      }

      function panTo(coords, zoom) {
		setZoom(5)
        earth.panTo(coords);
      }
      */

	/*

	if (!window.mapsCallback) {
		window.mapsCallback = function() {
			EventEmitter.dispatch('init-google-map');
		};

		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=mapsCallback`;

		document.body.appendChild(script);
    }
    */

	/*

	const init = () => {
		const lat = 52.486242;
		const lng = -1.890401;
		const zoom = 14;

		// @ts-ignore
		const map = new google.maps.Map(ref.current, {
			center: {
				lat,
				lng,
			},
			zoom,
			scrollwheel: false,
			streetViewControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [],
			},
		});
	};

    EventEmitter.subscribe(`init-google-map`, init);
    */

	return (
		<>
			<div>
				{/*<div>
        Script loaded: <b>{loaded.toString()}</b>
      </div>
      */}
				{loaded && !error && <div>{init()}</div>}
			</div>

			<div {...atts} />
		</>
	);
});
