import React from 'react';
import ReactDOM from 'react-dom';

const ReminderModal = props => {
	return ReactDOM.createPortal(
		<div onClick={props.onDismiss} className="ui page dimmer modals visible active">
			<div onClick={(e) => e.stopPropagation()} className="ui standard tiny modal visible active">
				<div className="content">{props.content}</div>
				<div className="actions">{props.actions}</div>
			</div>
		</div>,
		document.querySelector('#modal')
	);
};

export default ReminderModal;