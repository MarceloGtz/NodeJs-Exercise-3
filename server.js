const dotenv = require('dotenv');
const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Review } = require('./models/review.model');
const { Game } = require('./models/game.model');
const { Console } = require('./models/console.model');

// Utils
const { db } = require('./utils/database.util');

dotenv.config({ path: './config.env' });

db.authenticate()
  .then(() => console.log('Db authenticated'))
  .catch(err => console.log(err));

// Establish model's relations

// 1 User <----> M Review
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

// 1 Game <----> M Review
Game.hasMany(Review, { foreignKey: 'gameId' });
Review.belongsTo(Game);

// M Game <---> M Console
Game.belongsToMany(Console, { through: 'gameInConsole' });
Console.belongsToMany(Game, { through: 'gameInConsole' });

db.sync()
  .then(() => console.log('Db synced'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log('Express app running!!');
});
