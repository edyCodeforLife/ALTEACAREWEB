import { IIcon, IDoctorSpecialization, IFormatIcon, IDataPaymentMethod } from "../alteaCMS/IAlteaCMS";
import { IGenderType, IUserAge } from '../profile/IProfile';

export interface IAppointmentRequest {
	date_start?: string | Date;
	date_end?: string | Date;
	doctor_id?: string;
	consultation_method?: string;
	hospital_id?: string
	specialist_id?: string;
	doctor_ids?: string[];
	hospital_ids?: string[];
	specialist_ids?: string[];
	status?: boolean | any;
	page?: number;
	sort_by?: string
	sort_type?: string;
	keyword?: string;
	schedule_date_start?: string;
	schedule_date_end?: string;
}

export type ISortType = "ASC" | "DESC";

export interface IResponseAppointment {
	status: boolean;
	message: string;
	meta: IMeta;
	data: IDataAppointment[];
}

export interface IMeta {
	page: number;
	per_page: number;
	total: number;
}

export interface IDataAppointment {
	id: number;
	order_code: string;
	status: string;
	status_detail: IStatusDetail;
	schedule: ISchedule;
	doctor: IDoctor;
	user: IUser;
	transaction: string | null;
	created: string | Date;
}

export interface IStatusDetail {
	label: string;
	text_color: string;
	bg_color: string;
}

export interface ISchedule {
	id: number;
	code: string;
	date: string | Date;
	time_start: string;
	time_end: string;
}

export interface IDoctor {
	id: string;
	name: string;
	photo: IIcon;
	specialist: IDoctorSpecialization;
	hospital: IHospital;
}

export interface IHospital {
	id: string;
	name: string;
	logo: string;
}

export interface IUser {
	id: string;
	name: string;
	first_name: string;
	last_name: string;
}

export interface ICreateAppointmentRequest {
	doctor_id: string;
	symptom_note: string;
	consultation_method: string;
	next_step: string;
	refference_appointment_id: string;
	schedules: IScheduleDoctor[];
	document_resume: string[];
}

export interface IScheduleDoctor {
	code: string;
	date: string;
	time_start: string;
	time_end: string;
}

export interface ICreateAppointmentResponse {
	status: boolean;
	message: string;
	data: IDataCreateAppointment;
}

export type AppointmentMethodType = "VIDEO_CALL" | "VOICE_CALL";

export interface IDataCreateAppointment {
	appointment_id: number;
	order_code: string;
	room_code: string;
	appointment_menthod: AppointmentMethodType;
	status: string;
	status_detail: IStatusDetail;
}

export interface IResponseAppointmentDetail {
	status: boolean;
	message: string;
	data: IDataAppointmentDetail;
}

export interface IDataAppointmentDetail {
	user_id: string;
	identity: string;
	room_code: string;
	expired_at: string;
	token: string;
	enable: IEnableStreamResponse;
}

export interface IEnableStreamResponse {
	video: boolean;
	voice: boolean;
	chat: boolean;
}

export interface IResponseAppointmentDescription {
	status: boolean;
	message: string;
	data: IDataAppointmentDescription;
}

export type StatusAppointment = 'NEW' |
	'PROCESS_GP' |
	'WAITING_FOR_PAYMENT' |
	'PAID' |
	'MEET_SPECIALIST' |
	'ON_GOING' |
	'WAITING_FOR_MEDICAL_RESUME' |
	'COMPLETED' |
	'REFUNDED' |
	'CANCELED_BY_SYSTEM' |
	'CANCELED_BY_GP' |
	'CANCELED_BY_USER' |
	'PAYMENT_EXPIRED' |
	'PAYMENT_FAILED';


export interface IDataAppointmentDescription {
	id: number;
	order_code: string;
	refference_appointment_id: string | null;
	status: StatusAppointment;
	status_detail: IStatusDetail;
	consultation_method: AppointmentMethodType;
	symptom_note: string | null,
	external_appointment_id: string;
	external_case_no: string;
	external_appointment_error: string;
	external_case_error: string;
	schedule: ISchedule;
	doctor: IDoctor;
	user: IUserDetail;
	total_price: number;
	transaction: any;
	medical_resume: any;
	medical_document: any[];
	fees: IFees[];
	history: IHistory[];
	notes: string | null;
	notes_at: string | null;
	notes_by: string | null;
	canceled_notes: string | null;
	canceled_at: string | null;
	canceled_by: string | null;
	created: string;
}

export interface IUserDetail {
	id: string;
	name: string;
	first_name: string;
	last_name: string;
	birthdate: string;
	gender: IGenderType;
	phone_number: string;
	email: string;
	address: string;
	address_raw: any[];
	card_id: string;
	age: IUserAge;
	avatar: any;
}

export interface IFees {
	id: number;
	type: string;
	label: string;
	amount: number;
	status: StatusAppointment;
	created_at: string;
}

export interface IHistory {
	id: number;
	status: StatusAppointment;
	label: string;
	description: string;
	icon: string;
	created: string;
}

export interface IRequestAddDocument {
	appointment_id: number;
	file: string;
}

export interface IResponseAddDocument {
	status: boolean
	message: string;
	data: IDataResponseAddDocument;
}

export interface IDataResponseAddDocument {
	id: number;
	file_id: string;
	url: string;
	original_name: string;
	size: string
	date_raw: string;
	date: string;
	upload_by_user: number;
}

export interface IRequestRemoveDocument {
	appointment_id: number;
	document_id: number;
}

export interface IRequestPay {
	appointment_id: number;
	method: string;
}

export interface IResponsePay {
	status: boolean;
	message: string;
	data: IDataPay;
}

export interface IDataPay {
	type: string;
	token: string;
	redirect_url: string;
	ref_id: string;
	provider: string;
	total: number;
	expiredAt: string | Date;
}



