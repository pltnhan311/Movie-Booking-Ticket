Hướng dẫn chạy project đặt vé xem phim
Đây là hướng dẫn chi tiết về cách chạy project đặt vé xem phim sử dụng Node.js và MongoDB.
---------------------------------------------------------------------------------------------
Giao diện figma
link: https://www.figma.com/file/WBanl1xfeoItFfFO677IRX/Protoype?node-id=0%3A1&t=DZ4sqXPIioeTD6zl-1

---------------------------------------------------------------------------------------------
Yêu cầu
Trước khi chạy project, bạn cần cài đặt các phần mềm sau:
- Node.js
- MongoDB Compass

---------------------------------------------------------------------------------------------
Cài đặt
- Clone repository từ GitHub: git clone <link repository>
- Di chuyển vào thư mục project: cd ten-thu-muc-project
- Cài đặt các gói phụ thuộc: npm install
- Khởi động MongoDB trên localhost hoặc cấu hình kết nối tới MongoDB từ xa.
- Khởi động server: npm start

---------------------------------------------------------------------------------------------
Import dữ liệu file JSON vào MongoDB

- Chuẩn bị file JSON chứa dữ liệu cần import vào MongoDB.

- Khởi động một phiên kết nối với MongoDB bằng cách sử dụng MongoDB Shell hoặc các công cụ quản lý MongoDB khác, chẳng hạn Compass hoặc Studio 3T. (Khuyến khích dùng MongoDB Compass)

- Đảm bảo rằng bạn đã chọn cơ sở dữ liệu (database) và bộ sưu tập (collection) mà bạn muốn import dữ liệu vào. 

- Mặc định khi khởi chạy ứng dụng lần đầu tiên, trong MongoCompass sẽ tạo ra 1 database có tên là "Cinema", trong databse Cinema đó nó cũng sẽ tự động tạo các "collections" cần thiết. Sau đó thầy có thể import các dữ liệu theo bước sau:

- Mở thư mục src/json và import dữ liệu theo thứ tự sau:
    1> user.json (người dùng)
    2> movie.json (phim)
    3> room.json (phòng)
    4> theater.json (rạp)
    5> promotion.json (khuyến mãi)
    6> typeMovie.json (loại trình chiếu ví dụ: 2D, 3D....)
    7> payment.json (phương thức thanh toán)
    8> food.json (thức ăn)
    9> showtime.json (suất chiếu)
    10> booking (đơn đặt vé)

---------------------------------------------------------------------------------------------
Chạy project
Sau khi đã cài đặt và khởi động server, bạn có thể truy cập vào địa chỉ http://localhost:3000 trên trình duyệt để sử dụng project đặt vé xem phim.

---------------------------------------------------------------------------------------------
Các tính năng
Project đặt vé xem phim sử dụng Node.js và MongoDB cung cấp các tính năng cho các đối tượng sau:
- Admin (quản trị viên)
- User (người dùng)

Đối với admin sẽ có thông tin đăng nhập từ biến môi trường (env) như sau
Tài khoản: admin
Mật khẩu: 123456

Đối với người dùng có thông tin đăng nhập trong database ví dụ một tài khoản có sẵn như sau:
Tài khoản: minh@gmail.com
Mật khẩu: 123456
