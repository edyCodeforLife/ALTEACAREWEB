import { Fragment, memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import Flex, { FlexOne, FlexRow } from '../../../basic-elements/flex/index';
import {
	TextLabelRegister,
	ContainerErrorMessage,
	MaterialCustomIcon,
	IconContainer,
	TextError,
	ContainerMenuList,
	TextLabel,
	InsideMenuList
} from '../register';
import { ModalPersonalData } from '../modal/modal-personal-data';
import {
	CustomFlexRow,
}
	from '../../../basic-elements/mobile-container/index';
import { MDTDatepickerField } from '../../../input/date-picker-field';
import { MenuListItem } from '../../../basic-elements/menu-list/list-menu';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import { CustomFormControl, CustomTextField } from '../../login/login';
import { IValueInput, IErrorMessage } from '../../../../pages/register/index';
import { ICountriesList } from '../../../../data/services/alteaCMS/IAlteaCMS';
import { IGender } from '../../../../pages/register/index';

export interface IPersonalDataProps {
	open: boolean;
	handleModal(isOpen: boolean): void;
	data: IValueInput;
	birthCountryName: string;
	genderLabel: string;
	onChange(fieldId: string, value: any, error?: any): void;
	errorMessage: IErrorMessage;
	loading: boolean;
	dataCountry: ICountriesList[];
	handleClickCountry(selected: any): void;
	onClickShoworValidate(e: any): void;
	dataGender: IGender[];
	handleClickGender(selected: any): void;
	switchStep(step: number): void;
}

function _PersonalData(props: IPersonalDataProps) {

	const [anchorEl, setAnchorEl] = useState({
		countryAnchor: null,
		genderAnchor: null
	});

	const handleClick = (event: React.MouseEvent<HTMLElement>, fieldName) => {
		let obj = {}
		obj[fieldName] = event.currentTarget;
		setAnchorEl({ ...anchorEl, ...obj });
	};

	const handleClose = (fieldName) => {
		let obj = {}
		obj[fieldName] = null;
		setAnchorEl({ ...anchorEl, ...obj });
	};

	const {
		open,
		handleModal,
		data,
		birthCountryName,
		genderLabel,
		onChange,
		errorMessage,
		loading,
		dataCountry,
		handleClickCountry,
		onClickShoworValidate,
		dataGender,
		handleClickGender,
		switchStep
	} = props;

	return (
		<Fragment>
			<FlexRow>
				<FlexOne>
					<TextLabelRegister fweight="bold">
						Isi Personal Data
					</TextLabelRegister>
				</FlexOne>
			</FlexRow>
			<FlexRow>
				<FlexOne>
					<TextLabelRegister fweight="normal">
						Personal data akan menjadi identitas untuk melakukan konsultasi dan resume medis, pastikan mengisi personal data dengan benar.
					</TextLabelRegister>
				</FlexOne>
			</FlexRow>
			<form noValidate autoComplete="off">
				<CustomFlexRow>
					<CustomFormControl minwidth="100%">
						<CustomTextField
							label="Isi Nama Depan"
							value={data && data.first_name}
							variant="outlined"
							onChange={
								(e) => {
									e.persist();
									onChange("first_name", e.target.value)
								}}
							type="text"
						/>
						<ContainerErrorMessage error={errorMessage && errorMessage["first_name"] !== ""}>
							<IconContainer icon={"error_outline_rounded"} />
							<TextError>{errorMessage["first_name"]}</TextError>
						</ContainerErrorMessage>
					</CustomFormControl>
				</CustomFlexRow>

				<CustomFlexRow>
					<CustomFormControl minwidth="100%">
						<CustomTextField
							label="Isi Nama Belakang"
							value={data && data.last_name}
							onChange={
								(e) => {
									e.persist();
									onChange("last_name", e.target.value)
								}}
							variant="outlined"
							type="text"
						/>
						<ContainerErrorMessage error={errorMessage && errorMessage["last_name"] !== ""}>
							<IconContainer icon={"error_outline_rounded"} />
							<TextError>{errorMessage["last_name"]}</TextError>
						</ContainerErrorMessage>
					</CustomFormControl>
				</CustomFlexRow>

				<CustomFlexRow>
					<FlexOne>
						<MDTDatepickerField
							inputType={'datepicker'}
							title={"Atur Tanggal"}
							label={'Tanggal Lahir'}
							value={data && data.birth_date}
							fieldId={'birth_date'}
							onChange={onChange}
							disabled={loading}
							required
						// maxDate={}
						/>
					</FlexOne>
				</CustomFlexRow>

				<ContainerErrorMessage error={errorMessage && errorMessage["birth_date"] !== ""}>
					<IconContainer icon={"error_outline_rounded"} />
					<TextError>{errorMessage["birth_date"]}</TextError>
				</ContainerErrorMessage>

				<CustomFlexRow>
					<FlexOne>
						<ContainerMenuList minwidth="100%">
							<MenuListItem
								datalist={dataCountry}
								anchorEl={anchorEl.countryAnchor}
								handleclose={() => handleClose("countryAnchor")}
								handleclick={(e) => handleClick(e, "countryAnchor")}
								fieldName={"name"}
								minWidthListItem={300}
								maxHeightListItem={200}
								handleClickSelected={handleClickCountry}
							>
								<InsideMenuList>
									<TextLabel
										placeholder={"Pilih Negara"}
										selected={birthCountryName}
									>
										{birthCountryName}
									</TextLabel>
									<MaterialCustomIcon className="birthPlace_arrow_dropdown" icon={'keyboard_arrow_down'} />
								</InsideMenuList>
							</MenuListItem>
						</ContainerMenuList>
					</FlexOne>
				</CustomFlexRow>

				<CustomFlexRow>
					<CustomFormControl minwidth="100%">
						<CustomTextField
							label="Tulis Kota Kelahiran"
							value={data && data.birth_place}
							onChange={
								(e) => {
									e.persist();
									onChange("birth_place", e.target.value)
								}}
							variant="outlined"
							type="text"
						/>
					</CustomFormControl>
				</CustomFlexRow>

				<ContainerErrorMessage error={errorMessage && errorMessage["birth_place"] !== ""}>
					<IconContainer icon={"error_outline_rounded"} />
					<TextError>{errorMessage["birth_place"]}</TextError>
				</ContainerErrorMessage>

				<CustomFlexRow>
					<ContainerMenuList minwidth="100%">
						<MenuListItem
							datalist={dataGender}
							anchorEl={anchorEl.genderAnchor}
							handleclose={() => handleClose("genderAnchor")}
							handleclick={(e) => handleClick(e, "genderAnchor")}
							fieldName={"genderLabel"}
							minWidthListItem={300}
							maxHeightListItem={200}
							handleClickSelected={handleClickGender}
						>
							<InsideMenuList>
								<TextLabel
									placeholder={"Pilih Jenis Kelamin"}
									selected={genderLabel}
								>
									{genderLabel}
								</TextLabel>
								<MaterialCustomIcon className="birthPlace_arrow_dropdown" icon={'keyboard_arrow_down'} />
							</InsideMenuList>
						</MenuListItem>
					</ContainerMenuList>
				</CustomFlexRow>

				<ContainerErrorMessage error={errorMessage && errorMessage["gender"] !== ""}>
					<IconContainer icon={"error_outline_rounded"} />
					<TextError>{errorMessage["gender"]}</TextError>
				</ContainerErrorMessage>

				<CustomFlexRow>
					<CustomFormControl minwidth="100%" talign="center">
						<ContainerBtn>
							<BtnSubmit
								onKeyPress={(e) => onClickShoworValidate(e)}
								onClick={(e) => { onClickShoworValidate(e); }}
								minwidth="100%"
							>
								Lanjutkan
							</BtnSubmit>
						</ContainerBtn>
					</CustomFormControl>
				</CustomFlexRow>
			</form>
			<ModalPersonalData
				switchStep={switchStep}
				birthCountryName={birthCountryName}
				genderLabel={genderLabel}
				data={data}
				open={open}
				handleModal={handleModal}
			/>
		</Fragment>
	);
}

export const PersonalData = memo(_PersonalData);