import React from 'react';
import documentClient from '../api/dynamodb';

class UserTable extends React.Component {

    state = { userId: '' };

    deleteUser(id){
        var params = {
            TableName: 'Users',
            Key: {
                "id": id
            }
        }

        documentClient.delete(params, (err) => {
            if (err) {
                alert("Unable to delete user. Error JSON:", JSON.stringify(err, null, 2));
                return
            } else {
                alert("Delete User succeeded");
            }
        });

        this.props.deleteUserFromList(id);
    }

    render(){
        const user = this.props.users.map(( {id, name, location}) => {
            return (
                <tr key={id}>
                    <td data-label="Id" >{id}</td>
                    <td data-label="Name">{name}</td>
                    <td data-label="Location">{location}</td>
                    <td data-label="Action">
                        <button onClick={ ()=> {this.deleteUser(id)}} className="ui negative basic button">Delete</button>
                    </td>
                </tr>
            );
        });
    
        return (
            <table class="ui celled table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user}
                </tbody>
            </table>
    
        );
    }

}

export default UserTable;