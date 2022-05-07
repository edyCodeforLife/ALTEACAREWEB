import axios from 'axios';

export const BaseAPI = () => {
	switch (process.env.ENDPOINT) {
		case "production":
			return "https://services.alteacare.com/";
		case "staging":
			return "https://staging-services.alteacare.com/";
		case "development":
			return "https://dev-services.alteacare.com/";
	}
}

export const DataService = axios.create({ baseURL: BaseAPI() });