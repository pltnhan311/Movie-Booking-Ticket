const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Movie = require('../models/Movie');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { error } = require('toastr')


// Hiện trang đăng ký tài khoản
let getRegisterPage = async (req, res) => {
  if(req.session.user) {
    const movies = await Movie.find();

    return res.render('home', { user: req.session.user, movies });
  }

  const error = req.flash('error') || ''
  const name = req.flash('name') || ''
  const email = req.flash('email') || ''
  const phone = req.flash('phone') || ''
  const birthDate = req.flash('birthDate') || ''
  const gender = req.flash('gender') || ''

  const nameError = req.flash('nameError') || '';
  const emailError = req.flash('emailError') || '';
  const phoneError = req.flash('phoneError') || '';
  const birthDateError = req.flash('birthDateError') || '';

  return res.render('register', {error, name, email, phone, birthDate, gender, nameError, emailError, phoneError, birthDateError})
}

// Xử lí đăng ký
const register = async (req, res) => {
  let results = validationResult(req)
  if (results.errors.length === 0){

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
    });

    await user.save();
        // Save the user in the session
    req.session.user = user;

        // Store the user's ID in the session
    req.session.userId = user._id;

        // Store the password length in the session
    req.session.passwordLength = req.body.password.length;

        // User is authenticated, you can add your own logic here.
    console.log('Register successfully!');
    console.log(req.session.userId);
    res.redirect('/');
  }
  else {
    results = results.mapped()
    let inputError = {};
    let message;
    for (fields in results){
      message = results[fields].msg
      inputError[fields] = true;
      break;
    }

    req.flash('error', message);
    req.flash('name', req.body.name);
    req.flash('email', req.body.email);
    req.flash('phone', req.body.phone);
    req.flash('birthDate', req.body.birthDate);
    req.flash('gender', req.body.gender);
    req.flash('nameError', inputError.name);
    req.flash('emailError', inputError.email);
    req.flash('phoneError', inputError.phone);
    req.flash('birthDateError', inputError.birthDay);

    res.redirect('/register')
  }
};

// Hiện trang đăng nhập
let getLoginPage = async (req, res) => {
  if(req.session.user) {
    const movies = await Movie.find();

    return res.render('home', { user: req.session.user, movies });
  }

  const error = req.flash('error') || '';
  const password = req.flash('name') || '';
  const email = req.flash('email') || '';
  const emailError = req.flash('emailError') || '';
  const passwordError = req.flash('passwordError') || '';
  return res.render('login', {error, password, email, emailError, passwordError})
}

// Xử lí trang đăng nhập
const login = async (req, res) => {
  let results = validationResult(req)
  if (results.errors.length === 0){

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.flash('error', 'Sai email hoặc mật khẩu')
      return res.redirect('/login')
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      req.flash('error', 'Sai email hoặc mật khẩu')
      req.flash('email', req.body.email);
      return res.redirect('/login');
    }

    // Save the user in the session
    req.session.user = user;

    // Store the user's ID in the session
    req.session.userId = user._id;

    // Store the password length in the session
    req.session.passwordLength = req.body.password.length;

    // User is authenticated, you can add your own logic here.
    console.log('Logged in successfully!');
    console.log(req.session.userId);
    res.redirect('/');
  }
  else {
    results = results.mapped()
    let inputError = {};
    let message;
    for (fields in results){
      message = results[fields].msg
      inputError[fields] = true;
      break;
    }
    req.flash('error', message);
    req.flash('email', req.body.email);
    req.flash('emailError', inputError.email);
    req.flash('passwordError', inputError.password);

    return res.redirect('/login');
  }

};

// Đăng xuất
let getLogoutPage = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to logout.' });
    }

    // Clear the session cookie
    res.clearCookie('connect.sid');

    // Redirect to the home page
    res.redirect('/');
  });
}

// Hiện trang thông tin người dùng
let getUpdateProfile = (req, res) => {

  const error = req.flash('error') || '';
  console.log(error)
  return res.render('userprofile', {user: req.session.user, error})
}

// Hiện trang thay đổi mật khẩu
let getChangePasswordPage = (req, res) => {

  const error = req.flash('error') || '';
  console.log(error)
  return res.render('changePassword', {user: req.session.user, error})
}

// Xử lí thay đổi thông tin người dùng
const updateProfile = async (req, res) => {
  let results = validationResult(req)
  if (results.errors.length === 0){
    // Replace 'userId' with the actual user's ID
    const userId = req.body.userId;

    const updatedUser = await User.findByIdAndUpdate(userId, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
    }, { new: true });

    // Update the session user object with the updated user data
    req.session.user = updatedUser;

    console.log('update thành công');
    res.redirect('/userprofile');
  }
  else {
    results = results.mapped()
    let inputError = {};
    let message;
    for (fields in results){
      message = results[fields].msg
      inputError[fields] = true;
      break;
    }
    req.flash('error', message);

    const error = req.flash('error') || '';
    console.log(error)
    return res.render('userprofile', {user: req.session.user, error})
  }
};


// Xử lí thay đổi mật khẩu
const changePassword = async (req, res) => {

  let results = validationResult(req)
  if (results.errors.length === 0){
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.session.user._id;
    const user = await User.findById(userId);

    // Verify if the current password is correct
    const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordCorrect) {
      req.flash('error', "Mật khẩu cũ không đúng");
      const error = req.flash('error') || '';
      return res.render('changePassword', {user: req.session.user, error})
    }
    console.log(newPassword)
    console.log(confirmNewPassword)

    // Check if the new password matches the confirmation
    if (newPassword !== confirmNewPassword) {
      req.flash('error', "Mật khẩu không khớp");
      const error = req.flash('error') || '';
      return res.render('changePassword', {user: req.session.user, error})
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    // Update the session's password length
    req.session.passwordLength = newPassword.length;

    // Inform the user of the successful password change
    console.log('doi mat khau thành công');
    res.redirect('/userprofile/changePassword');

  }
  else {
    results = results.mapped()
    let inputError = {};
    let message;
    for (fields in results){
      message = results[fields].msg
      inputError[fields] = true;
      break;
    }
    req.flash('error', message);

    const error = req.flash('error') || '';
    console.log(error)
    return res.render('changePassword', {user: req.session.user, error})
  }
};



module.exports = {
  register,
  login,
  updateProfile,
  getUpdateProfile,
  changePassword,
  getChangePasswordPage ,
  getLoginPage,
  getLogoutPage,
  getRegisterPage
};