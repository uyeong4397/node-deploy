/*
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

const basename = path.basename(__filename);
fs
  .readdirSync(__dirname) // ���� ������ ��� ������ ��ȸ
  .filter(file => { // ���� ����, index.js, js Ȯ���ڰ� �ƴ� ���� ���͸�
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => { // �ش� ������ �� �ҷ��ͼ� init
    const model = require(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    //model.initiate(sequelize);
  });

Object.keys(db).forEach(modelName => { // associate ȣ��
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
*/



//'use strict';

//const fs = require('fs');
//const path = require('path');
const Sequelize = require('sequelize');
//const process = require('process');
//const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize= new Sequelize(
  config.database, config.username, config.password, config,
);


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./users')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
db.Post.belongsToMany(db.Hashtag, {through:'PostHashtag'});
db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});
db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',
  as:'Followers',
  through:'Follow',
});
db.User.belongsToMany(db.User, {
  foreignKey:'followerId',
  as:'Followings',
  through:'Follow',
});


module.exports = db;
/*
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
*/

