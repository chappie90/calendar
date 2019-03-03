import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import Calendar from './Calendar';
import CreateReminder from './reminders/CreateReminder';
import EditReminder from './reminders/EditReminder';

class App extends React.Component {

 	render() {
    	return (
    		<div className="ui container">
   				<Router history={history}>
   					<div>
   						<Route path="/" exact component={Calendar} />
              <Route path="/reminders/new" exact component={CreateReminder} />
              <Route path="/reminders/edit/:id" exact component={EditReminder} />
   					</div>
   				</Router>
   			</div>
    	);
  	}
}

export default App;
