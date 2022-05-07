import { memo, MouseEvent, KeyboardEvent, ChangeEvent, Fragment } from 'react';
import styled from 'styled-components';
import { Doctor } from '../doctor/doctor';
import MaterialIcon from '@material/react-material-icon';
import CustomScroll from 'react-custom-scroll';
import { ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, ListSubheader } from '@material-ui/core/';
import { IDataGeneralSearch } from '../../../../data/services/alteaCMS/IAlteaCMS';
import { map } from 'lodash';
import { Spinner } from '../../../spinner/index';
import { FlexRowCenter } from '../../../basic-elements/flex';

interface IAutocomplete {
	needIcon: boolean;
	id: string;
	icon: string;
	style?: any;
	open?: boolean;
	anchorRef?: any;
	handleClose?(event: MouseEvent<EventTarget>): void;
	handleListKeyDown?(event: KeyboardEvent): void;
	handleClick?(): void;
	handleChange?(event: ChangeEvent): void;
	isActiveMenu: boolean;
	searchData?: IDataGeneralSearch;
	loadingSearch?: boolean;
	redirectTo?(field: string, id: string): void;
}

const CustomInputFieldContainer = styled.div`
	font-size: 16px;
	width: auto;
	padding: 8px 12px;
	border-radius: 20px;
	box-shadow: 0px 0px 4px #D6EDF6;
    position: relative;
	background: #fff;
	line-height: 1.6;
	position: relative;
	margin-top: 20px;
	border: 1px solid #EBEBF0;
`;

const CustomInputField = styled.input`
	border-bottom: none;
	margin-left: 30px;
	width: -webkit-fill-available;
	border: none;
	outline: none;
	font-size: 16px;
	margin-top: 3px;
		@media (max-width: 768px) {
			font-size: 12px;
	}
`;
const ContainerSpinner = styled(FlexRowCenter)`
	align-items: center;
	position: relative;
	height: 100%;
`;

const MaterialIconContainer = styled(MaterialIcon)`
	position: absolute;
	top: 10px;
	color: #3E8CB9;
`;

const CustomPopper = styled(Popper)`
	top: 50px !important;
	width: 100% !important;
	height: 400px;
	max-height: max-content;
	z-index:999;
	@media (max-width: 768px) {
		left: -10px !important;
		top: 20px !important;
		height: 300px;
	};
	@media (max-width: 374px) {
		left: -10px !important;
		top: 20px !important;
		height: 300px;
	};
`;

const CustomForm = styled.form`
	width: 100%;
	@media (max-width: 768px) {
		position: relative;

	};
`;
const CustomSubHeader = styled(ListSubheader)`
	color: #3E8CB9;
	text-align: left;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
`;

export const TextNotFound = styled(FlexRowCenter)`
	color: #61C7B5;
	text-align: center;
	align-items: center;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
`;

const CustomMenuItem = styled(MenuItem)`
 &:hover {
	background: #D6EDF6;
}
`;

function _GeneralSearch(props: IAutocomplete) {
	const { style = {}, id, redirectTo, loadingSearch, isActiveMenu, searchData, needIcon, handleChange, icon, open, anchorRef, handleClose, handleListKeyDown, handleClick } = props;
	return (
		<CustomForm noValidate autoComplete="off">
			<CustomInputFieldContainer>
				{needIcon ? (
					<MaterialIconContainer icon={icon} />
				) : null}
				<CustomInputField
					ref={anchorRef}
					onClick={() => {
						!isActiveMenu ?
							handleClick() :
							null
					}}
					type="search"
					onChange={(e) => { handleChange(e); }}
					placeholder="ketik keluhan atau nama dokter untuk konsultasi"
				/>
				{isActiveMenu && (
					<CustomPopper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
						{({ TransitionProps, placement }) => (
							<CustomScroll flex="1" heightRelativeToParent={'100%'}>
								<Grow
									{...TransitionProps}
									style={{ transformOrigin: 'center bottom' }}
								>
									<Paper style={{ height: 'auto' }}>
										{loadingSearch ? (
											<ContainerSpinner>
												<Spinner />
											</ContainerSpinner>
										) : (
											<ClickAwayListener onClickAway={handleClose}>
												<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
													{searchData?.doctor?.length > 0 ? (
														<div>
															{searchData.symtom?.length > 0 && (
																<Fragment>
																	<CustomSubHeader
																		disableSticky={true}
																		component="div"
																		id="nested-list-subheader-1"
																	>
																		Gejala
																	</CustomSubHeader>
																	{map(searchData.symtom, (item, idx) => {
																		return (
																			<CustomMenuItem
																				key={idx}
																				onClick={() => redirectTo("symtom", item?.symtom_id)}
																			>
																				{item?.name}
																			</CustomMenuItem>
																		)
																	})}
																</Fragment>
															)}

															<CustomSubHeader
																disableSticky={true}
																component="div"
																id="nested-list-subheader-2"
															>
																Dokter
																</CustomSubHeader>

															{map(searchData.doctor, (item, idx) => {
																return (
																	<CustomMenuItem
																		key={idx}
																		onClick={() => redirectTo("doctor", item?.doctor_id)}
																	>
																		<Doctor
																			item={item}
																		/>
																	</CustomMenuItem>
																)
															})}
														</div>
													) : (
														<TextNotFound>
															Tidak ditemukan
														</TextNotFound>
													)}

												</MenuList>
											</ClickAwayListener>
										)}

									</Paper>
								</Grow>
							</CustomScroll>
						)}
					</CustomPopper>
				)}
			</CustomInputFieldContainer>
		</CustomForm>
	);
}

export const GeneralSearch = memo(_GeneralSearch);
