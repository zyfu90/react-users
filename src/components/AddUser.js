import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions';
class AddUser extends React.Component {

    state = {name: '', location: ''};

    onClickSubmit = () => {
        if ( this.state.name !== '' && this.state.location !== '') {
            this.props.addUser(this.state.name, this.state.location);
            this.setState({name: '', location: ''});
        } else {
            alert('Name or Location is empty.');
        }
    }

    render(){
        return (
            <div className="ui segment">
                <form className="ui form" onSubmit={ (event) => event.preventDefault() }>
                    <h4 className="ui dividing header">Add User</h4>
                    <div className="field">
                        <label>Name</label>
                        <input className="input" value={this.state.name} onChange={ (event) => this.setState({name: event.target.value})}></input>
                    </div>
                    <div className="field">
                        <label>Location</label>
                        <input className="input" value={this.state.location} onChange={ (event) => this.setState({location: event.target.value})}></input>
                    </div>
                    <button className="ui primary button" onClick={this.onClickSubmit}>Submit</button>
                    <button className="ui button" onClick={ () => this.setState({name: '', location: ''}) }>Clear</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { addUser } )(AddUser);