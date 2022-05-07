import { AxiosPromise } from 'axios';
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

} from './IAppointment';
import { DataService } from '../config';

export interface IAppointmentServiceData {
	createAppointment(req: ICreateAppointmentRequest): AxiosPromise<ICreateAppointmentResponse>;
	listAppointmentOngoing(req: IAppointmentRequest): AxiosPromise<IResponseAppointment>;
	listAppointmentHistory(req: IAppointmentRequest): AxiosPromise<IResponseAppointment>;
	listAppointmentCancelled(req: IAppointmentRequest): AxiosPromise<IResponseAppointment>;
	appointmentDetail(param: number): AxiosPromise<IResponseAppointmentDetail>;
	appointmentDescription(appointment_id: number): AxiosPromise<IResponseAppointmentDescription>;
	addDocument(req: IRequestAddDocument): AxiosPromise<IResponseAddDocument>;
	removeDocument(req: IRequestRemoveDocument): AxiosPromise<any>;
	appointmentPay(req: IRequestPay): AxiosPromise<IResponsePay>;
}

export class AppointmentServiceData implements IAppointmentServiceData {

	createAppointment(req: ICreateAppointmentRequest): AxiosPromise<ICreateAppointmentResponse> {
		return DataService.post<ICreateAppointmentResponse>('/appointment/make-consultation', req);
	}

	listAppointmentOngoing(req: IAppointmentRequest): AxiosPromise<IResponseAppointment> {
		return DataService.post<IResponseAppointment>('/appointment/on-going', req);
	}

	listAppointmentHistory(req: IAppointmentRequest): AxiosPromise<IResponseAppointment> {
		return DataService.post<IResponseAppointment>('/appointment/history', req);
	}

	listAppointmentCancelled(req: IAppointmentRequest): AxiosPromise<IResponseAppointment> {
		return DataService.post<IResponseAppointment>('/appointment/cancel', req);
	}

	appointmentDetail(param: number): AxiosPromise<IResponseAppointmentDetail> {
		return DataService.get<IResponseAppointmentDetail>(`/appointment/detail/${param}/room`);
	}

	appointmentDescription(appointment_id: number): AxiosPromise<IResponseAppointmentDescription> {
		return DataService.get<IResponseAppointmentDescription>(`/appointment/detail/${appointment_id}`);
	}

	addDocument(req: IRequestAddDocument): AxiosPromise<IResponseAddDocument> {
		return DataService.post<IResponseAddDocument>('/appointment/add-document', req);
	}

	removeDocument(req: IRequestRemoveDocument): AxiosPromise<any> {
		return DataService.post<any>('/appointment/remove-document', req);
	}

	appointmentPay(req: IRequestPay): AxiosPromise<IResponsePay> {
		return DataService.post<any>('/appointment/pay', req);
	}

}