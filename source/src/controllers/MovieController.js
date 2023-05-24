const { validationResult } = require('express-validator');

const Movie = require('../models/Movie');

// Hiển thị trang quản lí phim
let getFilmManager = async (req, res) => {
    let perPage, page
    perPage = 10;
    if(req.params.page) {
        page = parseInt(req.params.page);
    }
    const movies = await Movie.find()
    .skip((page-1) * perPage)
    .limit(perPage);
    let pages = await Movie.find()
    pages = Math.ceil(pages.length / perPage)
    pageArray = new Array(pages)
    for(let i = 0; i < pageArray.length; i++) {
        pageArray[i] = i+1
    }

    return res.render('filmManager', { layout: 'admin-layout', movies, pageArray });
  };

  // Hiển thị trang thêm phim
  let getAddFilm = (req, res) => {
    const error = req.flash('error') || '';
    const title = req.flash('title') || '';
    const description = req.flash('description') || '';
    const cast = req.flash('cast') || '';
    const director = req.flash('director') || '';
    const releaseDate = req.flash('releaseDate') || '';
    const genre = req.flash('genre') || '';
    const duration = req.flash('duration') || '';
    const language = req.flash('language') || '';
    const status = req.flash('status') || '';
    const poster = req.flash('poster') || '';
    const trailer = req.flash('trailer');

    return res.render('addFilm', {
      layout: 'admin-layout',
      error,
      title,
      description,
      cast,
      director,
      releaseDate,
      genre,
      duration,
      language,
      status,
      poster,
      trailer,
    });
  };

  // Xử lí thêm phim
  let postAddFilm = (req, res) => {
    let results = validationResult(req);
    if (results.errors.length === 0) {

      new Movie({
        title: req.body.title,
        description: req.body.description,
        cast: req.body.cast,
        director: req.body.director,
        releaseDate: req.body.releaseDate,
        genre: req.body.genre,
        duration: req.body.duration,
        language: req.body.language,
        status: req.body.status,
        poster: req.body.poster,
        trailer: req.body.trailer,
      }).save();

      res.redirect('/admin/filmManager');
    } else {
      results = results.mapped();

      let message;
      for (fields in results) {
        message = results[fields].msg;
        break;
      }

      req.flash('error', message);
      req.flash('title', req.body.title);
      req.flash('description', req.body.description);
      req.flash('cast', req.body.cast);
      req.flash('director', req.body.director);
      req.flash('releaseDate', req.body.releaseDate);
      req.flash('genre', req.body.genre);
      req.flash('duration', req.body.duration);
      req.flash('language', req.body.language);
      req.flash('status', req.body.status);
      req.flash('poster', req.body.poster);
      req.flash('trailer', req.body.trailer);

      res.redirect('/admin/filmManager/add');
    }
  };

  // Hiện thị trang chỉnh sửa phim
  let getEditFilm = async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);

    const error = req.flash('error') || '';
    const title = req.flash('title') || '';
    const description = req.flash('description') || '';
    const cast = req.flash('cast') || '';
    const director = req.flash('director') || '';
    const releaseDate = req.flash('releaseDate') || '';
    const genre = req.flash('genre') || '';
    const duration = req.flash('duration') || '';
    const language = req.flash('language') || '';
    const status = req.flash('status') || '';
    const poster = req.flash('poster') || '';
    const trailer = req.flash('trailer');

    return res.render('editFilm', { layout: 'admin-layout', movie, error,
    title,
    description,
    cast,
    director,
    releaseDate,
    genre,
    duration,
    language,
    status,
    poster,
    trailer, });
  };

  // Xử lí chỉnh sửa phim
  let postEditFilm = async (req, res) => {
    let results = validationResult(req);
    if (results.errors.length === 0) {
      const id = req.params.id;
      const movie = await Movie.findById(id);

      movie.title = req.body.title;
      movie.status = req.body.status;
      movie.description = req.body.description;
      movie.cast = req.body.cast;
      movie.director = req.body.director;
      movie.releaseDate = req.body.releaseDate;
      movie.genre = req.body.genre;
      movie.duration = req.body.duration;
      movie.language = req.body.language;
      movie.poster = req.body.poster;
      movie.trailer = req.body.trailer;

      await movie.save();
      res.redirect('/admin/filmManager');
    }
    else {
      results = results.mapped();

      let message;
      for (fields in results) {
        message = results[fields].msg;
        break;
      }

      req.flash('error', message);
      req.flash('title', req.body.title);
      req.flash('description', req.body.description);
      req.flash('cast', req.body.cast);
      req.flash('director', req.body.director);
      req.flash('releaseDate', req.body.releaseDate);
      req.flash('genre', req.body.genre);
      req.flash('duration', req.body.duration);
      req.flash('language', req.body.language);
      req.flash('status', req.body.status);
      req.flash('poster', req.body.poster);
      req.flash('trailer', req.body.trailer);

      res.redirect('/admin/filmManager/add');
    }

  };

  // Xóa phim bằng id phim
  let deleteFilmById = async (req, res) => {
    const id = req.params.id;
    await Movie.findByIdAndDelete(id);
    res.redirect('/admin/filmManager');
  }

module.exports = {
    getFilmManager,
    getAddFilm,
    postAddFilm,
    getEditFilm,
    postEditFilm,
    deleteFilmById
}