import { memo } from "react";
import { RegisterContent } from '../../components/pages-components/register/register';
import { ICountriesList } from "../../data/services/alteaCMS/IAlteaCMS";
import { IErrorMessage, IValueInput, IGender } from './index';

export interface IRegisterProps {
	dataCountry: ICountriesList[];
	resendOTP(): void;
	registerUser(): void;
	isPasswordValid: object;
	onInputCodeCompleted(code: string, onSuccess: () => void, onError: () => void): void;
	open: boolean;
	showPassword: object;
	handleClickShowPassword(fieldId: string): void;
	handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>): void;
	switchStep(step: number): void;
	step: number;
	handleModal(isOpen: boolean): void;
	errorMessage: IErrorMessage;
	onClickShoworValidate(e: any): void;
	loading: boolean;
	data: IValueInput;
	dataGender: IGender[];
	handleClickGender(selected: any): void;
	genderLabel: string;
	onChange(fieldId: string, value: any, error?: any): void;
	seconds: number;
	birthCountryName: string;
	handleClickCountry(selected: any): void;
	onProcess: boolean;
	onContinue(code: string): void;
	onChangeCode(code: any): void;
	codeInputHandle: any;
	activeCountdown: boolean;
	onUpdateEmail(): void;
	onUpdatePhone(): void;
	termsAndConditionData: any;
	backStep(): void;
	validateContactData(): void;
	activeFlag: string;
	changeFlag(): void;
}

function _ScreenRegisterPage(props: IRegisterProps) {

	const {
		dataCountry,
		changeFlag,
		resendOTP,
		registerUser,
		isPasswordValid,
		onInputCodeCompleted,
		open,
		showPassword,
		handleClickShowPassword,
		handleMouseDownPassword,
		switchStep,
		step,
		handleModal,
		errorMessage,
		onClickShoworValidate,
		loading,
		data,
		dataGender,
		handleClickGender,
		genderLabel,
		onChange,
		seconds,
		birthCountryName,
		handleClickCountry,
		onProcess,
		onContinue,
		onChangeCode,
		codeInputHandle,
		activeCountdown,
		onUpdateEmail,
		termsAndConditionData,
		backStep,
		validateContactData,
		activeFlag,
		onUpdatePhone
	} = props;
	return (
		<div className="loginContainer">
			<RegisterContent
				dataCountry={dataCountry}
				birthCountryName={birthCountryName}
				handleClickCountry={handleClickCountry}
				dataGender={dataGender}
				genderLabel={genderLabel}
				handleClickGender={handleClickGender}
				onChange={onChange}
				data={data}
				loading={loading}
				errorMessage={errorMessage}
				onClickShoworValidate={onClickShoworValidate}
				open={open}
				handleModal={handleModal}
				switchStep={switchStep}
				step={step}
				handleClickShowPassword={handleClickShowPassword}
				handleMouseDownPassword={handleMouseDownPassword}
				showPassword={showPassword}
				isPasswordValid={isPasswordValid}
				registerUser={registerUser}
				onInputCodeCompleted={onInputCodeCompleted}
				resendOTP={resendOTP}
				onProcess={onProcess}
				onContinue={onContinue}
				onChangeCode={onChangeCode}
				codeInputHandle={codeInputHandle}
				activeCountdown={activeCountdown}
				seconds={seconds}
				onUpdateEmail={onUpdateEmail}
				termsAndConditionData={termsAndConditionData}
				backStep={backStep}
				validateContactData={validateContactData}
				activeFlag={activeFlag}
				onUpdatePhone={onUpdatePhone}
				changeFlag={changeFlag}
				{...props}
			/>
		</div>
	);
}

export const ScreenRegisterPage = memo(_ScreenRegisterPage);
