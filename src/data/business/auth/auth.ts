import {
	ILoginResponse,
	ILoginRequest,
	ISendOTPResponse,
	IVerifyOTPEmailRegister,
	IRegisterResponse,
	ISendOTPEmailRegister,
	IRegisterRequest,
	IChangePasswordRequest,
	ICheckPasswordRequest,
	ICheckPasswordResponse,
	IUpdateAvatarRequest,
	IUpdateAvatarResponse,
	IChangeEmailOTPRequest,
	IChangeEmailOTPResponse,
	IChangeEmailRequest,
	IChangeEmailResponse,
	IChangePhoneOTPRequest,
	IChangePhoneOTPResponse,
	IChangePhoneRequest,
	IChangePhoneResponse,
	ICheckUserRequest,
	ICheckUserResponse,
	ISendOTPPhoneRegister,
	IVerifyOTPPhoneRegister,
	IForgotPasswordRequest,
	IVerifyOTPForgotPassword
} from '../../services/auth/IAuthService';
import { IResponseSuccess, HandleError } from '../../services/error/response';
import { IAuthServiceData, AuthService } from '../../services/auth/auth-service';

export interface IAuthServiceAltea {
	loginService(req: ILoginRequest, handler: IResponseSuccess): void;
	register(req: IRegisterRequest, handler: IResponseSuccess): void;
	sendOTPEmailRegister(req: ISendOTPEmailRegister, handler: IResponseSuccess): void;
	sendOTPPhoneRegister(req: ISendOTPPhoneRegister, handler: IResponseSuccess): void;
	verifyOTPEmailRegister(req: IVerifyOTPEmailRegister, handler: IResponseSuccess): void;
	verifyOTPPhoneRegister(req: IVerifyOTPPhoneRegister, handler: IResponseSuccess): void;
	registrationChangeEmail(req: ISendOTPEmailRegister, token: string, handler: IResponseSuccess): void;
	registrationChangePhone(req: ISendOTPPhoneRegister, token: string, handler: IResponseSuccess): void;
	requestForgotPassword(req: IForgotPasswordRequest, handler: IResponseSuccess): void;
	verifyOTPForgotPassword(req: IVerifyOTPForgotPassword, handler: IResponseSuccess): void;
	checkPassword(req: ICheckPasswordRequest, handler: IResponseSuccess): void;
	changePassword(req: IChangePasswordRequest, handler: IResponseSuccess, token?: string): void;
	Logout(handler: IResponseSuccess): void;
	updateAvatar(req: IUpdateAvatarRequest, handler: IResponseSuccess): void;
	deleteAvatar(handler: IResponseSuccess): void;
	sendOTPChangeEmail(req: IChangeEmailOTPRequest, handler: IResponseSuccess): void;
	changeEmail(req: IChangeEmailRequest, handler: IResponseSuccess): void;
	sendOTPChangePhone(req: IChangePhoneOTPRequest, handler: IResponseSuccess): void;
	changePhone(req: IChangePhoneRequest, handler: IResponseSuccess): void;
	checkUser(req: ICheckUserRequest, handler: IResponseSuccess): void;
}

export class AuthServiceAltea implements IAuthServiceAltea {
	private _service: IAuthServiceData;

	constructor() {
		this._service = new AuthService();
	}

	async loginService(req: ILoginRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.login(req);
			return await handler.Success<ILoginResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async register(req: IRegisterRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.register(req);
			return await handler.Success<IRegisterResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async sendOTPEmailRegister(req: ISendOTPEmailRegister, handler: IResponseSuccess) {
		try {
			const response = await this._service.sendOTPEmailRegister(req);
			return await handler.Success<ISendOTPResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async sendOTPPhoneRegister(req: ISendOTPPhoneRegister, handler: IResponseSuccess) {
		try {
			const response = await this._service.sendOTPPhoneRegister(req);
			return await handler.Success<ISendOTPResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async verifyOTPPhoneRegister(req: IVerifyOTPPhoneRegister, handler: IResponseSuccess) {
		try {
			const response = await this._service.verifyOTPPhoneRegister(req);
			return await handler.Success<any>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async verifyOTPEmailRegister(req: IVerifyOTPEmailRegister, handler: IResponseSuccess) {
		try {
			const response = await this._service.verifyOTPEmailRegister(req);
			return await handler.Success<any>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async registrationChangeEmail(req: ISendOTPEmailRegister, token: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.registrationChangeEmail(req, token);
			return await handler.Success<any>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async registrationChangePhone(req: ISendOTPPhoneRegister, token: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.registrationChangePhone(req, token);
			return await handler.Success<any>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async requestForgotPassword(req: IForgotPasswordRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.requestForgotPassword(req);
			return await handler.Success<any>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async verifyOTPForgotPassword(req: IVerifyOTPForgotPassword, handler: IResponseSuccess) {
		try {
			const response = await this._service.verifyOTPForgotPassword(req);
			return await handler.Success<any>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async checkPassword(req: ICheckPasswordRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.CheckPassword(req);
			return await handler.Success<ICheckPasswordResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async changePassword(req: IChangePasswordRequest, handler: IResponseSuccess, token?: string,) {
		try {
			const response = await this._service.ChangePassword(req, token);
			return await handler.Success<any>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async Logout(handler: IResponseSuccess) {
		try {
			const response = await this._service.Logout();
			return await handler.Success<any>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async updateAvatar(req: IUpdateAvatarRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.updateAvatar(req);
			return await handler.Success<IUpdateAvatarResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async deleteAvatar(handler: IResponseSuccess) {
		try {
			const response = await this._service.deleteAvatar();
			return await handler.Success<IUpdateAvatarResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async sendOTPChangeEmail(req: IChangeEmailOTPRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.sendOTPChangeEmail(req);
			return await handler.Success<IChangeEmailOTPResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async changeEmail(req: IChangeEmailRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.changeEmail(req);
			return await handler.Success<IChangeEmailResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async sendOTPChangePhone(req: IChangePhoneOTPRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.sendOTPChangePhone(req);
			return await handler.Success<IChangePhoneOTPResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async changePhone(req: IChangePhoneRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.changePhone(req);
			return await handler.Success<IChangePhoneResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async checkUser(req: ICheckUserRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.checkUser(req);
			return await handler.Success<ICheckUserResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
}