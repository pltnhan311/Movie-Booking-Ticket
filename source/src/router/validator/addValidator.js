const { check } = require('express-validator');

const addFilmValidator = [
  check('title')
    .exists()
    .withMessage('Vui lòng nhập tên phim')
    .notEmpty()
    .withMessage('Không được để trống tên phim'),

  check('genre')
    .exists()
    .withMessage('Vui lòng nhập thể loại')
    .notEmpty()
    .withMessage('Không được để trống thể loại'),

  check('description')
    .exists()
    .withMessage('Vui lòng nhập mô tả')
    .notEmpty()
    .withMessage('Không được để trống mô tả'),

  check('cast')
    .exists()
    .withMessage('Vui lòng nhập diễn viên')
    .notEmpty()
    .withMessage('Không được để trống diễn viên'),

  check('director')
    .exists()
    .withMessage('Vui lòng nhập đạo diễn')
    .notEmpty()
    .withMessage('Không được để trống đạo diễn'),

  check('releaseDate')
    .exists()
    .withMessage('Vui lòng nhập ngày khởi chiếu')
    .notEmpty()
    .withMessage('Không được để trống ngày khởi chiếu'),

  check('duration')
    .exists()
    .withMessage('Vui lòng nhập thời lượng')
    .notEmpty()
    .withMessage('Không được để trống thời lượng')
    .isNumeric().withMessage('Thời lượng phải là số'),

  check('language')
    .exists()
    .withMessage('Vui lòng nhập ngôn ngữ')
    .notEmpty()
    .withMessage('Không được để trống ngôn ngữ'),

  check('status')
    .exists()
    .withMessage('Vui lòng chọn trạng thái'),

  check('poster')
    .exists()
    .withMessage('Vui lòng nhập link poster')
    .notEmpty()
    .withMessage('Không được để trống link poster'),

  check('trailer')
    .exists()
    .withMessage('Vui lòng nhập link trailer')
    .notEmpty()
    .withMessage('Không được để trống link trailer'),
];

const addTheaterValidator = [
  check('nameCinema')
    .exists()
    .withMessage('Vui lòng nhập tên rạp')
    .notEmpty()
    .withMessage('Không được để trống tên rạp'),

  check('city')
    .exists()
    .withMessage('Vui lòng nhập khu vực')
    .notEmpty()
    .withMessage('Không được để trống khu vực'),

  check('addressCinema')
    .exists()
    .withMessage('Vui lòng nhập địa chỉ rạp')
    .notEmpty()
    .withMessage('Không được để trống địa chỉ rạp'),

  check('phoneCinema')
    .exists()
    .withMessage('Vui lòng nhập số hotline')
    .notEmpty()
    .withMessage('Không được để trống số hotline')
    .isMobilePhone()
    .withMessage('Vui lòng nhập số hotline hợp lệ'),
];

const addPromotionValidator = [
  check('namePromotion')
    .exists()
    .withMessage('Vui lòng nhập tên khuyến mãi')
    .notEmpty()
    .withMessage('Không được để trống tên khuyến mãi'),
  check('timePromotion')
    .exists()
    .withMessage('Vui lòng nhập thời gian áp dụng khuyến mãi')
    .notEmpty()
    .withMessage('Không được để trống thời gian áp dụng khuyến mãi'),
  check('theaterApply')
    .exists()
    .withMessage('Vui lòng nhập rạp áp dụng khuyến mãi')
    .notEmpty()
    .withMessage('Không được để trống rạp áp dụng khuyến mãi'),
  check('contentPromotion')
    .exists()
    .withMessage('Vui lòng nhập nội dung khuyến mãi')
    .notEmpty()
    .withMessage('Không được để trống nội dung khuyến mãi'),
  check('imgPromotion')
    .exists()
    .withMessage('Vui lòng nhập đường dẫn hình ảnh')
    .notEmpty()
    .withMessage('Không được để trống đường dẫn hình ảnh')
    .isURL()
    .withMessage('Vui lòng nhập đường dẫn hình ảnh hợp lệ')
];

const addFoodValidator = [
  check('name')
    .exists()
    .withMessage('Vui lòng nhập tên món ăn')
    .notEmpty()
    .withMessage('Không được để trống tên món ăn'),

  check('price')
    .exists()
    .withMessage('Vui lòng nhập giá')
    .notEmpty()
    .withMessage('Không được để trống giá')
    .isNumeric()
    .withMessage('Vui lòng nhập giá hợp lệ'),

  check('status')
    .exists()
    .withMessage('Vui lòng nhập trạng thái')
    .notEmpty()
    .withMessage('Không được để trống trạng thái'),

  check('img')
    .exists()
    .withMessage('Vui lòng nhập đường dẫn hình ảnh')
    .notEmpty()
    .withMessage('Không được để trống đường dẫn hình ảnh')
    .isURL()
    .withMessage('Vui lòng nhập đường dẫn hình ảnh hợp lệ'),
];

const addShowdateValidator = [
  check('movie')
    .notEmpty()
    .withMessage('Vui lòng chọn phim'),

  check('theater')
    .notEmpty()
    .withMessage('Vui lòng chọn rạp'),

    check('dateTime').isISO8601().withMessage('Vui lòng chọn ngày chiếu')
    .isAfter(new Date().toISOString().split('T')[0]).withMessage('Ngày chiếu phải sau ngày hiện tại')
    .notEmpty().withMessage('Không được để trống ngày sinh'),

];

module.exports = { addFilmValidator, addTheaterValidator, addPromotionValidator , addFoodValidator, addShowdateValidator };
