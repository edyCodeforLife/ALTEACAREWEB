import { AxiosError } from 'axios';

declare function require(name: string);

// export interface IResponseValidationError {
// 	fieldName: string;
// 	errorMessage: string[];
// }

// export interface IResponseExceptionError {
// 	exceptionMessage: string;
// 	ticketNumber: string;
// }

export interface IErrMessage {
	message: string;
	status: boolean;
	version: string;
}

export interface IResponseError {
	ValidationError?: (err: IErrMessage) => void;
	ServerError?: (err: IErrMessage) => void;
	NotFound?: (err: IErrMessage) => void;
	TokenExpired?: () => void;
	TimoutExceeded?: () => void;
	handle401?: (err: IErrMessage) => void;
	handleLargePayload?: (err: IErrMessage) => void;
}

export interface IResponseSuccess extends IResponseError {
	Success?: <T>(res: T) => void;
}

export interface IhandlerUploadResponse extends IResponseError {
	Success?: <T>(res: T) => void;
	PercentageTracker?: (percent: number) => void;
}

export interface IResponseSuccessVoid extends IResponseSuccess {
	Success?: () => void;
}

export interface IResponseSuccessAndError extends IResponseError {
	Success?: <T>(res: T) => void;
	Error?: <T>(res: T) => void;
}

// let handle401 = (err) => {
// 	// console.log('401');

// };


export const HandleError = async (err: AxiosError, handler: IResponseError) => {
	let e = err.response;
	if (err.code === 'ECONNABORTED') {
		if (handler.TimoutExceeded)
			return await handler.TimoutExceeded();
	} else {
		switch (e.status) {
			case (400): {
				return await handler.ValidationError(e.data as IErrMessage);
			}
			case (401): {
				if (handler.TokenExpired)
					return await handler.TokenExpired();
				else return handler.handle401(e.data as IErrMessage)
			}

			case (413): {
				if (handler.handleLargePayload)
					return await handler.handleLargePayload(e.data as IErrMessage);
			}

			case (404): {
				if (handler.NotFound)
					return await handler.NotFound(e.data as IErrMessage);
			}

			case (408): {
				if (handler.TimoutExceeded)
					return await handler.TimoutExceeded();
			}

			default: {
				return await handler.ServerError(e.data as IErrMessage);
			}
		}
	}
};

