var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-northeast-1",
    endpoint: "http://localhost:8000",
    accessKeyId: "fakeId",
    secretAccessKey: "fakeKey"
  });
  
  var dynamodb = new AWS.DynamoDB();
  
  var params = {
      TableName : "Users",
      KeySchema: [
          { AttributeName: "id", KeyType: "HASH"}  //Partition key

      ],
      AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "S" }
      ],
      ProvisionedThroughput: {       
          ReadCapacityUnits: 10, 
          WriteCapacityUnits: 10
      }
  };
  
  dynamodb.createTable(params, function(err, data) {
      if (err) {
          console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
      }
  });