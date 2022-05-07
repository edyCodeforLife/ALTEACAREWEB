import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { FlexOneCustom } from '../../register/register';
import { Flex } from '../../../basic-elements/flex';
import { HeaderDetailConsultation, FlexRowCenterDetail, HeaderText } from '../../detail-consultation/tab-detail-consultation/index';
import { LabelText } from '../../create-consultation';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FlexRowSpaceBetween } from '../../home/appointment-carousel/appointment-box';
import {
	CustomFlexRow,
	Icon
}
	from '../../../basic-elements/mobile-container/index';
import { CustomFormControl, CustomTextField } from '../../login/login';

const ContainerInside = styled(Flex)`
	margin-top: 80px;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	justify-content: flex-start;
`;

const ContainerFlex = styled(Flex)`
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px 20px;
`;

const ContainerBtnCustom = styled(ContainerBtn)`
	box-sizing: border-box;
	padding: 10px 20px;
	position: absolute;
	bottom: 0;
`;

const ContainerInputPassword = styled(CustomFlexRow)`
	padding: 0px 20px;
`;

const CustomBtnSubmit = styled(BtnSubmit)`
	background: ${(props) => props.isDisabled ? "#C7C9D9" : "#61C7B5"};
	cursor: ${(props) => props.isDisabled ? "not-allowed" : "pointer"};
`;

function _CheckPasswordData(props: any) {
	const {
		backStep,
		onChangeCheckPassword,
		passwordStep1,
		handleClickShowPasswordStep1,
		handleMouseDownPassword,
		showPasswordStep1,
		handleKeyEnter,
		checkPassword
	} = props;

	return (
		<Fragment>
			<FlexRowCenterDetail>
				<HeaderDetailConsultation>
					<FlexOneCustom
						style={{ cursor: 'pointer' }}
						flex={"17% 0 0"}
						onClick={() => backStep('/change-profile?type=settings')}
					>
						<Icon
							className="iconBackArrow"
							icon="arrow_back_ios"
							color="#2C528B"
						/>
					</FlexOneCustom>
					<FlexOneCustom flex={"65% 0 0"}>
						<HeaderText>
							Ubah Kata Sandi
						</HeaderText>
					</FlexOneCustom>
				</HeaderDetailConsultation>
				<ContainerInside>
					<ContainerFlex>
						<LabelText
							talign={"left"}
							color={"#8F90A6"}
							fsize={14}
						>
							Masukkan Kata Sandi untuk membuat Kata Sandi baru
						</LabelText>
					</ContainerFlex>

					<ContainerInputPassword>
						<CustomFormControl minwidth="100%">
							<CustomTextField
								label="Masukkan Kata sandi"
								variant="outlined"
								value={passwordStep1}
								onKeyPress={handleKeyEnter}
								onChange={(e) => { e.persist(); onChangeCheckPassword(e.target.value); }}
								type={showPasswordStep1 ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => handleClickShowPasswordStep1()}
												onMouseDown={handleMouseDownPassword}
											>
												{showPasswordStep1 ?
													<Icon className="visibility_color" icon={'visibility'} id={'iconRef'} />
													:
													<Icon className="visibility_color" icon={'visibility_off'} id={'iconRef'} />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</CustomFormControl>
					</ContainerInputPassword>
					<ContainerBtnCustom>
						<CustomBtnSubmit
							disabled={passwordStep1 === ""}
							isDisabled={passwordStep1 === ""}
							onClick={checkPassword}
							minwidth={"100%"}
						>
							Buat Kata Sandi Baru
						</CustomBtnSubmit>
					</ContainerBtnCustom>
				</ContainerInside>
			</FlexRowCenterDetail >
		</Fragment>
	);
}

export const CheckPasswordData = memo(_CheckPasswordData);