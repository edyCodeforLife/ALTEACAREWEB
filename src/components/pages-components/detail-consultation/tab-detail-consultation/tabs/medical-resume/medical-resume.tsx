import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { FlexCenter } from '../../../../../basic-elements/flex/index';
import { LabelText } from '../../../../create-consultation/index';
import { CustomFlexLeft } from '../patient-data/patient-data'
import NotesImage from '../../../../../../assets/image/icons/iconNotes.png';
import { ImageLogo } from '../../../../../navbar/navbar';
import { ContainerBtn, BtnSubmit } from '../../../../login/login';
import { map } from 'lodash';

const ContainerTextData = styled(CustomFlexLeft)`
	background: #fff;
	box-sizing: border-box;
	width: 100%;
	padding: 10px;
	margin: 5px 0px;
	word-break: break-all;
`;

export const ContainerEmpty = styled(FlexCenter)`
	box-sizing: border-box;
	width: 100%;
	height: 70%;
`;


function _MedicalResume(props: any) {
	const {
		appointmentDescription,
	} = props;

	const drugResume = appointmentDescription.medical_resume?.drug_resume.split("\n");

	const renderDoctorNotes = () => {
		return (
			<CustomFlexLeft>
				<ContainerTextData>
					<LabelText
						color={"#3A3A3C"}
						fsize={14}
						fweight={600}
					>
						Keluhan
					</LabelText>
					<LabelText
						color={"#6B7588"}
						fsize={14}
						talign={"left"}
					>
						{appointmentDescription.medical_resume?.symptom}
					</LabelText>
				</ContainerTextData>

				<ContainerTextData>
					<LabelText
						color={"#3A3A3C"}
						fsize={14}
						fweight={600}
					>
						Diagnosis
					</LabelText>
					<LabelText
						color={"#6B7588"}
						fsize={14}
						talign={"left"}
					>
						{appointmentDescription.medical_resume?.diagnosis}
					</LabelText>
				</ContainerTextData>

				<ContainerTextData>
					<LabelText
						color={"#3A3A3C"}
						fsize={14}
						fweight={600}
					>
						Resep Obat
					</LabelText>
					{map(drugResume, (item, key) => (
						<LabelText
							key={key}
							color={"#6B7588"}
							fsize={14}
							talign={"left"}
						>
							{item}
						</LabelText>
					))}

				</ContainerTextData>

				<ContainerTextData>
					<LabelText
						color={"#3A3A3C"}
						fsize={14}
						fweight={600}
					>
						Pemeriksaan Penunjang
					</LabelText>
					<LabelText
						color={"#6B7588"}
						fsize={14}
						talign={"left"}
					>
						{appointmentDescription.medical_resume?.additional_resume}
					</LabelText>
				</ContainerTextData>

				<ContainerTextData>
					<LabelText
						color={"#3A3A3C"}
						fsize={14}
						fweight={600}
					>
						Catatan
					</LabelText>
					<LabelText
						color={"#6B7588"}
						fsize={14}
						talign={"left"}
					>
						{appointmentDescription.medical_resume?.notes}
					</LabelText>
				</ContainerTextData>
			</CustomFlexLeft>
		)
	}

	const emptyDoctorNotes = () => {
		return (
			<ContainerEmpty>
				<ImageLogo
					src={NotesImage}
				/>
				<LabelText
					color={"#2C528B"}
					fsize={14}
					fweight={600}
					margin={"20px 0px"}
				>
					Catatan Dokter sedang diproses
				</LabelText>
				{/* <ContainerBtn>
					<BtnSubmit style={{ padding: 14 }} minwidth="30%">
						Perbaharui
					</BtnSubmit>
				</ContainerBtn> */}

			</ContainerEmpty>
		)
	}

	return (
		<Fragment>
			{appointmentDescription?.medical_resume ? (
				renderDoctorNotes()
			) : (
				emptyDoctorNotes()
			)}
		</Fragment>
	);
}

export const MedicalResume = memo(_MedicalResume);