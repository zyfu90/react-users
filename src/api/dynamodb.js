const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "http://localhost:8000",
  accessKeyId: "fakeId",
  secretAccessKey: "fakeKey"
});

const documentClient = new AWS.DynamoDB.DocumentClient();

export default documentClient;