import { memo } from 'react';
import styled from 'styled-components';
import { IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import MUISnackbar from '@material-ui/core/Snackbar';
import {
	Icon,
}
	from '../basic-elements/mobile-container/index';

interface SnackbarProps {
	headline: string;
	message: string | React.ReactNode;
	variant?: 'error' | 'warning' | 'info';
	open: boolean;
	handleClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '400px',
		minHeight: '50px',
		background: 'white',
		padding: '1em',
		borderRadius: '3px',
		boxShadow: '0 12px 24px 4px rgba(40,42,43,0.2)',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	contentContainer: {
		display: 'flex',
		lineHeight: 1.8,
	},
	iconContainer: {
		display: 'flex',
		padding: '0 1.3em 0 0.3em',
		transform: 'translateY(3px)',
	},
	headline: {
		fontWeight: 'bold',
	},
	error: {
		borderLeft: '4px solid #D61F1F',
	},
	warning: {
		borderLeft: '4px solid #E46216',
	},
	info: {
		borderLeft: '4px solid #0263e0',
	},
}));

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	min-height: 50px;
	background: white;
	padding: 1em;
	border-radius: 3px;
	box-shadow: 0 12px 24px 4px rgba(40,42,43,0.2);
	border-left: ${(props) => props.bleft === "error" ? '4px solid #D61F1F' : props.bleft === "warning" ? '4px solid #E46216' : '4px solid #0263e0'};
`;

const ContentContainer = styled.div`
	display: flex;
	line-height: 1.8;
`;

const IconContainer = styled.div`
	display: flex;
	padding: 0 1.3em 0 0.3em;
	transform: translateY(3px);
`;

const Headline = styled(Typography)`
	font-weight: bold;
`;

export function _Snackbar(props: SnackbarProps) {
	const { headline, message, variant, open, handleClose } = props;

	const handleOnClose = (_: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		handleClose?.();
	};

	return (
		<MUISnackbar
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={open}
			onClose={handleOnClose}
			autoHideDuration={10000}
		>
			<Container
				bleft={variant}
			>
				<ContentContainer>
					<IconContainer>
						{variant === 'warning' && <Icon icon={"warning"} />}
						{variant === 'error' && <Icon icon={"error"} />}
						{variant === 'info' && <Icon icon={"info"} />}
					</IconContainer>
					<div>
						<Headline variant="body1" component="span">
							{headline}
						</Headline>
						<Typography variant="body1" component="span">
							{' '}
							{message}
						</Typography>
					</div>
				</ContentContainer>
				<div>
					{handleClose && (
						<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
							<Icon icon={"close"} />
						</IconButton>
					)}
				</div>
			</Container>
		</MUISnackbar>
	);
}

export const Snackbar = memo(_Snackbar);
