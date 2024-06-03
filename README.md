* Step 1: -  click chuột phải vào folder back end rồi chọn open in integrated terminal
          -  chạy npm i để tải thư viện ==> sau đó npm start để chạy project
          (làm tương tự với thư mục fontend)
* Step 2: - tài khoản admin:
            + username: myadmin
            + pass: 123
          - tài khoản user:
            + username: testuser1
            + pass: 123

>>>>>> Các vấn đề đang gặp phải >>>>>>>>
1. Vấn đề việc lưu giữ refresh cookies( ở phần backend:  controllers/authController.js):
    + ở dòng 6 em tạo ra refreshTokens: dùng để lưu các token của người dùng với mục đích
     để kiểm tra xem token của người dùng với token của database có trùng không.
     Chỉ khi tồn tại thì mới cho đăng nhập hoặc làm các chức năng khác
     (chuẩn ra em đáng ra phải lưu vào database nhưng em chưa làm)
    + Code này nó còn liên quan đến dòng 112, nếu em tắt backend thì sẽ mất refresh cookies 
     mình đang giữ để kiểm tra hợp lệ

2. Vấn đề về việc xác thực( ở font end  components/admin )
   + Em gặp vấn đề ở font end là khi đăng nhập với với tài khoản admin để điều  hướng về
     trang Manager Product. anh có thể xem hàm useEffect ở dòng 27 của em .
   + Vấn đề là khi chưa đăng nhập mà truy cập vào đường link thì nó vẫn mất tầm 1 giây để điều hướng
     sang trang login và lúc này em vẫn nhìn đc vài thông tin của trang này
   + Ngoài ra có cách nào làm được một middleware để kiểm tra có đúng là admin ko để truy cập vào
     những trang như add new hay edit ko ạ. Tại nếu ko thì em lại phải tạo một useEffect giống trang
     Manager Product
3. Vấn đề upload ảnh (sẽ liên quan đến 2 file  1: components\Admin\EditProduct.tsx
                                               2: redux\apiRequest.tsx              ):
   + Đầu tiên( ở file redux\apiRequest.tsx  )  ở function updateProduct nếu em chạy dòng 139, 140 thì
   lúc điều hướng về trang manager Product rất là lag
   + Nếu mở comment dòng 137 và comment lại 2 dòng trên thì vẫn edit thành công nhưng vì lý do nào đó
   mà nó lại chạy vào trường hợp lỗi toast.error("Failed to update product.");
   
   
