export interface IProfileResponse {
	status: boolean;
	message: string;
	data: IProfileData;
}

export interface IProfileData {
	id: string;
	email: string;
	phone: string;
	first_name: string;
	last_name: string;
	is_verified_email: boolean;
	is_verified_phone: boolean;
	user_role: string[];
	user_details: IUserDetails;
	user_addresses: any[];
}

export type IGenderType = "MALE" | "FEMALE";

export interface IUserDetails {
	id_card: string;
	sap_patient_id: string | null;
	gender: IGenderType;
	birth_date: string | Date;
	birth_place: string;
	birth_country: IBirthCountry;
	nationality: string | null;
	photo_id_card: string | null,
	avatar: string | null;
	age: IUserAge;
}

export interface IBirthCountry {
	id: string;
	code: string;
	name: string;
}

export interface IUserAge {
	year: number;
	month: number;
}