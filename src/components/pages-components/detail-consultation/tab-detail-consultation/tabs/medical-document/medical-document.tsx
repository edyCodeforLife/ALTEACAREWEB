import { Fragment, memo } from 'react';
import { LabelText } from '../../../../create-consultation/index';
import FileIcon from '../../../../../../assets/image/icons/file_icon.png';
import { ImageLogo } from '../../../../../navbar/navbar';
import { filter } from 'lodash';
import { FileContent } from './data-content/data-content';
import { ContainerEmpty } from '../medical-resume/medical-resume';

function _MedicalDocument(props: any) {
	const {
		appointmentDescription,
	} = props;

	const uploadedByUser = filter(appointmentDescription?.medical_document, (item) => {
		return item?.upload_by_user === 1;
	});

	const uploadedFromDashboard = filter(appointmentDescription?.medical_document, (item) => {
		return item?.upload_by_user === 0;
	});

	const emptyMedicalDocument = () => {
		return (
			<ContainerEmpty>
				<ImageLogo
					src={FileIcon}
				/>
				<LabelText
					color={"#8F90A6"}
					fsize={14}
					margin={"20px 0px"}
				>
					Belum ada dokumen medis disini
				</LabelText>
			</ContainerEmpty>
		)
	}

	return (
		<Fragment>
			{appointmentDescription.medical_document?.length > 0 ? (
				<Fragment>
					{uploadedFromDashboard.length > 0 && (
						<FileContent
							title={"Dokumen dari AlteaCare"}
							item={uploadedFromDashboard}
						/>
					)}

					{uploadedByUser.length > 0 && (
						<FileContent
							title={"Unggahan Saya"}
							item={uploadedByUser}
						/>
					)}
				</Fragment>

			) : (
				emptyMedicalDocument()
			)}
		</Fragment>
	);
}

export const MedicalDocument = memo(_MedicalDocument);