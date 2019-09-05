import * as React from 'react';

import './Map.scss';

import {getModifiers} from 'components/libs';

type Props = {};

export const GoogleMap = (props: Props) => {
	const base: string = 'map';

	const atts: object = {
		className: getModifiers(base, {
			ratio: 'ratio-3:1',
		}),
	};

	return <div {...atts} />;
};
