const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    let result, suggestion;

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;
    console.log(confidenceScore);

    if (confidenceScore > 50) {
      result = 'Cancer'
    } else if (confidenceScore <= 50) {
      result = 'Non-cancer'
    }

    if (result === 'Cancer') {
      suggestion = "Segera periksa ke dokter!"
    }

    if (result === 'Non-cancer') {
      suggestion = "Penyakit kanker tidak terdeteksi."
    }

    return { result, suggestion };
  } catch (error) {
    console.log(error);
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;