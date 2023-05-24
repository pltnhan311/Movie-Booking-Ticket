const { validationResult } = require('express-validator');

const Food = require('../models/Food');

// Hiền trang quản lí đồ ăn
let getFoodManager = async (req, res) => {

    let perPage, page
      perPage = 10;
      if(req.params.page) {
          page = parseInt(req.params.page);
      }
      const foods = await Food.find()
      .skip((page-1) * perPage)
      .limit(perPage);

      let pages = await Food.find()
      pages = Math.ceil(pages.length / perPage)
      pageArray = new Array(pages)
      for(let i = 0; i < pageArray.length; i++) {
          pageArray[i] = i+1
      }
    return res.render('foodManager', { layout: 'admin-layout', foods, pageArray });
  };

// Hiện trang thêm đồ ăn
let getAddFood = (req, res) => {
    const error = req.flash('error') || '';
    const name = req.flash('name') || '';
    const price = req.flash('price') || '';
    const status = req.flash('status') || '';
    const img = req.flash('img') || '';

    return res.render('addFood', {
      layout: 'admin-layout',
      error,
      name,
      price,
      img,
      status,
    });
};

// Xử lí thêm đồ ăn
let postAddFood = (req, res) => {
    let results = validationResult(req);
    if (results.errors.length === 0) {
      new Food({
        name: req.body.name,
        price: req.body.price,
        status: req.body.status,
        img: req.body.img,
      }).save();

      res.redirect('/admin/foodManager');
    } else {
      results = results.mapped();

      let message;
      for (fields in results) {
        message = results[fields].msg;
        break;
      }

      req.flash('error', message);
      req.flash('name', req.body.name);
      req.flash('price', req.body.price);
      req.flash('status', req.body.status);
      req.flash('img', req.body.img);

      res.redirect('/admin/foodManager/add');
    }
};

// Hiện trang thay đổi thông tin đồ ăn
let getEditFood = async (req, res) => {
    const id = req.params.id;
    const food = await Food.findById(id);

    const error = req.flash('error') || '';
    const name = req.flash('name') || '';
    const price = req.flash('price') || '';
    const status = req.flash('status') || '';
    const img = req.flash('img') || '';

    return res.render('editFood', { layout: 'admin-layout', food, error, name, price, status, img });
};

// Xử lí thay đổi thông tin đồ ăn
let postEditFood = async (req, res) => {
  let results = validationResult(req);
  if (results.errors.length === 0) {
      const id = req.params.id;
      const food = await Food.findById(id);
      food.name = req.body.name;
      food.price = req.body.price;
      food.status = req.body.status;
      food.img = req.body.img;
      await food.save();
      res.redirect('/admin/foodManager');
  }else {
    results = results.mapped();

    let message;
    for (fields in results) {
      message = results[fields].msg;
      break;
    }

    req.flash('error', message);
    req.flash('name', req.body.name);
    req.flash('price', req.body.price);
    req.flash('status', req.body.status);
    req.flash('img', req.body.img);

    res.redirect('/admin/foodManager/add');
  }
};

// Xóa đồ ăn bằng id đồ ăn
let deleteFoodById = async (req, res) => {
    const id = req.params.id;
    await Food.findByIdAndDelete(id);
    res.redirect('/admin/foodManager');
}


module.exports = {
    getFoodManager,
    getAddFood,
    postAddFood,
    getEditFood,
    postEditFood,
    deleteFoodById
}