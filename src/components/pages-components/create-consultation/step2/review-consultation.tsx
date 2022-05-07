import { Fragment, memo } from 'react';
import Flex, { FlexRowCenter } from '../../../basic-elements/flex/index';
import { moneyFormat } from '../../../../data/global/function';
import {
	ContainerConsultationContent,
	ContainerPriceConsult,
	LabelText,
	ContainerMediaChoice,
	ContainerMargin
} from '../index';
import { DoctorCard } from '../doctor-card/index';
import { UserProfile } from '../user-profile/index';

function _ReviewConsultation(props: any) {
	const {
		scheduleDoctor,
		profileUser,
		fullName,
		loading,
		doLogout,
		onClickChangeDoctor,
		activeStep,
		mediaValue
	} = props;

	return (
		<Fragment>
			<ContainerConsultationContent>
				<DoctorCard
					item={scheduleDoctor}
					isForMobileLayout
					onClickChangeDoctor={onClickChangeDoctor}
					activeStep={activeStep}
					mediaValue={mediaValue}
				/>
			</ContainerConsultationContent>

			<ContainerPriceConsult>
				<Flex>
					<LabelText
						color={"#2C528B"}
						fsize={14}
					>
						Biaya Konsultasi
					</LabelText>

				</Flex>

				<Flex>
					<LabelText
						color={"#2C528B"}
						fsize={14}
						fweight={600}
					>
						{moneyFormat(scheduleDoctor.price?.raw, "idn")}
					</LabelText>
				</Flex>
			</ContainerPriceConsult>


			<ContainerMediaChoice>
				<FlexRowCenter>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={600}
					>
						Data Pasien
					</LabelText>
				</FlexRowCenter>

				<ContainerMargin style={{ background: "white" }} margin={"20px 0px 0px 0px"}>
					<UserProfile
						item={profileUser}
						isForMobileLayout={true}
						fullName={fullName}
						loading={loading}
					/>
				</ContainerMargin>
			</ContainerMediaChoice>
		</Fragment>
	)

}

export const ReviewConsultation = memo(_ReviewConsultation);