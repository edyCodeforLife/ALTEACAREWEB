
export interface ISpecializationResponse {
	status: boolean;
	message: string;
	data: IDoctorSpecialist[];
}

export interface IDoctorSpecialist {
	specialization_id: string;
	name: string;
	description: string;
	icon: IIcon;
	sub_specialization: ISubSpecialist[];
}

export interface ISubSpecialist {
	specialization_id: string;
	name: string;
	description: string;
	icon: IIcon;
}

export interface IIcon {
	url: string;
	format: IFormatIcon;
}

export interface IFormatIcon {
	thumbnail: string;
	large: string;
	medium: string;
	small: string;
}

export interface IHospitalResponse {
	status: boolean;
	message: string;
	data: IHospitalList[];
}

export interface IHospitalList {
	hospital_id: string;
	name: string;
	phone: string;
	address: string;
	latitude: string;
	longitude: string;
	image: IIcon;
	icon: IIcon;
}

export interface IDoctorListResponse {
	status: boolean;
	message: string;
	data: IDoctorList[]
}

export interface IDoctorList {
	doctor_id: string;
	name: string;
	about: string;
	overview: string;
	photo: IIcon;
	sip: string;
	experience: string;
	price: IPrice;
	specialization: IDoctorSpecialization;
	hospital: IHospital[];
}

export interface IHospital {
	id: string;
	name: string;
	image: IIcon;
	icon: IIcon;
	available_day?: string[];
}

export interface IPrice {
	raw: number;
	formatted: string;
}

export interface IDoctorSpecialization {
	id: string;
	name: string;
}

export interface ICountriesResponse {
	status: boolean;
	message: string;
	data: ICountriesList[];
}

export interface ICountriesList {
	code: string;
	country_id: string;
	name: string;
}

export interface IBlocksResponse {
	status: boolean;
	message: string;
	data: IBlockData[];
}

export interface IBlockData {
	block_id: string;
	title: string;
	type: string;
	text: string;
}

export interface IDoctorDetailResponse {
	status: boolean;
	message: string;
	data: IDataDoctorDetail;
}

export interface IDataDoctorDetail extends IDoctorList {
	slug: string;
	is_popular: boolean;
}

export interface IResponseDoctorSchedule {
	status: boolean;
	message: string;
	data: IDataSchedule[];
}

export interface IDataSchedule {
	code: string;
	date: Date | string;
	start_time: string;
	end_time: string;
}

export interface IResponseUploadPatient {
	status: boolean
	message: string;
	data: IDataResponseUploadPatient;
}

export interface IDataResponseUploadPatient {
	id: string;
	name: string;
	size: number;
	size_formatted: string;
	url: string;
	formats: IFormatIcon;
}

export interface IResponsePaymentMethod {
	status: boolean;
	message: string;
	data: IDataPaymentMethod[];
}

export interface IDataPaymentMethod {
	type: string;
	payment_methods: IPaymentVariant[];
}

export interface IPaymentVariant {
	code: string;
	name: string;
	description: string;
	provider: string;
	icon: string;
	data: any;
}

export interface IResponseFAQ {
	status: boolean;
	message: string;
	data: IDataFaq[];
}

export interface IDataFaq {
	faq_id: string;
	question: string;
	answer: string;
}

export interface IResponseCentralInformation {
	status: boolean;
	message: string;
	data: IDataCentralInformation;
}

export interface IDataCentralInformation {
	content_id: string;
	title: string;
	type: string;
	content: IInformationContent;
}

export interface IInformationContent {
	email: string;
	phone: string;
}

export interface IResponseMessageType {
	status: boolean;
	message: string;
	data: IDataMessageType[];
}

export interface IDataMessageType {
	id: string;
	name: string;
}

export interface ISendMessageRequest {
	name: string;
	email: string;
	message_type: string;
	message: string;
	phone: string;
	user_id?: string;
}

export interface IResponseSendMessage {
	status: boolean;
	message: string;
	data: any;
}

export interface IResponseGeneralSearch {
	status: boolean;
	message: string;
	data: IDataGeneralSearch;
}

export interface IDataGeneralSearch {
	doctor: IDoctor[],
	symtom: symptom[];
	specialization: IDoctorSpecialization[]
}

export interface symptom {
	symtom_id: string;
	name: string;
}

export interface IDoctor {
	doctor_id: string;
	name: string;
	slug: string;
	is_popular: boolean;
	about: string | HTMLElement;
	overview: string;
	photo: IPhoto;
	sip: string;
	experience: string;
	price: IPrice;
	specialization: IDoctorSpecialization;
	hospital: IHospital[],
	available_day_all_hospital: string[];
	is_available: boolean;
	about_preview: string;
}

export interface IPhoto {
	size_formatted: string;
	url: string;
	formats: IFormatIcon;
}

export type is_popular = "YES" | "NO";

export interface IResponseBanner {
	status: boolean;
	message: string;
	data: IBannerData[];
}

export interface IBannerData {
	banner_id: string;
	title: string;
	type: string;
	description: string;
	need_login: boolean;
	deeplink_type_android: string;
	deeplink_url_android: string;
	deeplink_type_ios: string;
	deeplink_url_ios: string;
	url_web: string;
	image_mobile: string;
	image_desktop: string;
}

export interface IResponseSosMed {
	status: boolean;
	message: string;
	data: IDataSosMed[];
}

export interface IDataSosMed {
	content_id: string;
	title: string;
	type: string;
	content: IContentSosMed[];
}

export interface IContentSosMed {
	name: string;
	url: string;
	img: string;
}