const Fixtures = require('node-mongodb-fixtures');
const path = require('path');
module.exports = async (dbUrl) => {
  const fixtures = new Fixtures({dir: path.resolve(__dirname, './entities')});
  
  await fixtures.connect(dbUrl).then(() => fixtures.load());  
  
  const events = await Promise.resolve(fixtures._db.collection('events'))
  .then((collection) => {
    return collection.find().toArray();
 });
 const cleanup = () => fixtures.unload()
   .then(() => fixtures.disconnect());
 return { cleanup, entities: events };
}