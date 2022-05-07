import { Fragment, memo } from 'react';
import { CustomCard, CustomContainerGrid, LabelExperience, ContainerImage, TextLabel, ContainerBtn, BtnChooseSchedule } from './util-style/list-component';
import { NewCardContent } from '../searchandfilter/index';
import { ContainerGrid, LeftGrid } from '../../../material-grid/index';
import Flex, { FlexCenter, FlexRow, FlexRowCenter } from '../../../basic-elements/flex/index';
import { ImageLogo } from '../../../navbar/navbar';
import IconMitrakeluarga from '../../../../assets/image/icons/icon_mitrakeluarge.svg';
import { moneyFormat } from '../../../../data/global/function';
import { CustomSkeleton } from '../../../basic-elements/skeleton/skeleton';
import EmptyDoctorImage from '../../../../assets/image/icons/empty_spesialis.svg';

export interface IInsideCardListProps {
	loading: boolean;
	item: any;
	id: number;
	onChooseScheduleRedirect(doctorId: string): void;
	isForMobileLayout: boolean;
}

function _InsideCardListDoctor(props: IInsideCardListProps) {
	const { loading, item, id, onChooseScheduleRedirect, isForMobileLayout } = props;

	const renderWebviewListDoctor = () => {
		return (
			<CustomContainerGrid spacing={3} container>
				<LeftGrid item xs={3}>
					{loading ? (
						<CustomSkeleton
							animation="wave"
							variant="rect"
							mobileheight={50}
							height={190}
							mobilewidth={50}
							width={180}
						/>
					) : (
						<ImageLogo
							src={item.photo ? item.photo?.url : EmptyDoctorImage}
							height={182}
							width={182}
						/>
					)}
				</LeftGrid>

				<LeftGrid item xs={6}>
					<FlexRow>
						<FlexCenter>
							{loading ? (
								<CustomSkeleton
									animation="wave"
									variant="text"
									mobileheight={20}
									height={30}
									mobilewidth={50}
									width={200}
								/>
							) : (
								<LabelExperience>
									{item.experience}
								</LabelExperience>
							)}
						</FlexCenter>
						<FlexCenter>
							<ContainerImage>
								{loading ? (
									<CustomSkeleton
										animation="wave"
										variant="text"
										mobileheight={20}
										height={30}
										mobilewidth={30}
										width={50}
									/>
								) : (
									<ImageLogo height={50} width={50} src={IconMitrakeluarga} />
								)}
							</ContainerImage>
						</FlexCenter>

						<FlexCenter>
							{loading ? (
								<CustomSkeleton
									animation="wave"
									variant="text"
									mobileheight={20}
									height={30}
									mobilewidth={80}
									width={150}
								/>
							) : (
								<TextLabel
									bold
									colorPrimary
								>
									{item.hospital && item.hospital.length > 0 ? item.hospital[0]["name"] : null}
								</TextLabel>
							)}

						</FlexCenter>
					</FlexRow>

					<FlexRow>
						{loading ? (
							<CustomSkeleton
								animation="wave"
								variant="text"
								mobileheight={20}
								height={30}
								mobilewidth={80}
								width={280}
							/>
						) : (
							<TextLabel
								primary
								colorPrimary
							>
								{item.name}
							</TextLabel>
						)}

					</FlexRow>
					<FlexRow>
						{loading ? (
							<CustomSkeleton
								animation="wave"
								variant="text"
								mobileheight={20}
								height={30}
								mobilewidth={40}
								width={150}
							/>
						) : (
							<TextLabel
								bold
								third
								colorPrimary
							>
								{item.overview}
							</TextLabel>
						)}

					</FlexRow>

					<FlexRow>
						{loading ? (
							<CustomSkeleton
								animation="wave"
								variant="text"
								mobileheight={20}
								height={30}
								mobilewidth={40}
								width={200}
							/>
						) : (
							<TextLabel
								marginPrimary
								primary
							>
								{item.specialization && item.specialization.name}
							</TextLabel>
						)}

					</FlexRow>

					{loading ? (
						<Fragment>
							<FlexRow>
								<CustomSkeleton
									animation="wave"
									variant="text"
									mobileheight={20}
									height={30}
									mobilewidth={40}
									width={460}
								/>
							</FlexRow>
							<FlexRow>
								<CustomSkeleton
									animation="wave"
									variant="text"
									mobileheight={20}
									height={30}
									mobilewidth={40}
									width={280}
								/>
							</FlexRow>
							<FlexRow>
								<CustomSkeleton
									animation="wave"
									variant="text"
									mobileheight={20}
									height={30}
									mobilewidth={40}
									width={380}
								/>
							</FlexRow>
						</Fragment>
					) : (
						<FlexRow>
							<TextLabel

								wbreak={"break-all"}
								breakSpace
								third
								colorPrimary
							>
								{item.about_preview}
							</TextLabel>
						</FlexRow>
					)}


				</LeftGrid>

				<LeftGrid item xs={3}>
					<FlexRowCenter>
						<FlexCenter>
							{loading ? (
								<CustomSkeleton
									animation="wave"
									variant="rect"
									mobileheight={20}
									height={30}
									mobilewidth={80}
									width={100}
								/>
							) : (
								<TextLabel primary>
									{moneyFormat(item.price && item.price.raw, 'idn')}
								</TextLabel>
							)}
						</FlexCenter>
					</FlexRowCenter>

					<FlexRowCenter>
						<FlexCenter>
							<ContainerBtn>
								{loading ? (
									<CustomSkeleton
										animation="wave"
										variant="rect"
										mobileheight={20}
										height={30}
										mobilewidth={80}
										width={100}
									/>
								) : (
									<BtnChooseSchedule
										onClick={() => onChooseScheduleRedirect(item.doctor_id)}
									>
										Pilih Jadwal
									</BtnChooseSchedule>
								)}
							</ContainerBtn>
						</FlexCenter>
					</FlexRowCenter>
				</LeftGrid>
			</CustomContainerGrid>
		)
	}

	const renderMobileListDoctor = () => {
		return (
			<Fragment>
				<CustomContainerGrid
					spacing={3}
					container
				>
					<LeftGrid item xs={3} style={{ marginRight: 20 }}>
						{loading ? (
							<CustomSkeleton
								animation="wave"
								variant="rect"
								mobileheight={90}
								height={90}
								mobilewidth={90}
								width={90}
								isForMobileLayout
							/>
						) : (
							<ImageLogo
								src={item.photo ? item.photo?.url : EmptyDoctorImage}
								height={90}
								width={90}
							/>
						)}
					</LeftGrid>

					<LeftGrid item xs={6}>
						<FlexRow>
							<FlexCenter>
								{loading ? (
									<CustomSkeleton
										animation="wave"
										variant="text"
										mobileheight={30}
										height={30}
										mobilewidth={100}
										width={30}
										isForMobileLayout
									/>
								) : (
									<LabelExperience isForMobileLayout={isForMobileLayout}>
										{item.experience}
									</LabelExperience>
								)}
							</FlexCenter>
						</FlexRow>
						<FlexRow>
							<ContainerImage isForMobileLayout={isForMobileLayout}>
								{loading ? (
									<CustomSkeleton
										animation="wave"
										variant="text"
										mobileheight={20}
										height={20}
										mobilewidth={30}
										width={30}
										isForMobileLayout
									/>
								) : (
									<ImageLogo height={35} width={50} src={IconMitrakeluarga} />
								)}
							</ContainerImage>
							<FlexCenter>
								{loading ? (
									<CustomSkeleton
										animation="wave"
										variant="text"
										mobileheight={20}
										height={20}
										mobilewidth={80}
										width={80}
										isForMobileLayout
									/>
								) : (
									<TextLabel
										colorPrimary
									>
										{item.hospital && item.hospital.length > 0 ? item.hospital[0]["name"] : null}
									</TextLabel>
								)}

							</FlexCenter>
						</FlexRow>

						<FlexRow>
							{loading ? (
								<CustomSkeleton
									animation="wave"
									variant="text"
									mobileheight={20}
									height={20}
									mobilewidth={200}
									width={200}
									isForMobileLayout
								/>
							) : (
								<TextLabel
									bold
									breakSpace
								>
									{item.name}
								</TextLabel>
							)}

						</FlexRow>
						<FlexRow>
							{loading ? (
								<CustomSkeleton
									animation="wave"
									variant="text"
									mobileheight={20}
									height={20}
									mobilewidth={50}
									width={50}
									isForMobileLayout
								/>
							) : (
								<TextLabel
									colorPrimary
									breakSpace
								>
									{item.overview}
								</TextLabel>
							)}

						</FlexRow>
					</LeftGrid>
				</CustomContainerGrid>
				<CustomContainerGrid spacing={3} container>
					<LeftGrid item xs={7}>
						<FlexRow>
							{loading ? (
								<CustomSkeleton
									animation="wave"
									variant="text"
									mobileheight={20}
									height={20}
									mobilewidth={100}
									width={100}
									isForMobileLayout
								/>
							) : (
								<TextLabel
									bold
								>
									Sp.{" "}{item.specialization && item.specialization.name}
								</TextLabel>
							)}
						</FlexRow>
						<FlexRow>
							{loading ? (
								<CustomSkeleton
									animation="wave"
									variant="text"
									mobileheight={20}
									height={20}
									mobilewidth={80}
									width={80}
									isForMobileLayout
								/>
							) : (
								<TextLabel
									breakSpace
									colorPrimary
									wbreak={"break-all"}
								>
									{item.about_preview}
								</TextLabel>
							)}
						</FlexRow>
					</LeftGrid>
					<LeftGrid item xs={5}>
						<Flex style={{ marginBottom: 8 }}>
							{loading ? (
								<CustomSkeleton
									animation="wave"
									variant="rect"
									mobileheight={20}
									height={20}
									mobilewidth={70}
									width={70}
									isForMobileLayout
								/>
							) : (
								<TextLabel secondary>
									{moneyFormat(item.price && item.price.raw, 'idn')}
								</TextLabel>
							)}
						</Flex>
						<Flex>
							{loading ? (
								<CustomSkeleton
									animation="wave"
									variant="rect"
									mobileheight={20}
									height={30}
									mobilewidth={80}
									width={100}
								/>
							) : (
								<BtnChooseSchedule
									isForMobileLayout
									onClick={() => onChooseScheduleRedirect(item.doctor_id)}
								>
									Pilih Jadwal
								</BtnChooseSchedule>
							)}
						</Flex>
					</LeftGrid>
				</CustomContainerGrid>
			</Fragment>

		)
	}

	return (
		<CustomCard
			style={{ cursor: isForMobileLayout ? 'pointer' : 'default' }}
			onClick={() => isForMobileLayout ? onChooseScheduleRedirect(item.doctor_id) : null}
			key={`Card Number=${id}`}>
			<NewCardContent>
				{isForMobileLayout ? (
					renderMobileListDoctor()
				) : (
					renderWebviewListDoctor()
				)}
			</NewCardContent>
		</CustomCard>
	);
}

export const InsideCardListDoctor = memo(_InsideCardListDoctor);
