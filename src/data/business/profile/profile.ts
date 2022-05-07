import {
	IProfileResponse
} from '../../services/profile/IProfile';
import { IResponseSuccess, HandleError } from '../../services/error/response';
import { ProfileService, IProfileServiceData } from '../../services/profile/profile';

export interface IProfileUserService {
	getProfile(handler: IResponseSuccess): void;
}

export class ProfileUserService implements IProfileUserService {
	private _service: IProfileServiceData;

	constructor() {
		this._service = new ProfileService();
	}

	async getProfile(handler: IResponseSuccess) {
		try {
			const response = await this._service.getProfile();
			return await handler.Success<IProfileResponse>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}
}