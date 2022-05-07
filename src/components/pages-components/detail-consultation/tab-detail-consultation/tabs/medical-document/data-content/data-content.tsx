import { memo } from 'react';
import styled from 'styled-components';
import { LabelText } from '../../../../../create-consultation/index';
import { CustomFlexLeft } from '../../patient-data/patient-data'
import { ImageLogo } from '../../../../../../navbar/navbar';
import { FlexRow } from '../../../../../../basic-elements/flex/index';
import { map } from 'lodash';
import FileIcon from '../../../../../../../assets/image/icons/file_icon.png';

const ContainerLabelText = styled(FlexRow)`
	justify-content: flex-start;
	align-items: center;
	background: #fff;
	box-sizing: border-box;
	width: 100%;
	padding: 5px 20px;
	word-break: break-all;
	border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const CustomContainerLabel = styled(CustomFlexLeft)`
	box-sizing: border-box;
	width: 80%;
	padding: 10px 20px;
	word-break: break-all;
`;

const ContainerLabelTitle = styled.div`
	background:#EBEBF0;
	padding: 10px 20px;
	width: 100%;
	box-sizing: border-box;
	text-align: left;
`;

const ContainerFileContent = styled.div`
	z-index: 999;
`;


function _FileContent(props: any) {
	const {
		title,
		item
	} = props;

	const openLink = (link) => {
		const anchorEl = document.createElement('a');

		anchorEl.href = link;
		anchorEl.target = '_blank';
		anchorEl.rel = 'noopener';
		setTimeout(() => {
			anchorEl.click();
		});
	}

	return (
		<ContainerFileContent>
			<CustomFlexLeft>
				<ContainerLabelTitle>
					<LabelText
						color={"#2C528B"}
						fsize={14}
						fweight={600}
					>
						{title}
					</LabelText>
				</ContainerLabelTitle>
				{map(item, o => (
					<ContainerLabelText key={o?.id}>
						<ImageLogo
							width={24}
							height={30}
							src={FileIcon}
						/>
						<CustomContainerLabel>
							<LabelText
								color={"#333333"}
								fsize={14}
								talign={"left"}
							>
								{o?.original_name}
							</LabelText>
							<LabelText
								color={"#6B7588"}
								fsize={12}
								talign={"left"}
							>
								{o?.size}

							</LabelText>
							<LabelText
								color={"#6B7588"}
								fsize={10}
								talign={"left"}
							>
								{o?.date}
							</LabelText>
						</CustomContainerLabel>
						<LabelText
							style={{ cursor: 'pointer' }}
							color={"#3E8CB9"}
							fsize={14}
							talign={"left"}
							fweight={600}
							onClick={() => { openLink(o?.url) }}

						>
							Lihat
						</LabelText>
					</ContainerLabelText>
				))}
			</CustomFlexLeft>
		</ContainerFileContent>
	);
}

export const FileContent = memo(_FileContent);