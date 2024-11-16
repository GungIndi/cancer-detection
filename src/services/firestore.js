const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();

async function storeData(id, data) {
  console.log(db);
  const predictCollections = db.collection('predictions');
  console.log("Collections 'predictions' berhasil dibuat.", predictCollections);
  const predictDoc = await predictCollections.doc(id);
  console.log(`${data} berhasil disimpan`, data);
  await predictDoc.set(data);
}

async function getAllData() {
  console.log(db);
  const histories = await db.collection('predictions').get();
  let documents = [];
    histories.forEach(doc => {
      documents.push({ id: doc.id, ...doc.data() });
  });
  console.log('Retrieved documents:', documents);
  return documents;
}

module.exports = { storeData, getAllData };
