import { memo } from 'react';
import styled from 'styled-components';
import { Flex, FlexCenter } from '../../../../basic-elements/flex';
import { LabelText } from '../../../create-consultation/index';
import { ImageLogo } from '../../../../navbar/navbar';
import CallMa from '../../../../../assets/image/callMA.png';

export const ContainerImageLoader = styled.div`
	background: #fff;
    width: 150px;
    height: 150px;
	bottom: ${props => props.bottom};
    position: relative;
    margin: 0 auto;
    border-radius: 100%;
    border: solid 5px #fff;
    animation: play 2s ease infinite;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
`;

export const CustomImageLogo = styled(ImageLogo)`
	border-radius: 100%;
	position: absolute;
	left: 0px;
	top: 0px;
`;

export const CustomFlex = styled(FlexCenter)`
	height: 100%;
	position: relative;
	width: 100%;
`;

export const ContainerTitle = styled.div`
	width: 200px;
	position: absolute;
	top: 0;
`;

export const ContainerDescription = styled(Flex)`
	position: relative;
	margin-top: 20px;
`;

function _LoadingCallMA(props: any) {
	const { style = {} } = props;

	return (
		<CustomFlex>
			<ContainerTitle>
				<LabelText
					color={"#2C528B"}
					fsize={18}
					fweight={580}
				>
					Menghubungkan ke
					Medical Advisor
				</LabelText>
			</ContainerTitle>

			<Flex>
				<ContainerImageLoader bottom={"30%"}>
					<CustomImageLogo
						src={CallMa}
						height={150}
						width={150}
					/>
				</ContainerImageLoader>
			</Flex>

			<ContainerDescription>
				<LabelText
					color={"#2C528B"}
					fsize={14}
					fweight={580}
				>
					Mohon tunggu sebentar, Medical Advisor AlteaCare akan segera melayani Anda.
				</LabelText>
				<LabelText
					color={"#2C528B"}
					fsize={14}
					fweight={500}
					margin={"20px 0px 20px 0px"}
				>
					Persiapkan KTP dan hasil pemeriksaan penunjang (laboratorium, radiologi, dll) yang berkaitan dengan keluhan Anda saat ini.
					Pastikan ketersediaan baterai dan Koneksi Internet Anda agar proses ini dapat berjalan dengan lancar.
				</LabelText>

				<LabelText
					color={"#2C528B"}
					fsize={14}
					fweight={580}
				>
					layanan ini GRATIS
				</LabelText>

				<LabelText
					margin={"40px 0px 0px 0px"}
					color={"#FF5C5C"}
					fsize={12}
					lheight={1.6}
					fweight={580}
				>
					Harap Izinkan Camera dan microphone untuk digunakan saat melakukan telekonsultasi dengan Medical Advisor.
				</LabelText>
			</ContainerDescription>
		</CustomFlex>
	);
}

export const LoadingCallMA = memo(_LoadingCallMA);
