// phu trach tat ca route
const express = require("express");
const homeController = require("../controllers/moduleController");

let router = express.Router(); // dinh nghia, khai bao route

const initWebRoute = (app) => {
  // Home
  router.get("/", homeController.getHomePage);
  router.get("/comingsoon", homeController.getHomePageComingSoon);

  // Movie detail
  router.get("/movieDetail/:id", homeController.getMovieDetailPage);
  router.get("/cinema", homeController.getCinemaDetails);

  // User profile
  router.get("/userprofile", homeController.getUserProfile);
  router.get("/bookingHistory", homeController.getBookingHistory);

  // Showtime
  router.get("/showtime", homeController.getShowtimePage);
  router.get("/showtime/:dateTime", homeController.getShowtimeByDate);

  // Cinema
  router.get("/cinemaInfor/:id", homeController.getCinemaInfor);

  // Promotion
  router.get("/promotion", homeController.getPromotion);
  router.get("/promotionInfor/:id", homeController.getPromotionInfor);

  router.get("/aboutUs", homeController.getAboutUsPage);
  router.get("/giftCard", homeController.getGiftCardPage);
  router.get("/careers", homeController.getCareersPage);
  router.get("/terms-conditions", homeController.getTermsConditionsPage);

  // Booking
  router.get('/bookingProgress/:showtimeId', homeController.getBookingProgress);
  router.post('/bookingProgress/:showtimeId', homeController.getBookingProgress);

  router.post('/booking/:showtimeId', homeController.postBookingProgress)

  return app.use("/", router); // tien to route, vidu /abc thi -> /abc/about
};

module.exports = initWebRoute;
