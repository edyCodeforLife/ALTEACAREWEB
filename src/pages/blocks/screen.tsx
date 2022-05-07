import { memo } from "react";
import { BlocksContent } from '../../components/pages-components/blocks/index';

function _ScreenBlocksPage(props: any) {

	const {
		centralInformation,
		faqlist,
		termscondition,
		dataType,
		backStep,
		messageType,
		dataContact,
		errorMessage,
		onChange,
		handleKeyEnter,
		datalist,
		anchorEl,
		handleclose,
		handleclick,
		handleClickSelected,
		labelName,
		onSendMessage,
		isDisabled
	} = props;

	return (
		<div className="loginContainer">
			<BlocksContent
				dataType={dataType}
				backStep={backStep}
				handleKeyEnter={handleKeyEnter}
				messageType={messageType}
				termscondition={termscondition}
				faqlist={faqlist}
				dataContact={dataContact}
				errorMessage={errorMessage}
				onChange={onChange}
				centralInformation={centralInformation}
				datalist={datalist}
				anchorEl={anchorEl}
				handleclose={handleclose}
				handleclick={handleclick}
				handleClickSelected={handleClickSelected}
				labelName={labelName}
				isDisabled={isDisabled}
				onSendMessage={onSendMessage}
				{...props}
			/>
		</div>
	);
}

export const ScreenBlocksPage = memo(_ScreenBlocksPage);
