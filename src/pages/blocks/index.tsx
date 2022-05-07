import { memo, useState, useEffect, useCallback, useRef } from "react";
import { ScreenBlocksPage } from './screen';
import { IProfileUserService, ProfileUserService, IAlteaCMSService, AlteaCMSService } from '../../data/business/index';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';
import { useGlobalState } from '../../data/states';
import { USER_ACTIONS } from '../../data/reducers/user-reducer';
import { validateEmail } from '../../data/global/function';
import { clone } from 'lodash';
import { ISendMessageRequest } from '../../data/services/alteaCMS/IAlteaCMS';
import { getToken } from "../../data/hooks/auth-token";

function _BlocksPage(props) {
	const _initialStateValue: ISendMessageRequest = {
		name: "",
		email: "",
		message_type: "",
		message: "",
		phone: "",
		user_id: ""
	}

	const qrs = QrsToObj(window.location.search);
	const dataType = qrs.type;
	const token = getToken();
	const _CMSService: IAlteaCMSService = new AlteaCMSService();
	// const [loading, setLoading] = useState(true);
	const [termscondition, setTermscondition] = useState(null)
	const _ProfileService: IProfileUserService = new ProfileUserService();
	const [faqlist, setFaqList] = useState([]);
	const [centralInformation, setCentralInformation] = useState({});
	const [messageType, setMessageType] = useState([]);
	const [dataContact, setDataContact] = useState(_initialStateValue);
	const [errorMessage, setErrorMessage] = useState(clone(_initialStateValue));
	const userInteraction = useRef(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [labelFilter, setLabelFilter] = useState<string>("Pilih Kategori Pesan");
	const [profileUser, setProfileUser] = useState<any>({});
	const [_, dispatch] = useGlobalState();
	const [isDisabled, setIsDisabled] = useState(true);
	const [currentField, setCurrentField] = useState("");

	const getBlocks = () => {
		const queryTC = "?type=TERMS_CONDITION";
		_CMSService.GetBlocks(queryTC, {
			Success: (res: any) => {
				setTermscondition(res.data);
			}
		})
	}

	const getFAQ = () => {
		_CMSService.GetFAQ({
			Success: (res: any) => {
				setFaqList(res.data);
			}
		})
	}

	const getProfile = () => {
		if (token) {
			_ProfileService.getProfile({
				Success: (res: any) => {
					setProfileUser(res.data);
					dispatch({
						type: USER_ACTIONS.CHANGE_USER,
						data: { user: res.data.data },
					});
				}
			});
		} else {
			return;
		}
	}

	const getCentralInformation = () => {
		_CMSService.GetCentralInformation({
			Success: (res: any) => {
				setCentralInformation(res.data);
			}
		})
	}

	const getMessageType = () => {
		_CMSService.GetMessageType({
			Success: (res: any) => {
				setMessageType(res.data);
			}
		})
	}

	const switchAPI = (type: string) => {
		switch (type) {
			case 'FAQ':
				return getFAQ();
			case 'termscondition':
				return getBlocks();
			case 'contact':
				getProfile?.(); getCentralInformation(); getMessageType();
		}
	}

	const handleclick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleclose = () => {
		setAnchorEl(null);
	};

	const onChange = useCallback((fieldId: string, value: any, error?: any) => {
		if (
			fieldId === "name" ||
			fieldId === "message_type" ||
			fieldId === "message" ||
			fieldId === "phone"
		) {
			userInteraction.current = true;
		}
		let obj: any = {};
		obj[fieldId] = value;
		setDataContact({ ...dataContact, ...obj });
		setCurrentField(fieldId)
	}, [dataContact]);

	useEffect(() => {
		userInteraction.current && validationChangeInput();
	}, [dataContact]);

	const validationChangeInput = () => {
		const regexMinimum = "^[-+\/\s]*([0-9][-+\/\s]*){9,}$";
		let messageError = {};


		if (currentField === "name") {
			if (dataContact.name === "") {
				messageError["name"] = "Nama belum terisi";
			} else {
				messageError["name"] = "";
			}
		}

		if (currentField === "message") {
			if (dataContact.message === "") {
				messageError["message"] = "Pesan belum terisi";
			} else {
				messageError["message"] = "";
			}
		}

		if (currentField === "phone") {
			if (dataContact && dataContact.phone !== "") {
				if (!dataContact.phone.match(regexMinimum)) {
					messageError["phone"] = "Minimum 9 angka";
				} else {
					messageError["phone"] = "";
				}
			}
		}

		if (currentField === "email") {
			if (dataContact.email === "") {
				messageError["email"] = "Email belum terisi";
			} else {
				if (dataContact && dataContact.email !== "") {
					if (!validateEmail(dataContact.email)) {
						messageError["email"] = "Masukkan Email yang valid";
					} else {
						messageError["email"] = "";
					}
				}
			}
		}

		setErrorMessage({ ...errorMessage, ...messageError });
	}

	useEffect(() => {
		if (!dataType) {
			props.history.push('/profile');
		} else {
			switchAPI(dataType);
		}
	}, []);

	useEffect(() => {
		if (dataType === "contact" && token) {
			let obj: any = {};
			obj["user_id"] = profileUser?.id;
			setDataContact({ ...dataContact, ...obj });
		}
	}, [profileUser])

	useEffect(() => {
		if (dataContact?.name !== "" &&
			dataContact?.email !== "" &&
			dataContact?.message !== "" &&
			dataContact?.message_type !== "" &&
			dataContact?.phone !== "") {
			setIsDisabled(false);
		}

	}, [dataContact])

	const backStep = (path) => {
		props.history.push(path)
	}

	const handleKeyEnter = (e) => {
		if (!isDisabled) {
			if (e.key === "Enter") {
				onSendMessage();
			}
		}
	}

	const handleClickSelected = (item) => {
		let obj: any = {};
		obj["message_type"] = item?.id;
		setDataContact({ ...dataContact, ...obj });
		setLabelFilter(item.name);
	}

	const onSendMessage = () => {
		_CMSService.SendMessage(dataContact, {
			Success: (res: any) => {
				AltAlert.show({
					title: "Success",
					subtitle: "Pesan berhasil dikirim",
					type: 'success',
				});
			},
			NotFound: (res: any) => {
				AltAlert.show({
					title: "Info",
					subtitle: res.message,
					type: 'info',
				});
			},
			ValidationError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
			ServerError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			}
		})
	}

	return (
		<ScreenBlocksPage
			dataType={dataType}
			termscondition={termscondition}
			faqlist={faqlist}
			backStep={backStep}
			messageType={messageType}
			centralInformation={centralInformation}
			dataContact={dataContact}
			errorMessage={errorMessage}
			onChange={onChange}
			handleKeyEnter={handleKeyEnter}
			datalist={messageType}
			anchorEl={anchorEl}
			handleclose={handleclose}
			handleclick={handleclick}
			handleClickSelected={handleClickSelected}
			labelName={labelFilter}
			isDisabled={isDisabled}
			onSendMessage={onSendMessage}
			{...props}
		/>
	)
}
export const BlocksPage = memo((_BlocksPage))
