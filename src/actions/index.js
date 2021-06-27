import documentClient from '../api/dynamodb';

const TABLE_NAME='Users';

export const fetchUsers = () => dispatch => {
    const response = documentClient.scan( { TableName : TABLE_NAME }).promise();
    response.then( data => {
        dispatch({
            type: 'FETCH_USERS',
            payload: data.Items
        });
    })
}


export const addUser = (name, location) => dispatch => {
    var params = {
        TableName: TABLE_NAME,
        Item:{
            "name": name,
            "location": location,
            "id": require('crypto').randomBytes(10).toString('hex')
        }
    };

    documentClient.put(params, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            dispatch({
                type: 'ADD_USER',
                payload: params.Item
            });
        }
    });
}


export const deleteUser = (user) => dispatch => {
    var params = {
        TableName: TABLE_NAME,
        Key: {
            "id": user.id
        }
    }

    documentClient.delete(params, (err) => {
        if (err) {
            console.log("Unable to delete user. Error JSON:", JSON.stringify(err, null, 2));
            return null;
        } else {
            dispatch({
                type: 'DELETE_USER',
                payload: user
            })
        }
    });
}