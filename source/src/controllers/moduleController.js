const { restart } = require('nodemon');
const Movie = require('../models/Movie');
const Showtime = require('../models/Showtime');
const Theater = require('../models/Theater');
const Promotion = require('../models/Promotion');
const Food = require('../models/Food');
const Room = require('../models/Room');
const TypeMovie = require('../models/TypeMovie');
const Booking = require('../models/Booking')
const Payment = require('../models/Payment')

// Hiển thị trang chủ với các phim đang chiếu
let getHomePage = async (req, res) => {
  const movies = await Movie.find({status: "Đang chiếu"});

  return res.render('home', { user: req.session.user, movies});
};

// Hiển thị trang chủ với các phim sắp chiếu
let getHomePageComingSoon = async (req, res) => {
  const movies = await Movie.find({status: "Sắp chiếu"});

  return res.render('home', { user: req.session.user, movies});
};

// Hiển thị trang chi tiết phim
let getMovieDetailPage = async (req, res) => {
  let id = req.params.id;
  const movies = await Movie.find();
  const movie = await Movie.findById(id);
  const cities = await Theater.distinct('city');
  const cinemas = await Theater.distinct('nameCinema');
  const theaters = await Theater.find();

  // Filter showtimes by movie _id value
  const showtimes = await Showtime.find({ movie: id })
    .populate('movie')
    .populate('theater')
    .populate('showtime.room');

  const movieShowtimes = showtimes.filter((st) => st.movie._id.equals(id));
  const cinemaNames = movieShowtimes.map((st) => st.theater.nameCinema);

  return res.render('movieDetail', {
    user: req.session.user,
    movie,
    showtimes: movieShowtimes,
    cinemaNames,
    cities,
    cinemas,
    theaters,
    movies,
  });
};

// Hiển thị trang rạp
let getCinemaDetails = async (req, res) => {
  const theaters = await Theater.find();
  return res.render('cinemaDetails', { user: req.session.user, theaters});
};


// Hiển thị trang khuyến mãi
let getPromotion = async (req, res) => {
  const promotions = await Promotion.find();
  return res.render('promotion', { user: req.session.user, promotions });
};


// Hiển thị trang lịch chiếu phim
let getShowtimePage = async (req, res) => {
  let showtimes = await Showtime.find();
  let date = []
  showtimes.forEach(d => {
    date.push(d.dateTime)
  })
  date = new Set(date)
  console.log(new Set(date))
  return res.render('showtime', { user: req.session.user, date });
};


// Hiển thị lịch chiếu phim theo ngày
let getShowtimeByDate = async (req, res) => {

  dateTime = req.params.dateTime
  let movies = await Movie.find();
  let showtimes = await Showtime.find();
  let date = []
  let movieArray = []
  let typeMovie = []
  showtimes.forEach(d => {
    date.push(d.dateTime)
    movies.push(d.movie.title)
  })
  date = new Set(date.sort())

  let moviefind = await Showtime.find({dateTime: dateTime}).populate('movie')
  moviefind.forEach(m => {
    movieArray.push(m.movie.title)
  })


  movieArray = new Set(movieArray)

  const showtime = await Showtime.find({dateTime: dateTime})
      .populate('theater')
      .populate('movie')
      .populate('showtime.room')
      .populate('showtime.typeMovie');


  dateTime = "Ngày " + dateTime.split('-')[2] + " Tháng " + dateTime.split('-')[1] + " Năm " + dateTime.split('-')[0]
  return res.render('showtime', { user: req.session.user, date, showtime, movieArray, dateTime });
};

// Hiển thị trang thông tin người dùng
let getUserProfile = async (req, res) => {
  // const dummyPassword = '.'.repeat(req.session.passwordLength);
  return res.render('userProfile', { user: req.session.user });
};

// Hiển thị lịch sử đặt vé của người dùng
let getBookingHistory = async (req, res) => {
  if(req.session.user._id) {
    let id = req.session.user._id
    console.log(req.session.user)
    const bookings = await Booking.find({user: id}).populate('user movie theater showtime food')
    return res.render('bookingHistory', { user: req.session.user, bookings})
  }
  else {
    return res.redirect('/')
  }
}

// Hiện thị trang thông tin rạp
let getCinemaInfor = async (req, res) => {
  let id = req.params.id;
  const theater = await Theater.findById(id);
  const theaters = await Theater.find();
  return res.render('cinemaInfor', { user: req.session.user, theater, theaters});
};

// Hiện thị trang thông tin khuyến mãi
let getPromotionInfor = async (req, res) => {
  let id = req.params.id;
  const promotion = await Promotion.findById(id);
  const promotions = await Promotion.find();
  return res.render('promotionInfor', { user: req.session.user, promotion, promotions});
};

// Hiện thị trang về chúng tôi
let getAboutUsPage = async (req, res) => {
  const theaters = await Theater.find();
  return res.render('aboutUS', { user: req.session.user, theaters});
};

let getGiftCardPage = (req, res) => {
  return res.render('giftCard', { user: req.session.user });
};

let getCareersPage = (req, res) => {
  return res.render('careers', { user: req.session.user });
};

let getTermsConditionsPage = async (req, res) => {
  const theaters = await Theater.find();
  return res.render('termsConditions', { user: req.session.user, theaters});
};

let getBookingProgress = async(req, res) => {
  try {
    // Extract the showtime ID from the URL parameter
    const showtimeId = req.params.showtimeId;
    const cinemaId = req.body.nameCinema;
    const showTime = req.body.showTime;
    const selectedSeats = req.body.selectedSeats;
    const dateTime = req.body.dateTime;
    // Find the Showtime document corresponding to the ID
    const payments = await Payment.find()
    const showtime = await Showtime.findById(showtimeId).populate('movie theater').populate("showtime.room");
    let roomId;
    let typeMovieId;
    let startTime;
    let endTime;
    let sId;

    const filterShowtime = await Showtime.findById(showtimeId)
    filterShowtime.showtime.forEach(fs => {
      if(fs.id === showTime) {
        sId = fs.id
        roomId = fs.room
        typeMovieId = fs.typeMovie
        startTime = fs.startTime
        endTime = fs.endTime
      }
    })

    const theater = await Theater.findById(cinemaId)
    const room = await Room.findById(roomId);
    const typeMovie = await TypeMovie.findById(typeMovieId)

    const food = await Food.find()

    quantitySeat = JSON.parse(selectedSeats).length
    seatTotalPrice = (quantitySeat * typeMovie.price)
    displaySeatTotalPrice = seatTotalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'});


    // Render the seat selection page and pass the Showtime and Room documents to it
    res.render('seatSelection', {
      showtimeId,
      title: 'Select Seats',
      user: req.session.user,
      showtime: showtime,
      room,
      typeMovie,
      theater,
      showTime,
      selectedSeats,
      seatTotalPrice,
      displaySeatTotalPrice,
      dateTime,
      sId,
      startTime,
      endTime,
      food,
      payments
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

let postBookingProgress = async(req, res) => {
  const user = req.body.userId
  const movie = req.body.movieId
  const cinema = req.body.cinemaId;
  const showtimeId = req.body.showtimeId;
  const sId = req.body.sId;
  const selectedSeats = req.body.selectedSeats;
  let comboFood
  if(req.body.comboFood != "none") {
    comboFood = req.body.comboFood;
  }
  else {
    comboFood = "none";
  }
  const totalPrice = req.body.totalPrice;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  let booking = new Booking({
    user: user,
    movie: movie,
    theater: cinema,
    showtime: showtimeId,
    sId: sId,
    seats: selectedSeats,
    food: comboFood,
    status: "Chờ nhận vé",
    totalPrice: totalPrice,
    payment: req.body.payment,
    createdAt: today
  }).save()

  res.redirect('/');
}

module.exports = {
  getHomePage,
  getHomePageComingSoon,
  getShowtimePage,
  getShowtimeByDate,
  getMovieDetailPage,
  getCinemaDetails,
  getPromotion,
  getPromotionInfor,
  getUserProfile,
  getBookingHistory,
  getCinemaInfor,
  getAboutUsPage,
  getGiftCardPage,
  getCareersPage,
  getTermsConditionsPage,
  getBookingProgress,
  postBookingProgress
};
