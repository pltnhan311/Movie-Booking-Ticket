const { validationResult } = require('express-validator');

const Showtime = require('../models/Showtime');
const Theater = require('../models/Theater');
const Room = require('../models/Room');
const Movie = require('../models/Movie');
const TypeMovie = require('../models/TypeMovie');



// Hiện trang quản lí suất chiếu phim
let getShowtimeManager = async (req, res) => {
      let perPage, page
      perPage = 10;
      if(req.params.page) {
          page = parseInt(req.params.page);
      }
      const showtimes = await Showtime.find()
      .populate('theater')
      .populate('movie')
      .populate('showtime.room')
      .populate('showtime.typeMovie')
      .skip((page-1) * perPage)
      .limit(perPage);

      let pages = await Showtime.find()
      pages = Math.ceil(pages.length / perPage)
      pageArray = new Array(pages)
      for(let i = 0; i < pageArray.length; i++) {
          pageArray[i] = i+1
      }
    return res.render('showtimeManager', { layout: 'admin-layout', showtimes, pageArray });
};

// Hiện trang thêm ngày chiếu
let getAddShowtime = async (req, res) => {
    const theaters = await Theater.find();
    const movies = await Movie.find();
    error = req.flash('error') || '';
    if (error != undefined) {
      error = error[0];
    }

    return res.render('addShowdate', {
      layout: 'admin-layout',
      theaters,
      movies,
      error,
    });
};

// Xử lí thêm ngày chiếu
let postAddShowtime = async (req, res) => {
    let results = validationResult(req);
    console.log(req.body.theater)
    if(req.body.theater === "") {

      req.flash('error', "Vui lòng chọn rạp");
      return res.redirect('/admin/showtimeManager/add');

    }
    else if(req.body.movie === "") {
      req.flash('error', "Vui lòng chọn phim");
      return res.redirect('/admin/showtimeManager/add');
    }
    else if (results.errors.length === 0) {
      const showtime = await Showtime.find();

      let flag = true;
      if(showtime != null) {
        showtime.forEach(s => {
          if(s.theater == req.body.theater && s.movie == req.body.movie && s.dateTime == req.body.dateTime){
              flag = false;
            req.flash('error', 'Suất chiếu này không được trùng ngày, trùng rạp, trùng phim với suất chiếu khác');
            return;
          }
        })
      }
      if(flag) {
        new Showtime({
          movie: req.body.movie,
          theater: req.body.theater,
          dateTime: req.body.dateTime,
        }).save();

        res.redirect('/admin/showtimeManager');
      }
      else {
        res.redirect('/admin/showtimeManager/add');
      }
    }
    else {
      results = results.mapped();

      let message;
      for (fields in results) {
        message = results[fields].msg;
        break;
      }
      req.flash('error', message);

      return res.redirect('/admin/showtimeManager/add');
    }
};

// Hiện trang thêm suất chiếu
let getAddRoomAndShowtime = async (req, res) => {

    const rooms = await Room.find();
    const typeMovies = await TypeMovie.find();
    let id = req.params.id;


    error = req.flash('error') || '';
    if (error != undefined) {
      error = error[0];
    }

    return res.render('addRoomAndShowtime', {
      layout: 'admin-layout',
      rooms,
      typeMovies,
      id,
      error,
    });
};

// Hàm tính toán thời gian kết thúc phim dựa trên biến lúc phim bắt đầu và thời lượng
  function timeCalc(hour, minute, duration) {
    var hours = duration / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);

    min = rminutes + parseInt(minute);
    if (min >= 60) {
      rhours += 1;
      min -= 60;
    }
    if (min < 10) {
      min = '0' + min;
    }

    return parseInt(hour) + rhours + ':' + min;
  }

// Hàm kiểm tra suất chiếu hợp lệ
  function checkValidTime(startTime, endTime, startTimeCheck, duration) {
    hourST = parseInt(startTime.split(':')[0]);
    minuteST = parseInt(startTime.split(':')[1]);

    hourET = parseInt(endTime.split(':')[0]);
    minuteET = parseInt(endTime.split(':')[1]);

    hourSTC = parseInt(startTimeCheck.split(':')[0]);
    minuteSTC = parseInt(startTimeCheck.split(':')[1]);

    endTimeCheck = timeCalc(hourSTC, minuteSTC, duration);
    hourETC = parseInt(endTimeCheck.split(':')[0]);
    minuteETC = parseInt(endTimeCheck.split(':')[1]);


    if (hourSTC > hourET || (hourSTC == hourET && minuteSTC > minuteET)) {
      return true;
    } else if (hourETC < hourST || (hourETC == hourST && minuteETC < minuteST)) {
      return true;
    }
    return false;
  }

// Xử lí thêm suất chiếu
let postAddRoomAndShowtime = async (req, res) => {
    let results = validationResult(req);
    let id = req.params.id;
    if(req.body.room === "") {

      req.flash('error', "Vui lòng chọn phòng");
      return res.redirect('/admin/showtimeManager/addRoom/' + id);

    }
    else if(req.body.typeMovie === "") {
      req.flash('error', "Vui lòng chọn loại trình chiếu");
      return res.redirect('/admin/showtimeManager/addRoom/' + id);
    }
    if (results.errors.length === 0) {

      const showtime = await Showtime.findById(id).populate('movie');
      const showtimeUpdate = await Showtime.findById(id);

      let flag = true;
      let startTime = req.body.hour + ':' + req.body.minute;
      const showtimes = await Showtime.find()
      showtimes.forEach(s => {
        if(showtimeUpdate.dateTime === s.dateTime && String(showtimeUpdate.theater) === String(s.theater) && showtimeUpdate.id != s.id) {
          s.showtime.forEach(ss => {
            if (
              req.body.room == ss.room &&
              !checkValidTime(
                ss.startTime,
                ss.endTime,
                startTime,
                showtime.movie.duration
              )
            ) {
              flag = false;
              req.flash('error', 'Suất chiếu bị trùng với suất chiếu khác cùng ngày');
              return;
            }
          })
        }
      })



      showtimeUpdate.showtime.forEach((s) => {
        if (
          req.body.room == s.room &&
          !checkValidTime(
            s.startTime,
            s.endTime,
            startTime,
            showtime.movie.duration
          )
        ) {
          flag = false;
          req.flash('error', 'Suất chiếu bị trùng với suất chiếu khác');
          return;
        }
      });

      if (flag) {
        showtimeUpdate.showtime.push({
          room: req.body.room,
          typeMovie: req.body.typeMovie,
          startTime: req.body.hour + ':' + req.body.minute,
          endTime: timeCalc(
            req.body.hour,
            req.body.minute,
            showtime.movie.duration
          ),
        });
        await showtimeUpdate.save();
        res.redirect('/admin/showtimeManager');
      } else {
        res.redirect('/admin/showtimeManager/addRoom/' + id);
      }
    } else {
      results = results.mapped();

      let message;
      for (fields in results) {
        message = results[fields].msg;
        break;
      }

      req.flash('error', message);

      res.redirect('/admin/theaterManager/add');
    }
};

// Hiện trang sửa ngày chiếu
let getEditShowtime = async (req, res) => {
  const id = req.params.id;
  const showtime = await Showtime.findById(id);
  const theaters = await Theater.find();
  const movies = await Movie.find();
  console.log(showtime.theater)

  return res.render('editShowdate', { layout: 'admin-layout', showtime, movies, theaters});
};

// Xử lí trang sửa ngày chiếu
let postEditShowtime = async (req, res) => {
  const id = req.params.id;
  const showtime = await Showtime.findById(id);

  showtime.movie = req.body.movie;
  showtime.theater = req.body.theater;
  showtime.dateTime = req.body.dateTime;
  await showtime.save();
  res.redirect('/admin/showtimeManager');
};

// Xóa ngày chiếu bằng id
let deleteShowtimeById = async (req, res) => {
  const id = req.params.id;
  await Showtime.findByIdAndDelete(id);
  res.redirect('/admin/showtimeManager');
}

// Hiện trang thêm suất chiếu
let getEditRoomAndShowtime = async (req, res) => {
  const rooms = await Room.find();
  const typeMovies = await TypeMovie.find()
  let id = req.params.id;
  const showtime = await Showtime.find();
  let room, typeMovie, hourST, minuteST;
  showtime.forEach(s => {
    s.showtime.forEach(ss => {
      if(ss.id == id) {
        room = ss.room
        typeMovie = ss.typeMovie
        hourST = ss.startTime.split(':')[0]
        minuteST = ss.startTime.split(':')[1]
        return;
      }
    })
  })


  error = req.flash('error') || '';
  if (error != undefined) {
    error = error[0];
  }

  return res.render('editShowtime', {
    layout: 'admin-layout',
    rooms,
    typeMovies,
    id,
    room,
    typeMovie,
    hourST,
    minuteST,
    error,
  });
};

// Xử lí sửa suất chiếu
let postEditRoomAndShowtime = async (req, res) => {
  let results = validationResult(req);
  if (results.errors.length === 0) {
    let id = req.params.id;
    const showtime = await Showtime.find();
    let startTime = req.body.hour + ':' + req.body.minute;
    let flag = true;
    for (let s of showtime) {
      for (let ss of s.showtime) {
        const movie = await Movie.findById(s.movie);
        if (ss.id == id) {
          for (const sss of s.showtime) {
            if (req.body.room == sss.room && !checkValidTime(sss.startTime, sss.endTime, startTime, movie.duration)) {
              flag = false;
              break;
            }
          }
        }
        if(flag) {
          ss.room = req.body.room
          ss.startTime = startTime
          ss.endTime = timeCalc(req.body.hour,req.body.minute, movie.duration)

          await s.save()
          flag = false

          return res.redirect('/admin/showtimeManager');;
        }
        else {
          req.flash('error', 'Suất chiếu bị trùng với suất chiếu khác');
          return res.redirect('/admin/showtimeManager/editRoom/' + id);
        }

      }
    }

  } else {
    results = results.mapped();

    let message;
    for (fields in results) {
      message = results[fields].msg;
      break;
    }

    req.flash('error', message);

    res.redirect('/admin/theaterManager/add');
  }
};

// Xóa suất chiếu bằng id
let deleteRoomAndShowtimeById = async (req, res) => {
  const id = req.params.id;
  const showtimes = await Showtime.find();

  for (let s of showtimes) {
    for (let i = 0; i < s.showtime.length; i++) {
      if (s.showtime[i].id === id) {
        console.log("Found element to delete: ", s.showtime[i]);
        s.showtime.splice(i, 1);
        console.log("Deleted element: ", s.showtime);
        s.save();
        break;
      }
    }
  }

  res.redirect('/admin/showtimeManager');
}

module.exports = {
    getShowtimeManager,
    getAddShowtime,
    postAddShowtime,
    getAddRoomAndShowtime,
    postAddRoomAndShowtime,
    getEditShowtime,
    postEditShowtime,
    getEditRoomAndShowtime,
    postEditRoomAndShowtime,
    deleteShowtimeById,
    deleteRoomAndShowtimeById
}