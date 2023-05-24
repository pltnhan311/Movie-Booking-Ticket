const { validationResult } = require('express-validator');


const Promotion = require('../models/Promotion');


// Hiện trang quản lí khuyến mãi
let getPromotionManager = async (req, res) => {
  let perPage, page
      perPage = 10;
      if(req.params.page) {
          page = parseInt(req.params.page);
      }
      const promotions = await Promotion.find()
      .skip((page-1) * perPage)
      .limit(perPage);

      let pages = await Promotion.find()
      pages = Math.ceil(pages.length / perPage)
      pageArray = new Array(pages)
      for(let i = 0; i < pageArray.length; i++) {
          pageArray[i] = i+1
      }
  return res.render('promotionManager', { layout: 'admin-layout', promotions, pageArray });
};

// Hiện trang thêm khuyến mãi
let getAddPromotion = (req, res) => {
  const error = req.flash('error') || '';
  const namePromotion = req.flash('namePromotion') || '';
  const timePromotion = req.flash('timePromotion') || '';
  const theaterApply = req.flash('theaterApply') || '';
  const contentPromotion = req.flash('contentPromotion') || '';

  return res.render('addPromotion', {
    layout: 'admin-layout',
    error,
    namePromotion,
    timePromotion,
    theaterApply,
    contentPromotion,
  });
};

// Xử lí khuyến mãi
let postAddPromotion = (req, res) => {
  let results = validationResult(req);
  if (results.errors.length === 0) {
    new Promotion({
      namePromotion: req.body.namePromotion,
      timePromotion: req.body.timePromotion,
      theaterApply: req.body.theaterApply,
      contentPromotion: req.body.contentPromotion,
    }).save();

    res.redirect('/admin/promotionManager');
  } else {
    results = results.mapped();

    let message;
    for (fields in results) {
      message = results[fields].msg;
      break;
    }

    req.flash('error', message);
    req.flash('namePromotion', req.body.namePromotion);
    req.flash('timePromotion', req.body.timePromotion);
    req.flash('theaterApply', req.body.theaterApply);
    req.flash('contentPromotion', req.body.contentPromotion);

    res.redirect('/admin/promotionManager/add');
  }
};

// Hiện trang chỉnh sửa khuyến mãi
let getEditPromotion = async (req, res) => {
  const id = req.params.id;
  const promotion = await Promotion.findById(id);

  const error = req.flash('error') || '';
  const namePromotion = req.flash('namePromotion') || '';
  const timePromotion = req.flash('timePromotion') || '';
  const theaterApply = req.flash('theaterApply') || '';
  const contentPromotion = req.flash('contentPromotion') || '';

  return res.render('editPromotion', { layout: 'admin-layout', promotion, error, namePromotion, timePromotion, theaterApply, contentPromotion });
};

// Xử lí chỉnh sửa khuyến mãi
let postEditPromotion = async (req, res) => {
  let results = validationResult(req);
  if (results.errors.length === 0) {
    const id = req.params.id;
    const promotion = await Promotion.findById(id);
    promotion.namePromotion = req.body.namePromotion;
    promotion.timePromotion = req.body.timePromotion;
    promotion.theaterApply = req.body.theaterApply;
    promotion.contentPromotion = req.body.contentPromotion;
    await promotion.save();
    res.redirect('/admin/promotionManager');
  }
  else {
    results = results.mapped();

    let message;
    for (fields in results) {
      message = results[fields].msg;
      break;
    }

    req.flash('error', message);
    req.flash('namePromotion', req.body.namePromotion);
    req.flash('timePromotion', req.body.timePromotion);
    req.flash('theaterApply', req.body.theaterApply);
    req.flash('contentPromotion', req.body.contentPromotion);

    res.redirect('/admin/promotionManager/add');
  }
};

// Xóa khuyến mãi bằng id
let deletePromotionById = async (req, res) => {
  const id = req.params.id;
  await Promotion.findByIdAndDelete(id);
  res.redirect('/admin/promotionManager');
}


module.exports = {
  getPromotionManager,
  getAddPromotion,
  postAddPromotion,
  getEditPromotion,
  postEditPromotion,
  deletePromotionById,
};
