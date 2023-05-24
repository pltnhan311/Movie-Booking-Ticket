const { validationResult } = require('express-validator');
const Theater = require('../models/Theater');

// Hiện trang quản lí rạp
let getTheaterManager = async (req, res) => {
    let perPage, page
      perPage = 10;
      if(req.params.page) {
          page = parseInt(req.params.page);
      }
      const theaters = await Theater.find()
      .skip((page-1) * perPage)
      .limit(perPage);

      let pages = await Theater.find()
      pages = Math.ceil(pages.length / perPage)
      pageArray = new Array(pages)
      for(let i = 0; i < pageArray.length; i++) {
          pageArray[i] = i+1
      }
    return res.render('theaterManager', { layout: 'admin-layout', theaters, pageArray });
  };

// Hiện trang thêm rạp
let getAddTheater = (req, res) => {
    const error = req.flash('error') || '';
    const nameCinema = req.flash('nameCinema') || '';
    const city = req.flash('city') || '';
    const addressCinema = req.flash('addressCinema') || '';
    const phoneCinema = req.flash('phoneCinema') || '';

    return res.render('addTheater', {
      layout: 'admin-layout',
      error,
      nameCinema,
      city,
      addressCinema,
      phoneCinema,
    });
};

// Xử lí thêm rạp
let postAddTheater = (req, res) => {
    let results = validationResult(req);
    if (results.errors.length === 0) {
      new Theater({
        nameCinema: req.body.nameCinema,
        city: req.body.city,
        addressCinema: req.body.addressCinema,
        phoneCinema: req.body.phoneCinema,
      }).save();

      res.redirect('/admin/theaterManager');
    } else {
      results = results.mapped();

      let message;
      for (fields in results) {
        message = results[fields].msg;
        break;
      }

      req.flash('error', message);
      req.flash('nameCinema', req.body.nameCinema);
      req.flash('city', req.body.city);
      req.flash('addressCinema', req.body.addressCinema);
      req.flash('phoneCinema', req.body.phoneCinema);

      res.redirect('/admin/theaterManager/add');
    }
};

// Hiện chỉnh sửa rạp
let getEditTheater = async (req, res) => {
    const id = req.params.id;
    const theater = await Theater.findById(id);

    const error = req.flash('error') || '';
    const nameCinema = req.flash('nameCinema') || '';
    const city = req.flash('city') || '';
    const addressCinema = req.flash('address') || '';
    const phoneCinema = req.flash('phone') || '';

    return res.render('editTheater', {layout: 'admin-layout', theater, error, nameCinema, city, addressCinema, phoneCinema})
}

// Xử lí sửa rạp
let postEditTheater = async (req, res) => {
  let results = validationResult(req);
  if (results.errors.length === 0) {
    const id = req.params.id;
    const theater = await Theater.findById(id);
    theater.nameCinema = req.body.nameCinema;
    theater.city = req.body.city;
    theater.addressCinema = req.body.address;
    theater.phoneCinema = req.body.phone;
    theater.img = req.body.img;

    await theater.save();
    res.redirect('/admin/TheaterManager')
  }
  else {
    results = results.mapped();

    let message;
    for (fields in results) {
      message = results[fields].msg;
      break;
    }

    req.flash('error', message);
    req.flash('nameCinema', req.body.nameCinema);
    req.flash('city', req.body.city);
    req.flash('address', req.body.address);
    req.flash('phone', req.body.phone);

    res.redirect('/admin/theaterManager/add');
  }
}

// Xóa rạp bằng id
let deleteTheaterById = async (req, res) => {
    const id = req.params.id;
    await Theater.findByIdAndDelete(id);
    res.redirect('/admin/TheaterManager');
}

module.exports = {
    getTheaterManager,
    getAddTheater,
    postAddTheater,
    getEditTheater,
    postEditTheater,
    deleteTheaterById
}