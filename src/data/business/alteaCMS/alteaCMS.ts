import {
	ISpecializationResponse,
	IHospitalResponse,
	IResponseDoctorSchedule,
	IDoctorDetailResponse,
	IDoctorListResponse,
	ICountriesResponse,
	IBlocksResponse,
	IResponseUploadPatient,
	IResponsePaymentMethod,
	IResponseFAQ,
	IResponseCentralInformation,
	IResponseMessageType,
	ISendMessageRequest,
	IResponseSendMessage,
	IResponseGeneralSearch,
	is_popular,
	IResponseBanner,
	IResponseSosMed
} from '../../services/alteaCMS/IAlteaCMS';
import { IResponseSuccess, HandleError, IhandlerUploadResponse } from '../../services/error/response';
import { AlteaCMSData, IAlteaCMSData } from '../../services/alteaCMS/alteaCMS';

export interface IAlteaCMSService {
	GetDoctorSpecialist(handler: IResponseSuccess): void;
	GetPopularSpecialist(handler: IResponseSuccess): void;
	GetHospital(handler: IResponseSuccess): void;
	GetDoctorList(query: string, handler: IResponseSuccess): void;
	GetDoctorDetail(doctor_id: string, handler: IResponseSuccess): void;
	GetCountry(handler: IResponseSuccess): void;
	GetBlocks(query: string, handler: IResponseSuccess): void;
	GetFAQ(handler: IResponseSuccess): void;
	GetPaymentMethod(handler: IResponseSuccess): void;
	GetDoctorSchedule(doctor_id: string, date: string, handler: IResponseSuccess): void;
	GetCentralInformation(handler: IResponseSuccess): void;
	UploadDocumentFiles(formData: FormData, handler: IhandlerUploadResponse): void;
	GetMessageType(handler: IResponseSuccess): void;
	SendMessage(req: ISendMessageRequest, handler: IResponseSuccess): void;
	GeneralSearch(query: string, handler: IResponseSuccess): void;
	GetBanners(handler: IResponseSuccess): void;
	GetSosMed(handler: IResponseSuccess): void;
}

export class AlteaCMSService implements IAlteaCMSService {
	private _service: IAlteaCMSData;

	constructor() {
		this._service = new AlteaCMSData();
	}

	async GetDoctorSpecialist(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetDoctorSpecialist();
			return await handler.Success<ISpecializationResponse>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GetPopularSpecialist(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetPopularSpecialist();
			return await handler.Success<ISpecializationResponse>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GetFAQ(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetFAQ();
			return await handler.Success<IResponseFAQ>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GetMessageType(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetMessageType();
			return await handler.Success<IResponseMessageType>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GetCentralInformation(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetCentralInformation();
			return await handler.Success<IResponseCentralInformation>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GetHospital(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetHospital();
			return await handler.Success<IHospitalResponse>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GetDoctorList(query: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetDoctorList(query);
			return await handler.Success<IDoctorListResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetDoctorDetail(doctor_id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetDoctorDetail(doctor_id);
			return await handler.Success<IDoctorDetailResponse>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GetCountry(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetCountry();
			return await handler.Success<ICountriesResponse>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GetPaymentMethod(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetPaymentMethod();
			return await handler.Success<IResponsePaymentMethod>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GetBlocks(query: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetBlocks(query);
			return await handler.Success<IBlocksResponse>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GetDoctorSchedule(doctor_id: string, date: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetDoctorSchedule(doctor_id, date);
			return await handler.Success<IResponseDoctorSchedule>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async UploadDocumentFiles(formData: FormData, handler: IhandlerUploadResponse) {
		try {
			const response = await this._service.UploadDocumentFiles(formData, handler);
			return await handler.Success<IResponseUploadPatient>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async SendMessage(req: ISendMessageRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.SendMessage(req);
			return await handler.Success<IResponseSendMessage>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GeneralSearch(query: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GeneralSearch(query);
			return await handler.Success<IResponseGeneralSearch>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetBanners(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetBanners();
			return await handler.Success<IResponseBanner>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GetSosMed(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetSosMed();
			return await handler.Success<IResponseSosMed>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

}