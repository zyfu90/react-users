import React from 'react';
import UserTable from './UserTable';
import AddUser from './AddUser';
import documentClient from '../api/dynamodb';

class App extends React.Component {

    state = { users: [] }

    componentDidMount() {
        const data =  documentClient.scan({TableName : "Users"}).promise();
        data.then((result) => {
            this.setState({ users: result.Items })
        });
    }

    addUserToList = (user) => {
        const newUserList = this.state.users;
        newUserList.push(user);
        this.setState({users: newUserList})
    }

    deleteUserFromList = (id) => {
        const userList = this.state.users;
        userList.forEach((user) => {
            if(user.id === id){
                userList.splice(userList.indexOf(user), 1);
            }
        });

        this.setState({users: userList});
    }

    render(){
        return (
            <div className="ui container">
                <div class="ui horizontal divider">
                    User Table
                </div>
                <UserTable deleteUserFromList={this.deleteUserFromList} users={this.state.users} />
                <AddUser addUserToList={this.addUserToList}></AddUser>
            </div>
        
        );
    }
}

export default App;