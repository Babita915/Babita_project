const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

const filePath = (collection) => path.join(dataDir, `${collection}.json`);

const generateId = () => Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);

async function readCollection(collection) {
  const p = filePath(collection);
  try { 
    const content = await fs.readFile(p, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(p, '[]', 'utf8');
      return [];
    }
    throw err;
  }
}

async function writeCollection(collection, data) {
  const p = filePath(collection);
  await fs.writeFile(p, JSON.stringify(data, null, 2), 'utf8');
}

async function findOne(collection, predicate) {
  const all = await readCollection(collection);
  return all.find((item) => {
    return Object.keys(predicate).every((k) => String(item[k]) === String(predicate[k]));
  });
}

async function find(collection, query = {}) {
  const all = await readCollection(collection);
  if (!query || Object.keys(query).length === 0) return all;
  return all.filter((item) => {
    return Object.keys(query).every((k) => String(item[k]) === String(query[k]));
  });
}

async function create(collection, obj) {
  const all = await readCollection(collection);
  const now = new Date().toISOString();
  const record = Object.assign({}, obj, {id: generateId(), createdAt: now, updatedAt: now });
  all.push(record);
  await writeCollection(collection, all);
  return record;
}

async function findById(collection, id) {
  const all = await readCollection(collection);
  return all.find((item) => String(item.id) === String(id));
}

// async function findByIdAndUpdate(collection, id, payload) {
//   const all = await readCollection(collection);
//   const idx = all.findIndex((item) => String(item.id) === String(id));
//   if (idx === -1) return null;
//   all[idx] = Object.assign({}, all[idx], payload, { updatedAt: new Date().toISOString() });
//   await writeCollection(collection, all);
//   return all[idx];
// }


async function findByIdAndUpdate(collection, id, payload) {
  const all = await readCollection(collection);

  const idx = all.findIndex((item) => String(item.id) === String(id));

  if (idx === -1) return null;

  all[idx] = {
    ...all[idx],
    ...payload,
    updatedAt: new Date().toISOString()
  };

  await writeCollection(collection, all);

  return all[idx];
}


async function findByIdAndDelete(collection, id) {
  const all = await readCollection(collection);
  const idx = all.findIndex((item) => String(item.id) === String(id));
  console.log('Deleting item with id:', id, 'at index:', idx, all);
  if (idx === -1) return null;
  const [deleted] = all.splice(idx, 1);
  await writeCollection(collection, all);
  await writeCollection(collection, all);
  return deleted;
}

module.exports = {
  readCollection,
  writeCollection,
  findOne,
  find,
  create,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
};
