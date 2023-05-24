const Booking = require('../models/Booking');


// Lấy doanh thu theo tháng
function getMonthlyRevenue(bookings) {

    var monthlyRevenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    // Lấy doanh thu cho từng tháng
    bookings.forEach(b =>{
        if(b.status == "Đã nhận vé") {
            total = 0
            monthCheck = b.createdAt.split('-')[1]
            if(monthCheck == 1) {
                monthlyRevenue[0] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
            else if(monthCheck == 2) {
                monthlyRevenue[1] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
            else if(monthCheck == 3) {
                monthlyRevenue[2] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
            else if(monthCheck == 4) {
                monthlyRevenue[3] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
            else if(monthCheck == 5) {
                monthlyRevenue[4] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
            else if(monthCheck == 6) {
                monthlyRevenue[5] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
            else if(monthCheck == 7) {
                monthlyRevenue[6] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
            else if(monthCheck == 8) {
                monthlyRevenue[7] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
            else if(monthCheck == 9) {
                monthlyRevenue[8] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
            else if(monthCheck == 10) {
                monthlyRevenue[9] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
            else if(monthCheck == 11) {
                monthlyRevenue[10] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
            else if(monthCheck == 12) {
                monthlyRevenue[11] += parseInt(b.totalPrice.replace(/[,. đ]/g, ""))
            }
        }

    })

    return monthlyRevenue
}

// Lấy phim có doanh thu cao nhất
function getPopularMovie(bookings) {
    movies = []
    // lấy các tên phim và gán vào mảng
    bookings.forEach(b => {
        movies.push(b.movie.title)
    })
    movies = new Set(movies)
    moviesDic = {}
    for (let item of movies) {
        moviesDic[item] = 0;
    }
    // lấy doanh thu cho từng phim
    bookings.forEach(b => {
        if(b.status == "Đã nhận vé") {
            for (let item of movies) {
                if(item == b.movie.title) {
                    moviesDic[item] += Number(b.totalPrice.replace(/[,. đ]/g, ""));;
                }
            }
        }
    })

    // Lấy tên phim hot nhất
    let maxValue = -Infinity;
    let maxKey = null;

    for (let key in moviesDic) {
        if (moviesDic[key] > maxValue) {
            maxValue = moviesDic[key];
            maxKey = key;
        }
    }

    return [maxKey, maxValue, moviesDic]
}

function getPopularTheater(bookings) {
    theaters = []
    // lấy các tên rạp và gán vào mảng
    bookings.forEach(b => {
        theaters.push(b.theater.nameCinema)
    })
    theaters = new Set(theaters)

    theatersDic = {}
    for (let item of theaters) {
        theatersDic[item] = 0;
    }

    // lấy doanh thu cho từng rạp
    bookings.forEach(b => {
        if(b.status == "Đã nhận vé") {
            for (let item of theaters) {
                if(item == b.theater.nameCinema) {
                    theatersDic[item] += Number(b.totalPrice.replace(/[,. đ]/g, ""));
                }
            }
        }
    })

    // Lấy tên rạp hot nhất
    let maxValue = -Infinity;
    let maxKey = null;

    for (let key in theatersDic) {
        if (theatersDic[key] > maxValue) {
            maxValue = theatersDic[key];
            maxKey = key;
        }
    }

    return [maxKey, maxValue, theatersDic]
}

// Hiện trang admin
let getAdminPage = async (req, res) => {
    const bookings = await Booking.find().populate('movie theater')
    revenue = 0
    count = 0
    bookings.forEach(b => {
        if(b.status == "Đã nhận vé") {
            revenue += Number(b.totalPrice.replace(/[,. đ]/g, ""))
            count += 1
        }
    })
    revenue = revenue.toLocaleString('vi-VN') + ' đ';
    let monthlyRevenue = getMonthlyRevenue(bookings)
    let [maxKey, maxValue, moviesDic] = getPopularMovie(bookings)
    let [maxKeyT, maxValueT, theatersDic] = getPopularTheater(bookings)

    maxValue = maxValue.toLocaleString('vi-VN') + ' đ';
    maxValueT = maxValueT.toLocaleString('vi-VN') + ' đ';


    return res.render('admin', { layout: 'admin-layout', bookings, count, revenue, monthlyRevenue, maxKey, maxValue, maxKeyT, maxValueT});
};

// Hiện trang doanh thu theo phim
let getRevenueMovie = async (req, res) => {
    const bookings = await Booking.find().populate('movie theater')
    revenue = 0
    count = 0
    bookings.forEach(b => {
        if(b.status == "Đã nhận vé") {
            revenue += Number(b.totalPrice.replace(/[,. đ]/g, ""))
            count += 1
        }
    })
    revenue = revenue.toLocaleString('vi-VN') + ' đ';
    let monthlyRevenue = getMonthlyRevenue(bookings)
    let [maxKey, maxValue, moviesDic] = getPopularMovie(bookings)
    let [maxKeyT, maxValueT, theatersDic] = getPopularTheater(bookings)

    let keyMovie = Object.keys(moviesDic)
    let valueMovie = Object.values(moviesDic)

    maxValue = maxValue.toLocaleString('vi-VN') + ' đ';
    maxValueT = maxValueT.toLocaleString('vi-VN') + ' đ';

    return res.render('revenueMovie',
    { layout: 'admin-layout', bookings, count, revenue,
    monthlyRevenue, maxKey, maxValue, maxKeyT, maxValueT, keyMovie, valueMovie});
};

// Hiện trang doanh thu theo rạp
let getRevenueTheater = async (req, res) => {
    const bookings = await Booking.find().populate('movie theater')
    revenue = 0
    count = 0
    bookings.forEach(b => {
        if(b.status == "Đã nhận vé") {
            revenue += Number(b.totalPrice.replace(/[,. đ]/g, ""))
            count += 1
        }
    })
    revenue = revenue.toLocaleString('vi-VN') + ' đ';
    let monthlyRevenue = getMonthlyRevenue(bookings)
    let [maxKey, maxValue, moviesDic] = getPopularMovie(bookings)
    let [maxKeyT, maxValueT, theatersDic] = getPopularTheater(bookings)

    let keyTheater = Object.keys(theatersDic)
    let valueTheater = Object.values(theatersDic)

    maxValue = maxValue.toLocaleString('vi-VN') + ' đ';
    maxValueT = maxValueT.toLocaleString('vi-VN') + ' đ';

    return res.render('revenueTheater',
    { layout: 'admin-layout', bookings, count, revenue,
    monthlyRevenue, maxKey, maxValue, maxKeyT, maxValueT, keyTheater, valueTheater});
};

// Hiện trang quản lí đặt vé
let getBookingManager = async (req, res) => {
    let perPage, page
    perPage = 10;
    if(req.params.page) {
        page = parseInt(req.params.page);
    }
    const bookings = await Booking.find().populate('user movie theater showtime food').sort()
    .skip((page-1) * perPage)
    .limit(perPage);

    let pages = await Booking.find()
    pages = Math.round(pages.length / perPage)
    pageArray = new Array(pages)
    for(let i = 0; i < pageArray.length; i++) {
        pageArray[i] = i+1
    }
    return res.render('bookingManager', { layout: 'admin-layout', bookings, pageArray});
};

// Hiện trang chi tiết đặt vé
let getBookingDetail = async (req, res) => {
    let id = req.params.id
    const booking = await Booking.findById(id).populate('user movie theater showtime food');

    return res.render('bookingDetail', { layout: 'admin-layout', booking});
};

// Thay đổi dữ liệu trong chi tiết đặt vé
let postBookingDetail = async (req, res) => {
    let id = req.params.id
    let booking = await Booking.findById(id).populate('user movie theater showtime food');
    booking.status = req.body.status
    booking.save();

    return res.redirect('/admin/bookingManager');
};


// Xóa đơn đặt vé bằng id vé
let deleteBookingById = async (req, res) => {
    const id = req.params.id;
    await Booking.findByIdAndDelete(id);
    res.redirect('/admin/bookingManager');
}


let cancelBookingById = async (req, res) => {
    const id = req.params.id;
    await Booking.findByIdAndDelete(id);
    res.redirect('/');
}


module.exports = {
    getBookingManager,
    getAdminPage,
    getRevenueMovie,
    getRevenueTheater,
    getBookingDetail,
    postBookingDetail,
    deleteBookingById,
    cancelBookingById
};
