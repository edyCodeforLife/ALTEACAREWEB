import { AxiosPromise } from 'axios';
import {
	ISpecializationResponse,
	IHospitalResponse,
	IResponseMessageType,
	IResponseCentralInformation,
	IResponseFAQ,
	IResponseDoctorSchedule,
	IDoctorDetailResponse,
	IBlocksResponse,
	IDoctorListResponse,
	ICountriesResponse,
	IResponseUploadPatient,
	IResponsePaymentMethod,
	ISendMessageRequest,
	IResponseSendMessage,
	IResponseGeneralSearch,
	is_popular,
	IResponseBanner,
	IResponseSosMed
} from './IAlteaCMS';
import { DataService } from '../config';
import { IhandlerUploadResponse } from '../error/response';

export interface IAlteaCMSData {
	GetDoctorSpecialist(): AxiosPromise<ISpecializationResponse>;
	GetPopularSpecialist(): AxiosPromise<ISpecializationResponse>;
	GetHospital(): AxiosPromise<IHospitalResponse>;
	GetDoctorList(query: string): AxiosPromise<IDoctorListResponse>;
	GetDoctorDetail(doctor_id: string): AxiosPromise<IDoctorDetailResponse>;
	GetCountry(): AxiosPromise<ICountriesResponse>;
	GetCities(query: string): AxiosPromise<any>;
	GetBlocks(query: string): AxiosPromise<IBlocksResponse>;
	GetDoctorSchedule(doctor_id: string, date: string): AxiosPromise<IResponseDoctorSchedule>;
	UploadDocumentFiles(formData: FormData, handler?: IhandlerUploadResponse): AxiosPromise<IResponseUploadPatient>
	GetPaymentMethod(): AxiosPromise<IResponsePaymentMethod>;
	GetFAQ(): AxiosPromise<IResponseFAQ>;
	GetCentralInformation(): AxiosPromise<IResponseCentralInformation>;
	GetMessageType(): AxiosPromise<IResponseMessageType>;
	SendMessage(req: ISendMessageRequest): AxiosPromise<IResponseSendMessage>;
	GeneralSearch(query: string): AxiosPromise<IResponseGeneralSearch>;
	GetBanners(): AxiosPromise<IResponseBanner>;
	GetSosMed(): AxiosPromise<IResponseSosMed>;
}

export class AlteaCMSData implements IAlteaCMSData {
	GetDoctorSpecialist(): AxiosPromise<ISpecializationResponse> {
		return DataService.get<ISpecializationResponse>('/data/specializations?_sort=name:ASC');
	}

	GetPopularSpecialist(): AxiosPromise<ISpecializationResponse> {
		return DataService.get<ISpecializationResponse>('/data/specializations?is_popular=YES');
	}

	GetHospital(): AxiosPromise<IHospitalResponse> {
		return DataService.get<IHospitalResponse>(`/data/hospitals`);
	}

	GetDoctorList(query: string): AxiosPromise<IDoctorListResponse> {
		return DataService.get<IDoctorListResponse>(`/data/doctors${query}`);
	}

	GetMessageType(): AxiosPromise<IResponseMessageType> {
		return DataService.get<IResponseMessageType>('/data/message-types');
	}

	GetDoctorDetail(doctor_id: string): AxiosPromise<IDoctorDetailResponse> {
		return DataService.get<IDoctorDetailResponse>(`/data/doctors/${doctor_id}`);
	}

	GetCentralInformation(): AxiosPromise<IResponseCentralInformation> {
		return DataService.get<IResponseCentralInformation>(`/data/contents/PUSAT_INFORMASI`);
	}

	GetCountry(): AxiosPromise<any> {
		return DataService.get<ICountriesResponse>('/data/countries?_limit=1000&_sort=name:ASC');
	}

	GetCities(query: string): AxiosPromise<any> {
		return DataService.get<ICountriesResponse>(`/data/cities${query}`);
	}

	GetBlocks(query: string): AxiosPromise<IBlocksResponse> {
		return DataService.get<IBlocksResponse>(`/data/blocks${query}`);
	}

	GetDoctorSchedule(doctor_id: string, date: string): AxiosPromise<IResponseDoctorSchedule> {
		return DataService.get<IResponseDoctorSchedule>(`/data/doctor-schedules?doctor_id=${doctor_id}&date=${date}`);
	}

	GetPaymentMethod(): AxiosPromise<IResponsePaymentMethod> {
		return DataService.get<IResponsePaymentMethod>('/data/payment-types');
	}

	GetFAQ(): AxiosPromise<IResponseFAQ> {
		return DataService.get<IResponseFAQ>('/data/faqs');
	}

	SendMessage(req: ISendMessageRequest): AxiosPromise<IResponseSendMessage> {
		return DataService.post<IResponseSendMessage>('/data/messages', req);
	}

	UploadDocumentFiles(formData: FormData, handler?: IhandlerUploadResponse): AxiosPromise<IResponseUploadPatient> {
		const config = {
			onUploadProgress: function (progressEvent) {
				let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				if (handler && handler.PercentageTracker)
					handler.PercentageTracker(percentCompleted);
			}
		};
		return DataService.post<IResponseUploadPatient>('/data/upload-files', formData, config);
	}

	GeneralSearch(query: string): AxiosPromise<IResponseGeneralSearch> {
		return DataService.get<IResponseGeneralSearch>(`/data/search?${query}`);
	}

	GetBanners(): AxiosPromise<IResponseBanner> {
		return DataService.get<IResponseBanner>('/data/banners');
	}

	GetSosMed(): AxiosPromise<IResponseSosMed> {
		return DataService.get<IResponseSosMed>('/data/contents/SOCMED_FRONTEND_WEB');
	}
}