import {
	IAppointmentRequest,
	IResponseAppointment,
	ICreateAppointmentRequest,
	ICreateAppointmentResponse,
	IResponseAppointmentDetail,
	IResponseAppointmentDescription,
	IRequestAddDocument,
	IResponseAddDocument,
	IRequestRemoveDocument,
	IRequestPay,
	IResponsePay
} from '../../services/appointment/IAppointment';
import { IResponseSuccess, HandleError } from '../../services/error/response';
import { AppointmentServiceData, IAppointmentServiceData } from '../../services/appointment/appointment';

export interface IAppointmentService {
	listAppointmentOngoing(req: IAppointmentRequest, handler: IResponseSuccess): void;
	listAppointmentHistory(req: IAppointmentRequest, handler: IResponseSuccess): void;
	listAppointmentCancelled(req: IAppointmentRequest, handler: IResponseSuccess): void;
	createAppointment(req: ICreateAppointmentRequest, handler: IResponseSuccess): void;
	appointmentDetail(param: number, handler: IResponseSuccess): void;
	appointmentDescription(appointment_id: number, handler: IResponseSuccess): void;
	addDocument(req: IRequestAddDocument, handler: IResponseSuccess): void;
	removeDocument(req: IRequestRemoveDocument, handler: IResponseSuccess): void;
	appointmentPay(req: IRequestPay, handler: IResponseSuccess): void;
}

export class AppointmentService implements IAppointmentService {
	private _service: IAppointmentServiceData;

	constructor() {
		this._service = new AppointmentServiceData();
	}

	async createAppointment(req: ICreateAppointmentRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.createAppointment(req);
			return await handler.Success<ICreateAppointmentResponse>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async listAppointmentOngoing(req: IAppointmentRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.listAppointmentOngoing(req);
			return await handler.Success<IResponseAppointment>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async listAppointmentHistory(req: IAppointmentRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.listAppointmentHistory(req);
			return await handler.Success<IResponseAppointment>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async listAppointmentCancelled(req: IAppointmentRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.listAppointmentCancelled(req);
			return await handler.Success<IResponseAppointment>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async appointmentDetail(param: number, handler: IResponseSuccess) {
		try {
			const response = await this._service.appointmentDetail(param);
			return await handler.Success<IResponseAppointmentDetail>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async appointmentDescription(appointment_id: number, handler: IResponseSuccess) {
		try {
			const response = await this._service.appointmentDescription(appointment_id);
			return await handler.Success<IResponseAppointmentDescription>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async addDocument(req: IRequestAddDocument, handler: IResponseSuccess) {
		try {
			const response = await this._service.addDocument(req);
			return await handler.Success<IResponseAddDocument>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async removeDocument(req: IRequestRemoveDocument, handler: IResponseSuccess) {
		try {
			const response = await this._service.removeDocument(req);
			return await handler.Success<any>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async appointmentPay(req: IRequestPay, handler: IResponseSuccess) {
		try {
			const response = await this._service.appointmentPay(req);
			return await handler.Success<IResponsePay>(response.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
}