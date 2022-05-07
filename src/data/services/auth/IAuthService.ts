export interface IData {
	is_registered: boolean;
	is_verified: boolean;
	access_token: string;
	refresh_token: string;
	is_email_verified: boolean;
	is_phone_verified: boolean;
	device_id: string;
}

export interface ILoginResponse {
	status: boolean;
	message: string;
	data: IData
}

export interface ILoginRequest {
	username: string;
	password: string;
}

export interface IRegisterRequest {
	email: string;
	phone: string;
	password: string;
	password_confirmation: string;
	first_name: string;
	last_name: string;
	birth_date: string;
	birth_place: string;
	birth_country: string;
	gender: string;
}

export interface IRegisterResponse {
	status: boolean;
	message: string;
	data: IDataRegister;
}

export interface IDataRegister {
	is_registered: boolean;
	is_verified: boolean;
	access_token: string;
	refresh_token: string;
	is_email_verified: boolean;
	is_phone_verified: boolean;
	device_id: string;
}

export interface ISendOTPEmailRegister {
	email: string;
}

export interface ISendOTPPhoneRegister {
	phone: string;
}

export interface ISendOTPResponse {
	status: boolean;
	message: string;
	data: string;
}

export interface IVerifyOTPEmailRegister extends ISendOTPEmailRegister {
	otp: string;
}

export interface IVerifyOTPPhoneRegister extends ISendOTPPhoneRegister {
	otp: string;
}

export interface IVerifyOTPForgotPassword extends IForgotPasswordRequest {
	otp: string;
}

export interface IChangePasswordRequest {
	password: string;
	password_confirmation: string;
}

export interface ICheckPasswordRequest {
	password: string;
}

export interface ICheckPasswordResponse {
	status: boolean;
	message: string;
	data: string;
}

export interface IUpdateAvatarRequest {
	avatar: string;
}

export interface IUpdateAvatarResponse {
	status: boolean;
	message: string;
	data: any;
}

export interface IChangeEmailOTPRequest {
	email: string;
}

export interface IChangeEmailOTPResponse {
	status: boolean;
	message: string;
	data: any;
}

export interface IChangeEmailRequest {
	email: string;
	otp: string;
}

export interface IChangeEmailResponse {
	status: boolean;
	message: string;
	data: any;
}

export interface IChangePhoneOTPRequest {
	phone: string;
}

export interface IChangePhoneOTPResponse {
	status: boolean;
	message: string;
	data: any;
}

export interface IChangePhoneRequest {
	phone: string;
	otp: string;
}

export interface IChangePhoneResponse {
	status: boolean;
	message: string;
	data: any;
}

export interface ICheckUserRequest {
	email?: string;
	phone?: string;
}

export interface ICheckUserResponse {
	status: boolean;
	message: string;
	data: IDataCheckUser;
}

export interface IDataCheckUser {
	is_email_available: boolean;
	email: IEmailCheck;
	is_phone_available: boolean;
	phone: IPhoneCheck;
}

export interface IEmailCheck {
	is_available: boolean;
	error: any;
	suggested_email: any;
}

export interface IPhoneCheck {
	is_available: boolean;
	error: any;
}

export interface IForgotPasswordRequest {
	username: string;
}