import { AxiosPromise } from 'axios';
import { IProfileResponse } from './IProfile';
import { DataService } from '../config';

export interface IProfileServiceData {
	getProfile(): AxiosPromise<IProfileResponse>;
}

export class ProfileService implements IProfileServiceData {

	getProfile(): AxiosPromise<IProfileResponse> {
		return DataService.get<IProfileResponse>('/user/profile/me');
	}

}