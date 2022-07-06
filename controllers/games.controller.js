// Models
const { Game } = require('../models/game.model');
const { Console } = require('../models/console.model');
const { GameInConsole } = require('../models/gameInConsole.model');
const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllGames = catchAsync(async (req, res, next) => {
  const games = await Game.findAll({
    include: [{ model: Console }, { model: Review }],
  });

  res.status(200).json({
    status: 'success',
    games,
  });
});

const createGame = catchAsync(async (req, res, next) => {
  const { title, genre } = req.body;

  const newGame = await Game.create({
    title,
    genre,
  });

  res.status(201).json({
    status: 'success',
    newGame,
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const { comment } = req.body;
  const { sessionUser } = req;

  const newReview = await Review.create({
    comment,
    userId: sessionUser.id,
  });

  res.status(201).json({
    status: 'success',
    newReview,
  });
});

const assignGameToConsole = catchAsync(async (req, res, next) => {
  const { gameId, consoleId } = req.body;

  const newGameInConsole = await GameInConsole.create({ gameId, consoleId });

  res.status(201).json({
    status: 'success',
    newGameInConsole,
  });
});

const updateGame = catchAsync(async (req, res, next) => {
  const { game } = req;
  const { title } = req.body;

  await game.update({ title });

  res.status(204).json({ status: 'success' });
});

const deleteGame = catchAsync(async (req, res, next) => {
  const { game } = req;

  await game.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});

module.exports = {
  getAllGames,
  createGame,
  createReview,
  assignGameToConsole,
  updateGame,
  deleteGame,
};
