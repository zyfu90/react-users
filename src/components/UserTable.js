import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser } from '../actions';

class UserTable extends React.Component {

    state = { userId: '' };

    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUser(){
        if (!this.props.users) {
            return null;
        }

        return this.props.users.map((user) => {
            return (
                <tr key={user.id}>
                    <td data-label="Id" >{user.id}</td>
                    <td data-label="Name">{user.name}</td>
                    <td data-label="Location">{user.location}</td>
                    <td data-label="Action">
                        <button onClick={ ()=> this.props.deleteUser(user)} className="ui negative basic button">Delete</button>
                    </td>
                </tr>
            );
        });
    }

    render(){
        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderUser() }
                </tbody>
            </table>
    
        );
    }

}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(UserTable);