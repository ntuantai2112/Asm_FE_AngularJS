
window.DatVeMayBayController = function($scope,$http,$location){
        $scope.datvemaybay = "ĐẶT VÉ MÁY BAY";
        $scope.tieude = "HÃY ĐỂ CHÚNG TÔI PHỤC VỤ BẠN";
        $scope.tieuDeTinTuc = "LIÊN HỆ NGAY FPOLY TRAVEL";


        // Chức năng getData lấy dữ liệu từ api trả về
        $scope.getData = function (){
                //  Call API để lấy dữ liệu khách hàng đặt vé máy bay
                // Lấy đường dẫn API
                let apiUrl = " http://localhost:3003/listBooking";

                // Sử dụng phương thức get để lấy dữ liệu
                $http.get(apiUrl).then(function(response){
                        if(response.status == 200){
                                $scope.listBooking = response.data;
                        }
                })
        }

        $scope.getData();



        $scope.clearError = function(field) {
                $scope.kiemtra[field] = false;
                $scope.showError[field] = false;
            };
            
            $scope.validateInput = function(field) {
                $scope.showError[field] = true;
            };

        // Chức năng Thêm vé máy bay
        $scope.onSubmit = function(){

                // Tạo 1 biến để kiểm tra
                let flag = true;
                
                //Kiểm tra trừng trường dữ liệu 
                $scope.kiemtra = {
                        FullName: false,
                       Phone:false,
                       Card:false,
                       Email:false,
                       Gender:false,
                       Flight:false,
                       Birthday:false,
                       Luggage:false,
                       Payment:false
                }

                // Các regex
                var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                var phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
                var cardPattern = /^\d{9,12}$/;

                $scope.errorMessages = {};

                // Kiểm tra bỏ trống tên
                if(!$scope.booking || !$scope.booking.FullName){
                    flag = false;
                    $scope.kiemtra.FullName = true;    
                    $scope.errorMessages.FullName = 'Vui lòng nhập họ và tên';
                }

                 // Kiểm tra số điện thoại
                if (!$scope.booking || !$scope.booking.Phone) {
                        flag = false;
                        $scope.kiemtra.Phone = true;
                        $scope.errorMessages.Phone = 'Vui lòng nhập số điện thoại';
                } else if (!phonePattern.test($scope.booking.Phone)) {
                        flag = false;
                        $scope.kiemtra.Phone = true;
                        $scope.errorMessages.Phone = 'Số điện thoại không hợp lệ';
                }

                // Kiểm tra số chứng minh thư
                if (!$scope.booking || !$scope.booking.Card) {
                        flag = false;
                        $scope.kiemtra.Card = true;
                        $scope.errorMessages.Card = 'Vui lòng nhập số chứng minh thư';
                } else if (!cardPattern.test($scope.booking.Card)) {
                        flag = false;
                        $scope.kiemtra.Card = true;
                        $scope.errorMessages.Card = 'Chứng minh thư phải là số';
                }

                // Kiểm tra email
                if (!$scope.booking || !$scope.booking.Email) {
                        flag = false;
                        $scope.kiemtra.Email = true;
                        $scope.errorMessages.Email = 'Vui lòng nhập địa chỉ email';
                } else if (!emailPattern.test($scope.booking.Email)) {
                        flag = false;
                        $scope.kiemtra.Email = true;
                        $scope.errorMessages.Email = 'Email không hợp lệ';
                }
                // Kiểm tra giới tính
                if(!$scope.booking || !$scope.booking.Gender){
                        flag = false;
                        $scope.kiemtra.Gender = true;    
                        $scope.errorMessages.Gender = 'Vui lòng chọn giới tính';
                }

                // Kiểm tra chuyến bay
                if(!$scope.booking || !$scope.booking.Flight){
                        flag = false;
                        $scope.kiemtra.Flight = true;    
                        $scope.errorMessages.Flight = 'Vui lòng chọn chuyến bay';
                }
                // Kiểm tra ngày sinh
                if(!$scope.booking || !$scope.booking.Birthday){
                        flag = false;
                        $scope.kiemtra.Birthday = true;    
                        $scope.errorMessages.Birthday = 'Vui lòng chọn ngày sinh';
                }

                // Kiểm tra thông tin hành lý
                if(!$scope.booking || !$scope.booking.Luggage){
                        flag = false;
                        $scope.kiemtra.Luggage = true;    
                        $scope.errorMessages.Luggage = 'Vui lòng nhập thông tin hành lý';
                }

                // Kiểm tra hình thức thanh toán
                if(!$scope.booking || !$scope.booking.Payment){
                        flag = false;
                        $scope.kiemtra.Payment = true;    
                        $scope.errorMessages.Payment = 'Vui lòng chọn hình thức thanh toán';
                }

                

                if(flag){
                        let apiUrl = " http://localhost:3003/listBooking";

                        var newItem = {
                                ...$scope.booking,
                        }

                    

                        console.log( $scope.FullName);

                        // Sử dụng phương thức post để thêm đối tượng và trong list
                        $http.post(apiUrl,newItem).then(function(response){
                                console.log(response);
                                if(response.status == 201){
                                        $location.path("list-dat-ve");
                                        alert("Đặt vé máy bay thành công");
                                }
                        })
                }
                else{
                        // alert("Bạn cần nhập đầy đủ thông tin")
                }
        }

        // Chức năng xóa thông tin đặt vé máy bay
        $scope.onDelete = function(deleteID){
                let apiUrl = ' http://localhost:3003/listBooking';

                let confirm  = window.confirm("Bạn có chắc chắn muốn xóa thông tin này");
                if(confirm){
                        $http.delete(`${apiUrl}/${deleteID}`).then(function(response){
                                console.log(response);
                                if(response.status == 200){
                                        alert("Xóa thông tin thành công");
                                        $scope.getData();
                                }
                        })
                }
        }
       
}


