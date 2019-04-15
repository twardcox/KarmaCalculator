import { createMuiTheme } from '@material-ui/core/styles';

// this theme created using https://in-your-saas.github.io/material-ui-theme-editor/
const theme = createMuiTheme({
	palette: {
		common: {
			black: '#3a3a3a',
			white: '#fff'
		},
		background: {
			paper: '#fff',
			default: '#f5f5f5'
		},
		primary: {
			light: 'rgba(225, 71, 69, 1)',
			main: 'rgba(191, 33, 30, 1)',
			dark: 'rgba(161, 43, 41, 1)',
			contrastText: 'rgba(233, 206, 44, 1)'
		},
		secondary: {
			light: 'rgba(245, 220, 75, 1)',
			main: 'rgba(233, 206, 44, 1)',
			dark: 'rgba(190, 169, 37, 1)',
			contrastText: 'rgba(191, 33, 30, 1)'
		},
		error: {
			light: '#fdf0f0',
			main: '#f44336',
			dark: '#c63131',
			contrastText: '#fff'
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)'
		},
		accent: {
			background: '#eaeaea'
		}
	},
	typography: {
		fontFamily: [ 'Calibri' ].join(','),
		fontSize: 22,
		useNextVariants: true
	}
});

export default theme;
