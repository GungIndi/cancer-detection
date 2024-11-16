const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
  if (!process.env.MODEL_URL) {
    throw new Error('MODEL_URL environment variable is not set.');
  }
  try { 
    console.log(`Loading model from: ${process.env.MODEL_URL}`);
    const model = await tf.loadGraphModel(process.env.MODEL_URL);
    console.log('Model loaded successfully');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
}

module.exports = loadModel;