import { AxiosPromise } from 'axios';
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
} from './IAuthService';
import { DataService } from '../config';

export interface IAuthServiceData {
	login(req: ILoginRequest): AxiosPromise<ILoginResponse>;
	register(req: IRegisterRequest): AxiosPromise<IRegisterResponse>;
	sendOTPEmailRegister(req: ISendOTPEmailRegister): AxiosPromise<ISendOTPResponse>;
	sendOTPPhoneRegister(req: ISendOTPPhoneRegister): AxiosPromise<ISendOTPResponse>;
	verifyOTPEmailRegister(req: IVerifyOTPEmailRegister): AxiosPromise<any>;
	verifyOTPPhoneRegister(req: IVerifyOTPPhoneRegister): AxiosPromise<any>;
	registrationChangeEmail(req: ISendOTPEmailRegister, token: string): AxiosPromise<any>;
	registrationChangePhone(req: ISendOTPPhoneRegister, token: string): AxiosPromise<any>;
	requestForgotPassword(req: IForgotPasswordRequest): AxiosPromise<any>;
	verifyOTPForgotPassword(req: IVerifyOTPForgotPassword): AxiosPromise<any>;
	CheckPassword(req: ICheckPasswordRequest): AxiosPromise<ICheckPasswordResponse>;
	ChangePassword(req: IChangePasswordRequest, token?: string): AxiosPromise<any>;
	Logout(): AxiosPromise<any>;
	updateAvatar(req: IUpdateAvatarRequest): AxiosPromise<IUpdateAvatarResponse>;
	deleteAvatar(): AxiosPromise<IUpdateAvatarResponse>;
	sendOTPChangeEmail(req: IChangeEmailOTPRequest): AxiosPromise<IChangeEmailOTPResponse>;
	changeEmail(req: IChangeEmailRequest): AxiosPromise<IChangeEmailResponse>;
	sendOTPChangePhone(req: IChangePhoneOTPRequest): AxiosPromise<IChangePhoneOTPResponse>;
	changePhone(req: IChangePhoneRequest): AxiosPromise<IChangePhoneResponse>;
	checkUser(req: ICheckUserRequest): AxiosPromise<ICheckUserResponse>;
}

const config = (token) => {
	return {
		headers: { Authorization: `Bearer ${token}` }
	}
};

export class AuthService implements IAuthServiceData {
	login(req: ILoginRequest): AxiosPromise<ILoginResponse> {
		return DataService.post<ILoginResponse>('/user/auth/login', req);
	}

	register(req: IRegisterRequest): AxiosPromise<IRegisterResponse> {
		return DataService.post<IRegisterResponse>('/user/auth/register', req);
	}

	sendOTPEmailRegister(req: ISendOTPEmailRegister): AxiosPromise<ISendOTPResponse> {
		return DataService.post<ISendOTPResponse>('/user/email/verification', req);
	}

	sendOTPPhoneRegister(req: ISendOTPPhoneRegister): AxiosPromise<ISendOTPResponse> {
		return DataService.post<ISendOTPResponse>('/user/phone/verification', req);
	}

	verifyOTPEmailRegister(req: IVerifyOTPEmailRegister): AxiosPromise<any> {
		return DataService.post<any>('/user/email/verify', req);
	}

	verifyOTPPhoneRegister(req: IVerifyOTPPhoneRegister): AxiosPromise<any> {
		return DataService.post<any>('/user/phone/verify', req);
	}

	registrationChangeEmail(req: ISendOTPEmailRegister, token: string): AxiosPromise<any> {
		return DataService.post<any>('/user/email/change/register', req, config(token));
	}

	registrationChangePhone(req: ISendOTPPhoneRegister, token: string): AxiosPromise<any> {
		return DataService.post<any>('/user/phone/change/register', req, config(token));
	}

	requestForgotPassword(req: IForgotPasswordRequest): AxiosPromise<any> {
		return DataService.post<any>('/user/password/forgot', req);
	}

	verifyOTPForgotPassword(req: IVerifyOTPForgotPassword): AxiosPromise<any> {
		return DataService.post<any>('/user/password/verify', req);
	}

	CheckPassword(req: ICheckPasswordRequest): AxiosPromise<ICheckPasswordResponse> {
		return DataService.post<ICheckPasswordResponse>('/user/password/check', req);
	}

	ChangePassword(req: IChangePasswordRequest, token?: string): AxiosPromise<any> {
		return DataService.post<any>('/user/password/change', req, config(token));
	}

	Logout(): AxiosPromise<any> {
		return DataService.post<any>('/user/auth/logout');
	}

	updateAvatar(req: IUpdateAvatarRequest): AxiosPromise<IUpdateAvatarResponse> {
		return DataService.post<IUpdateAvatarResponse>('/user/profile/update-avatar', req);
	}

	deleteAvatar(): AxiosPromise<IUpdateAvatarResponse> {
		return DataService.delete<IUpdateAvatarResponse>('/user/profile/update-avatar');
	}

	sendOTPChangeEmail(req: IChangeEmailOTPRequest): AxiosPromise<IChangeEmailOTPResponse> {
		return DataService.post<IChangeEmailOTPResponse>('/user/email/change/otp', req);
	}

	changeEmail(req: IChangeEmailRequest): AxiosPromise<IChangeEmailResponse> {
		return DataService.post<IChangeEmailResponse>('/user/email/change', req);
	}

	sendOTPChangePhone(req: IChangePhoneOTPRequest): AxiosPromise<IChangePhoneOTPResponse> {
		return DataService.post<IChangePhoneOTPResponse>('/user/phone/change/otp', req);
	}

	changePhone(req: IChangePhoneRequest): AxiosPromise<IChangePhoneResponse> {
		return DataService.post<IChangePhoneResponse>('/user/phone/change', req);
	}

	checkUser(req: ICheckUserRequest): AxiosPromise<ICheckUserResponse> {
		return DataService.post<ICheckUserResponse>('/user/users/check-user', req);
	}
}