const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const { storeData, getAllData } = require('../services/firestore');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
  
  const { result,  suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": result,
    "suggestion": suggestion,
    "createdAt": createdAt
  }
  
  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully.',
    data
  });

  response.code(201);
  return response;
}
 
async function getPredictHistoriesHandler(request, h) {
  const document = await getAllData();
  const response = h.response({
    status: 'success',
    data: document,
  });

  response.code(200);
  return response;
}

module.exports = { postPredictHandler, getPredictHistoriesHandler} ;