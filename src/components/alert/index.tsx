import { uniqueId } from 'lodash';
import { createElement } from 'react';
import ReactDOM from 'react-dom';

import { IAlertShow, ModAlertWeb } from './alteaAlert';

interface IAlert {
	show: (params: IAlertShow) => void;
}

export const AltAlert: IAlert = {
	show: (params: IAlertShow) => {
		const getElement: any = () => {
			return createElement(ModAlertWeb, { ...params, key: uniqueId() });
		};

		ReactDOM.render(getElement(), document.getElementById('alerts'));

	}
};
