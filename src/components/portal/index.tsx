import { Component } from 'react';
import ReactDOM from 'react-dom';

export class Portal extends Component<{ selector: string }> {
	private element: HTMLElement;
	private _mounted: boolean = false;

	componentDidMount() {
		this._mounted = true;
		this.element = document.querySelector(this.props.selector);
		this.forceUpdate();
	}

	render() {
		if (this.element === undefined && !this._mounted) {
			return null;
		}

		return ReactDOM.createPortal(this.props.children, this.element)
	}
}
