import { Fragment, memo } from 'react';
import Flex, { FlexRowCenter, FlexRow } from '../../../basic-elements/flex/index';
import MaterialIcon from '@material/react-material-icon';
import { moneyFormat } from '../../../../data/global/function';
import {
	ContainerConsultationContent,
	ContainerPriceConsult,
	LabelText,
	ContainerMediaChoice,
	CustomFormControlLabel,
	CustomSpan,
	CustomRadioBtn,
	ContainerMargin
} from '../index';
import { DoctorCard } from '../doctor-card/index';
import { UserProfile } from '../user-profile/index';
import { RadioGroup } from '@material-ui/core';

function _MakeConsultation(props: any) {
	const {
		scheduleDoctor,
		profileUser,
		fullName,
		loading,
		doLogout,
		onClickChangeDoctor,
		mediaValue,
		onChangeRadio,
		activeStep,
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
				<FlexRow>
					<LabelText
						color={"#2C528B"}
						fsize={14}
						fweight={600}
					>
						Pilih Media Konsultasi
					</LabelText>
				</FlexRow>
				<RadioGroup
					aria-label="consultation_method"
					name="consultation"
					value={mediaValue}
					onChange={onChangeRadio}
				>
					<CustomFormControlLabel
						value="VIDEO_CALL"
						control={<CustomRadioBtn />}
						label={(
							<FlexRow>
								<MaterialIcon
									icon={"videocam"}
								/>
								<LabelText
									color={"#2C528B"}
									fsize={14}
									fweight={400}
									margin={"0px 0px 0px 5px"}
								>
									Panggilan Video
									<CustomSpan
										color={"#8F90A6"}
									>
										(Direkomendasikan)
									</CustomSpan>
								</LabelText>
							</FlexRow>)}
					/>
					{/* <CustomFormControlLabel
						value="VOICE_CALL"
						control={<CustomRadioBtn />}
						label={(
							<FlexRow>
								<MaterialIcon
									icon={"call"}
								/>
								<LabelText
									color={"#2C528B"}
									fsize={14}
									fweight={400}
									margin={"0px 0px 0px 5px"}
								>
									Panggilan Suara
								</LabelText>
							</FlexRow>)}
					/> */}
				</RadioGroup>

				<FlexRowCenter>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={600}
						margin={"50px 0px 0px 0px"}
					>
						Data Pasien
					</LabelText>
				</FlexRowCenter>

				<FlexRowCenter>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
						margin={"20px 0px 0px 0px"}
					>
						Bukan Untuk Anda?
						<CustomSpan
							onClick={doLogout}
							color={"#61C7B5"}
							cursor={"pointer"}
						>
							Ubah Pasien
						</CustomSpan>

					</LabelText>
				</FlexRowCenter>

				<ContainerMargin margin={"20px 0px 0px 0px"}>
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

export const MakeConsultation = memo(_MakeConsultation);