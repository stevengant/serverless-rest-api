// third party library
const dynamoose  =require('dynamoose');

// create a schema
const schema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "phone": String
});

const peopleModel = dynamoose.model('people', schema);


exports.handler = async (event) => {
  console.log('the pathParameters', event.pathParameters);

  const response = { statusCode: null, body: null };
  let results = null;
  
  try {
    let id = event.pathParameters.id;
    console.warn('id', id);
    if(event.pathParameters)
    {
      results = await peopleModel.get({'id': id});
    }
    else
    {
      results = await peopleModel.scan().exec();
    }
    
    console.log(results);
    response.body = JSON.stringify(results);
    response.statusCode = 200;

  } 
  catch (e) {
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  return response;
};