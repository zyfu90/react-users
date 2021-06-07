import React from 'react';
import './UserTable.css';
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

        const deleteUser = this.props.deleteUserFromList;

        documentClient.delete(params, (err) => {
            if (err) {
                alert("Unable to delete user. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                alert("Delete User succeeded");
                deleteUser(id);
            }
        });

    }

    render(){
        const user = this.props.users.map(( {id, name, location}) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{location}</td>
                    <td><button onClick={ ()=> {this.deleteUser(id)}} className="ui negative basic button">Delete</button></td>
                </tr>
            );
        });
    
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                    {user}
                </tbody>
    
            </table>
    
        );
    }

}

export default UserTable;