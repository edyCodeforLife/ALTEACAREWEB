import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import "./app.scss";
import Main from "./routes";
import CustomScroll from 'react-custom-scroll';

const theme = {
	colors: {
		primary: '#037Ef3',
		textLight: '#F3F4F7',
	},
};

const App = (props) => {
	return (
		<StylesProvider injectFirst>
			<ThemeProvider theme={theme}>
				<div className="full-screen">
					<CustomScroll flex="1" heightRelativeToParent="100%">
						<Main {...props} />
					</CustomScroll>
				</div>
				<div id="alerts" />
			</ThemeProvider>
		</StylesProvider >

	);
};

export default App;
