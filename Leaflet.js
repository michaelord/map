let L = () => {};

if (typeof window !== `undefined`) {
	L = require('leaflet');
}

export default L;
