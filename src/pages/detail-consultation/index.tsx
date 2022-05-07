import { memo, useState, useEffect, ChangeEvent, useRef } from "react";
import { DetailMyConsultationScreen } from './screen';
import { IAppointmentService, AppointmentService, IAlteaCMSService, AlteaCMSService } from '../../data/business/index';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';

function _DetailConsultation(props) {
	const qrs = QrsToObj(window.location.search);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const activeStep = parseInt(qrs.activeStep);
	const appointment_id = parseInt(qrs.appointment_id);
	const tabValue = parseInt(qrs.value);
	const [value, setValue] = useState(tabValue ? tabValue : 0);
	const _CMSService: IAlteaCMSService = new AlteaCMSService();
	const _AppointmentService: IAppointmentService = new AppointmentService();
	const [loading, setLoading] = useState(false);
	const [isSendingFile, setIsSendingFile] = useState(false);
	const [fileSendError, setFileSendError] = useState<string | null>(null);
	const [progressTracker, setProgressTracker] = useState(0);
	const [fileName, setFileName] = useState("");
	const [appointmentDescription, setAppointmentDescription] = useState({});
	const [deletedId, setDeletedId] = useState(0);

	const handleChangeActiveTab = (event: ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	}

	const handleChangeIndex = (index: number) => {
		setValue(index);
	}

	const getAppointmentDetailDescription = () => {
		_AppointmentService.appointmentDescription(appointment_id, {
			Success: (data: any) => {
				setAppointmentDescription(data.data);
			}
		})
	}

	useEffect(() => {
		if (!activeStep && !appointment_id) {
			props.history.push('/my-consultation');
		} else {
			getAppointmentDetailDescription();
		}
	}, []);

	const backStep = () => {
		props.history.push(`/my-consultation?activeStep=${activeStep}`)
	}

	const redirectToDoctorDetail = (id) => {
		props.history.push(`/detail?doctor_id=${id}`);
	}

	const redirectTo = (status: string, doctorId: string) => {
		if (status !== "COMPLETED" &&
			status !== "WAITING_FOR_MEDICAL_RESUME" &&
			status !== "MEET_SPECIALIST") return;

		if (status === "COMPLETED" || status === "WAITING_FOR_MEDICAL_RESUME") {
			props.history.push(`/detail?doctor_id=${doctorId}`);
		}
		if (status === "MEET_SPECIALIST") {
			props.history.push(`/call?appointment_id=${appointment_id}&callWith=specialist&activeStep=1`)
		}

	}

	const addDocument = (id: string) => {
		const req = {
			appointment_id: appointment_id,
			file: id
		}
		_AppointmentService.addDocument(req, {
			Success: (res: any) => {
				getAppointmentDetailDescription();
			},
			NotFound: (res: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: res.message,
					type: 'warning',
				});
			},
			ValidationError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
			ServerError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
		})
	}

	const handleUploadFiles = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			let max = 10;
			let { size, name } = file;
			let sizeInMb = size / 1024 / 1024;
			if (sizeInMb > max) {
				AltAlert.show({
					title: "Ukuran File melebihi batas",
					subtitle: "Maksimal ukuran file yang di upload adalah 10 MB",
					type: 'warning',
				});
				return;
			}
			let formData = new FormData();
			formData.append('files', file);
			const fr = new FileReader();
			setIsSendingFile(true);
			setFileName(name);
			setFileSendError(null);
			fr.onload = function () {
				_CMSService.UploadDocumentFiles(formData, {
					Success: (res: any) => {
						setIsSendingFile(false);
						addDocument(res.data?.id)
					},
					NotFound: (res: any) => {
						AltAlert.show({
							title: "Error",
							subtitle: res.message,
							type: 'warning',
						});
						setFileSendError('There was a problem uploading the file. Please try again.');
						setIsSendingFile(false);
					},
					ValidationError: (data: any) => {
						AltAlert.show({
							title: "Error",
							subtitle: data.message,
							type: 'warning',
						});
						setFileSendError('There was a problem uploading the file. Please try again.');
						setIsSendingFile(false);
					},
					handleLargePayload: (data: any) => {
						setFileSendError('File size is too large. Maximum file size is 10MB.');
					},
					ServerError: (data: any) => {
						AltAlert.show({
							title: "Error",
							subtitle: data.message,
							type: 'warning',
						});
						setFileSendError('There was a problem uploading the file. Please try again.');
						setIsSendingFile(false);
					},
					PercentageTracker: progressTracker => {
						setTimeout(() => {
							setProgressTracker(progressTracker)
						}, 250);
					},
				})
			}
			fr.readAsDataURL(file);
		}
	}

	const deleteDocument = (id: number) => {
		setLoading(true);
		const req = {
			appointment_id: appointment_id,
			document_id: id
		}
		setDeletedId(id);
		_AppointmentService.removeDocument(req, {
			Success: (data: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 500);
				getAppointmentDetailDescription();
			},
			NotFound: (res: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: res.message,
					type: 'warning',
				});
			},
			ValidationError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
			ServerError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
		})
	}

	return (
		<DetailMyConsultationScreen
			activeStep={activeStep}
			backStep={backStep}
			redirectTo={redirectTo}
			redirectToDoctorDetail={redirectToDoctorDetail}
			appointmentDescription={appointmentDescription}
			value={value}
			handleChangeIndex={handleChangeIndex}
			handleChangeActiveTab={handleChangeActiveTab}
			loading={loading}
			fileInputRef={fileInputRef}
			handleUploadFiles={handleUploadFiles}
			progressTracker={progressTracker}
			fileSendError={fileSendError}
			isSendingFile={isSendingFile}
			fileName={fileName}
			deleteDocument={deleteDocument}
			deletedId={deletedId}
			{...props}
		/>
	)
}
export const DetailConsultation = memo((_DetailConsultation));
