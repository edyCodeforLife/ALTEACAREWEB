import { Fragment, memo, useState } from 'react';
import styled from 'styled-components';
import { FlexOne, FlexRow } from '../../../basic-elements/flex/index';
import { CustomFormControl } from '../../login/login';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import CustomScroll from 'react-custom-scroll';
import Checkbox from '@material-ui/core/Checkbox';
import { IBlockData } from '../../../../data/services/alteaCMS/IAlteaCMS';
import {
	TextLabelRegister,
} from '../register';
import {
	CustomFlexRow,
}
	from '../../../basic-elements/mobile-container/index';

const CustomContainerBtn = styled(CustomFlexRow)`
	position: relative;
	bottom: 0;
	width: 100%;
`;

const ContainerTermsCondition = styled.div`
	height: 400px;
	display: flex;
`;

const InsideContent = styled.div`
	white-space: pre-line;
	margin-right: 20px;
	text-align: left;
	font-size: 12px;
	color: #8F90A6;
`;

const CFlexRow = styled(FlexRow)`
	margin-bottom: 20px;
`;

const ContainerChecked = styled(FlexRow)`
	margin-top: 20px;
`;

const ContainerCheckbox = styled.div`
	margin-left: -10px;
`;

const ContainerTextCheckbox = styled.div`
	white-space: pre-line;
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	color: #4F4F4F;
`;

interface ITermsConditionProps {
	registerUser(): void;
	termsAndConditionData: IBlockData[];
}

function _TermsAndConditions(props: ITermsConditionProps) {

	const [checked, setChecked] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	const handleKeyEnter = (e) => {
		if (checked) {
			if (e.key === "Enter") {
				registerUser();
			}
		}
	}

	const { registerUser, termsAndConditionData } = props;
	const dataTC = termsAndConditionData && termsAndConditionData[0];
	return (
		<Fragment>
			<CFlexRow>
				<FlexOne>
					<TextLabelRegister fweight="bold">
						{dataTC && dataTC.title}
					</TextLabelRegister>
				</FlexOne>
			</CFlexRow>
			<CustomFlexRow>
				<ContainerTermsCondition>
					<CustomScroll flex="1" heightRelativeToParent="100%">
						<InsideContent
							dangerouslySetInnerHTML={{ __html: dataTC && dataTC.text }}
						/>

					</CustomScroll>
				</ContainerTermsCondition>
			</CustomFlexRow>
			<ContainerChecked>
				<ContainerCheckbox>
					<Checkbox
						onKeyPress={handleKeyEnter}
						checked={checked}
						onChange={handleChange}
						inputProps={{ 'aria-label': 'primary checkbox' }}
					/>
				</ContainerCheckbox>
				<ContainerTextCheckbox>
					saya setuju Altea boleh mengumpulkan,
					menggunakan, mengungkapkan informasi yang saya berikan, dan saya mematuhi Syarat dan Ketentuan
				</ContainerTextCheckbox>
			</ContainerChecked>
			<CustomContainerBtn>
				<CustomFormControl minwidth="100%" talign="center">
					<ContainerBtn>
						<BtnSubmit
							disabled={!checked}
							onClick={() => { registerUser() }}
							minwidth="100%"
							onKeyPress={handleKeyEnter}
						>
							Lanjutkan
							</BtnSubmit>
					</ContainerBtn>
				</CustomFormControl>
			</CustomContainerBtn>
		</Fragment>
	);
}

export const TermsAndConditions = memo(_TermsAndConditions);