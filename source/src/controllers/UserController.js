const User = require('../models/User');

// Hiện trang quản lí người dùng
let getUserManager = async (req, res) => {

    let perPage, page
    perPage = 10;
    if(req.params.page) {
        page = parseInt(req.params.page);
    }
    const users = await User.find()
    .skip((page-1) * perPage)
    .limit(perPage);

    let pages = await User.find()
    pages = Math.ceil(pages.length / perPage)
    pageArray = new Array(pages)
    for(let i = 0; i < pageArray.length; i++) {
        pageArray[i] = i+1
    }
    return res.render('userManager', { layout: 'admin-layout', users, pageArray });
  };

// Xóa người dùng bằng id
let deleteUserById = async (req, res) => {
    const id = req.params.id;
    console.log('id')
    await User.findByIdAndDelete(id);
    res.redirect('/admin/userManager');
}

module.exports = {
    getUserManager,
    deleteUserById
}