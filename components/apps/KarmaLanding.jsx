import * as React from 'react';

import { Button } from '@material-ui/core';
import Page from '../layout/Page';
import Section from '../layout/Section';
import { ProviderWrapper } from '../providers';
import { Typography } from '@material-ui/core';

class KarmaLanding extends React.Component {
	constructor(props) {
		super(props);

		this.state = { loading: true, editing: false };
	}

	render() {
		return (
			<Page title={'Karma Calculator'}>
				<Section>
					<Typography align="left" paragraph="true" variant="body2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed
						cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
						ipsum. Praesent mauris. <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Fusce
						nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.{' '}
					</Typography>

					<Typography align="left" paragraph="true" variant="body2">
						Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.{' '}
						<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Curabitur sodales ligula in
						libero. Sed dignissim lacinia nunc. {' '}
						<i>Lorem ipsum dolor sit amet, consectetur adipiscing elit</i>. Curabitur tortor. Pellentesque
						nibh. Aenean quam. In scelerisque sem at dolor. mattis. Sed convallis tristique sem. Proin ut
						ligula vel nunc egestas . <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit</i>. Morbi,
						iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.
						Mauris ipsum. <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit</i>. Nulla metus metus,
						ullamcorper vel, tincidunt sed, euismod in, nibh.{' '}
					</Typography>

					<Typography align="left" paragraph="true" variant="body2">
						Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia
						nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor
						neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla.
						Suspendisse potenti. <b>Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh</b>.
						Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien.{' '}
						<i>In scelerisque sem at dolor</i>. Proin quam. {' '}
						<b>
							{' '}
							Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante
							quis turpis{' '}
						</b>. Etiam ultrices.{' '}
					</Typography>
				</Section>
				<Section>
					<Button
						style={{ margin: 12 }}
						variant="contained"
						color="primary"
						onClick={() => (window.location.href = '/calculator')}
					>
						Calculator
					</Button>
					<Button
						style={{ margin: 12 }}
						variant="contained"
						color="primary"
						onClick={() => {
							this.setState({ editing: true });
						}}
					>
						Results
					</Button>
				</Section>
			</Page>
		);
	}
}

// Keep providers outside of a control that changes state
// so that the theme doesn't re-render
export default (props) => (
	<ProviderWrapper>
		<KarmaLanding {...props} />
	</ProviderWrapper>
);
