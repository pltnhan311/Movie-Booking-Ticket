const { check } = require('express-validator');

const loginValidator = [

  check('email').exists().withMessage('Vui lòng nhập email người dùng')
  .notEmpty().withMessage('Không được để trống email người dùng')
  .isEmail().withMessage('Đây không phải là 1 email hợp lệ'),

  check('password').exists().withMessage('Vui lòng nhập mật khẩu')
  .notEmpty().withMessage('Không được để trống mật khẩu')
  .isLength({min: 6}).withMessage('Mật khẩu phải từ 6 ký tự'),
]

const updateValidator = [

  check('phone').exists().withMessage('Vui lòng nhập số điện thoại')
  .notEmpty().withMessage('Không được để trống số điện thoại')
  .isLength({max: 10, min: 10}).withMessage('Số điện thoại phải đủ 10 số'),

  check('birthDate').isISO8601().withMessage('Vui lòng chọn ngày sinh')
  .isBefore(new Date().toISOString().split('T')[0]).withMessage('Ngày sinh phải trước ngày hiện tại')
  .notEmpty().withMessage('Không được để trống ngày sinh'),

]

const changePasswordValidator = [

  check('newPassword').exists().withMessage('Vui lòng nhập mật khẩu')
  .notEmpty().withMessage('Không được để trống mật khẩu')
  .isLength({min: 6}).withMessage('Mật khẩu phải từ 6 ký tự'),

  check('confirmNewPassword').exists().withMessage('Vui lòng nhập xác nhận mật khẩu')
  .notEmpty().withMessage('Vui lòng nhập xác nhận mật khẩu người dùng')
  .custom((value, {req}) => {
      if(value !== req.body.newPassword) {
          throw new Error('Mật khẩu không khớp')
      }
      return true;
  })
]



const registerValidator = [
  check('name').exists().withMessage('Vui lòng nhập tên người dùng')
  .notEmpty().withMessage('Không được để trống tên người dùng'),

  check('email').exists().withMessage('Vui lòng nhập email người dùng')
  .notEmpty().withMessage('Không được để trống email người dùng')
  .isEmail().withMessage('Đây không phải là 1 email hợp lệ'),

  check('phone').exists().withMessage('Vui lòng nhập số điện thoại')
  .notEmpty().withMessage('Không được để trống số điện thoại')
  .isLength({max: 10, min: 10}).withMessage('Số điện thoại phải đủ 10 số'),

  check('birthDate').isISO8601().withMessage('Vui lòng chọn ngày sinh')
  .isBefore(new Date().toISOString().split('T')[0]).withMessage('Ngày sinh phải trước ngày hiện tại')
  .notEmpty().withMessage('Không được để trống ngày sinh'),

  check('password').exists().withMessage('Vui lòng nhập mật khẩu')
  .notEmpty().withMessage('Không được để trống mật khẩu')
  .isLength({min: 6}).withMessage('Mật khẩu phải từ 6 ký tự'),

  check('comfirm-password').exists().withMessage('Vui lòng nhập xác nhận mật khẩu')
  .notEmpty().withMessage('Vui lòng nhập xác nhận mật khẩu người dùng')
  .custom((value, {req}) => {
      if(value !== req.body.password) {
          throw new Error('Mật khẩu không khớp')
      }
      return true;
  })

]

module.exports = {
  loginValidator,
  registerValidator,
  updateValidator,
  changePasswordValidator
};
