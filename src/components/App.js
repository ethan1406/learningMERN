import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';
//const color = Math.random() > 0.5 ? 'green' : "red";

// import data from '../testData';

// React.createClass...
//extends React.Component


const pushState = (obj, url) =>
	window.history.pushState(obj, '', url);

const onPopState = handler => {
	window.onpopstate = handler;
};

class App extends React.Component {
	//stage 2

	// constructor(props){
	// 	super(props);
	// 	this.state = {test: 42};

	// }
	static propTypes = {
		initialData : React.PropTypes.object.isRequired
	};
	state = this.props.initialData;


	componentDidMount(){
		//timers, listeners, AJAX
		onPopState((event) => {
			this.setState({
				currentContestId: (event.state || {}).currentContestId
			});
		});
	}


	componentWillUnmount(){
		//clean timers, listenrs, ajax
		onPopState(null);
	}

	fetchContest = (contestId) =>{
		pushState(
			{currentContestId: contestId},
			`/contest/${contestId}`
		);
		//look up contest {constant time}
		//this.state.contests[contestId

		api.fetchContest(contestId).then(contest => {
			this.setState({
				
				currentContestId: contest.id,
				contests: {
					...this.state.contests,
					[contest.id]: contest
				}
			});
		});
	};

	fetchContestList = () =>{
		pushState(
			{currentContestId: null},
			'/'
		);
		//look up contest {constant time}
		//this.state.contests[contestId

		api.fetchContestList().then(contests => {
			this.setState({
				currentContestId: null,
				contests
			});
		});
	};
	fetchNames = (nameIds) => {
		if(nameIds.length === 0){
			return;
		}
		api.fetchNames(nameIds).then(names => {
			this.setState({
				names
			});
		});
	};

	currentContest(){
		return this.state.contests[this.state.currentContestId];
	}

	pageHeader(){
		if(this.state.currentContestId){
			return this.currentContest().contestName;
		}


		return 'Naming Contests';
	}

	lookupName = (nameId) =>{
		if(!this.state.names || this.state.names[nameId]){
			return {
				name: '...'
			};
		}
		return this.state.names[nameId];
	}

	currentContent() { 
		if(this.state.currentContestId){
			return <Contest 
					contestListClick = {this.fetchContestList}
					fetchNames={this.fetchNames}
					lookupName = {this.lookupName}
					{...this.currentContest()} />;
		}

		return <ContestList
				onContestClick={this.fetchContest}
				contests={this.state.contests} />;
	}


	render() {
		return(
		<div className="App">
			<Header message={this.pageHeader()}/>
			{this.currentContent()}
		</div>
		
	//React.createElement('h2', null, 'Hello React'),
		);
	}
}
export default App;

// App.propTypes = { 
//   headerMessage: React.PropTypes.string
// };
// App.defaultProps = {
// 	headerMessage: 'Hello!!'
// };

