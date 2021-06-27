import React from 'react';
import UserTable from './UserTable';
import AddUser from './AddUser';
class App extends React.Component {
    render(){
        return (
            <div className="ui container">
                <div className="ui horizontal divider">
                    User Table
                </div>
                <UserTable />
                <AddUser />
            </div>
        
        );
    }
}


export default App;