import React from 'react';
import documentClient from '../api/dynamodb';

class AddUser extends React.Component {

    state = {name: '', location: ''};

    onClickClear = () => {
        this.setState({name: '', location: ''});
    }

    onFormSubmit = (event) => {
        event.preventDefault();
    }

    onClickSubmit = () => {
        if (this.state.name === '' || this.state.location === '') return
        else {
            const updateList = this.props.addUserToList;
            var params = {
                TableName: "Users",
                Item:{
                    "id": require('crypto').randomBytes(10).toString('hex'),
                    "name": this.state.name,
                    "location": this.state.location
                }
            };

            documentClient.put(params, function(err) {
                if (err) {
                    alert("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    alert("Success!");
                }
            });
            updateList(params.Item);
            this.setState({name: '', location: ''});
        }
    }

    render(){
        return (
            <div className="ui segment">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <h4 class="ui dividing header">Add User</h4>
                    <div className="field">
                        <label>Name</label>
                        <input className="input" value={this.state.name} onChange={ (event) => this.setState({name: event.target.value})}></input>
                    </div>
                    <div className="field">
                        <label>Location</label>
                        <input className="input" value={this.state.location} onChange={ (event) => this.setState({location: event.target.value})}></input>
                    </div>
                    <button className="ui primary button" onClick={this.onClickSubmit}>Submit</button>
                    <button className="ui button" onClick={this.onClickClear}>Clear</button>
                </form>
            </div>
        );
    }
}

export default AddUser;