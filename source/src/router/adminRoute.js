// phu trach tat ca route
const express = require('express');

const AdminController = require('../controllers/AdminController');
const addValidator = require('./validator/addValidator');
const editValidator = require('./validator/editValidator');

const LoginAdminController = require('../controllers/LoginAdminController')
const UserController = require('../controllers/UserController')
const MovieController = require('../controllers/MovieController')
const ShowtimeController = require('../controllers/ShowtimeController');
const FoodController = require('../controllers/FoodController')
const TheaterController = require('../controllers/TheaterController')
const PromotionController = require('../controllers/PromotionController')

let router = express.Router(); // dinh nghia, khai bao route

const adminRoute = (app) => {
  // Revenue
  router.get('/', AdminController.getAdminPage)
  router.get('/revenueMovie', AdminController.getRevenueMovie)
  router.get('/revenueTheater', AdminController.getRevenueTheater)

  // Booking
  router.get('/bookingManager', AdminController.getBookingManager)
  router.get('/bookingDetail/:id', AdminController.getBookingDetail)
  router.get('/bookingManager/:page', AdminController.getBookingManager)
  router.post('/bookingDetail/:id', AdminController.postBookingDetail)
  router.get('/bookingManager/delete/:id', AdminController.deleteBookingById)
  router.get('/bookingManager/cancel/:id', AdminController.cancelBookingById)

  // User
  router.get('/userManager', UserController.getUserManager);
  router.get('/userManager/:page', UserController.getUserManager);
  router.get('/userManager/delete/:id', UserController.deleteUserById);
  router.get('/login', LoginAdminController.getLoginAdmin);
  router.post('/login', LoginAdminController.postLoginAdmin);

  // Film
  router.get('/filmManager', MovieController.getFilmManager);
  router.get('/filmManager/add', MovieController.getAddFilm);
  router.get('/filmManager/:page', MovieController.getFilmManager);
  router.post(
    '/filmManager/add',
    addValidator.addFilmValidator,
    MovieController.postAddFilm
  );
  router.get('/filmManager/edit/:id',  MovieController.getEditFilm);
  router.post('/filmManager/edit/:id', editValidator.editFilmValidator, MovieController.postEditFilm);
  router.get('/filmManager/delete/:id', MovieController.deleteFilmById);

  // Theater
  router.get('/theaterManager', TheaterController.getTheaterManager);
  router.get('/theaterManager/add', TheaterController.getAddTheater);
  router.get('/theaterManager/:page', TheaterController.getTheaterManager);
  router.post(
    '/theaterManager/add',
    addValidator.addTheaterValidator,
    TheaterController.postAddTheater
  );
  router.get('/theaterManager/edit/:id', addValidator.addTheaterValidator, TheaterController.getEditTheater);
  router.post('/theaterManager/edit/:id', editValidator.editTheaterValidator, TheaterController.postEditTheater)
  router.get('/theaterManager/delete/:id', TheaterController.deleteTheaterById);

   // Promotion
  router.get('/promotionManager', PromotionController.getPromotionManager);
  router.get('/promotionManager/add', PromotionController.getAddPromotion);
  router.post(
    '/promotionManager/add',
    addValidator.addPromotionValidator,
    PromotionController.postAddPromotion
    );
  router.get('/promotionManager/:page', PromotionController.getPromotionManager);
  router.get('/promotionManager/edit/:id', PromotionController.getEditPromotion);
  router.post('/promotionManager/edit/:id', editValidator.editPromotionValidator, PromotionController.postEditPromotion);
  router.get('/promotionManager/delete/:id', PromotionController.deletePromotionById);

  // Food
  router.get('/foodManager', FoodController.getFoodManager);
  router.get('/foodManager/add', FoodController.getAddFood);
  router.post(
    '/foodManager/add',
    addValidator.addFoodValidator,
    FoodController.postAddFood
    );
  router.get('/foodManager/:page', FoodController.getFoodManager);
  router.get('/foodManager/edit/:id', FoodController.getEditFood);
  router.post('/foodManager/edit/:id', editValidator.editFoodValidator, FoodController.postEditFood);
  router.get('/foodManager/delete/:id', FoodController.deleteFoodById);


  // Showtime
  router.get('/showtimeManager', ShowtimeController.getShowtimeManager);
  router.get('/showtimeManager/add', ShowtimeController.getAddShowtime);
  router.post('/showtimeManager/add', addValidator.addShowdateValidator, ShowtimeController.postAddShowtime);
  router.get('/showtimeManager/:page', ShowtimeController.getShowtimeManager);
  router.get('/showtimeManager/edit/:id', ShowtimeController.getEditShowtime);
  router.post('/showtimeManager/edit/:id', ShowtimeController.postEditShowtime);
  router.get('/showtimeManager/delete/:id', ShowtimeController.deleteShowtimeById);

  router.get('/showtimeManager/addRoom/:id', ShowtimeController.getAddRoomAndShowtime );
  router.post( '/showtimeManager/addRoom/:id', ShowtimeController.postAddRoomAndShowtime);

  router.get('/showtimeManager/editRoom/:id', ShowtimeController.getEditRoomAndShowtime );
  router.post( '/showtimeManager/editRoom/:id', ShowtimeController.postEditRoomAndShowtime);

  router.get('/showtimeManager/deleteRoom/:id', ShowtimeController.deleteRoomAndShowtimeById);

  return app.use('/admin', router); // tien to route, vidu /abc thi -> /abc/about
};

module.exports = adminRoute;
