
// Hiện trang đăng nhập admin
let getLoginAdmin = async (req, res) => {
    if (!req.session.isLogined) {
      const error = req.flash('error') || '';

      return res.render('loginAdmin', { error });
    }
    return res.redirect('admin');
  };

  // Xử lí đăng nhập admin
  let postLoginAdmin = async (req, res) => {
    const { admin, passwordAdmin } = req.body;
    if (
      admin == process.env.ADMIN &&
      passwordAdmin == process.env.PASSwORDADMIN
    ) {
      return  res.redirect('/admin');
    } else {
      req.flash('error', 'Thông tin không hợp lệ');
      res.redirect('/admin/login');
    }
  };

module.exports = {
    getLoginAdmin,
    postLoginAdmin
}