
window.DatVeMayBayController = function($scope,$http){
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

        // Chức năng Thêm vé máy bay
        $scope.onSubmit = function(){
               if($scope.validateForm()){

               }else{
                        let apiUrl = " http://localhost:3003/listBooking";

                        var newItem = {
                                ...$scope.formData,
                        }

                        console.log(newItem);

                // Sử dụng phương thức post để thêm đối tượng và trong list
                        $http.post(apiUrl,newItem).then(function(response){
                                console.log(response);
                                if(response.status == 201){
                                        alert("Đặt vé máy bay thành công")
                                }
                        })
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

        // Chức năng Validate Form
        $scope.validateForm = function(){
                 // Kiểm tra dữ liệu ở đây và trả về true nếu hợp lệ, ngược lại là false
                var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                var phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
                var cardPattern = /^\d{9,12}$/;
                if (
                        !$scope.formData.FullName ||
                        !$scope.formData.Phone ||
                        !$scope.formData.Card ||
                        !$scope.formData.Email ||
                        !$scope.formData.Gender ||
                        !$scope.formData.Flight ||
                        !$scope.formData.Birthday ||
                        !$scope.formData.Luggage
                      ) {
                        // Kiểm tra không được bỏ trống
                        alert('Vui lòng điền đầy đủ thông tin');
                        return false;
                      } else if (!emailPattern.test($scope.formData.Email)) {
                        // Kiểm tra hợp lệ Email
                        alert('Email không hợp lệ');
                        return false;
                      } else if (!phonePattern.test($scope.formData.Phone)) {
                        // Kiểm tra hợp lệ số điện thoại Việt Nam
                        alert('Số điện thoại không hợp lệ');
                        return false;
                      } else if (!cardPattern.test($scope.formData.Card)) {
                        // Kiểm tra chứng minh thư phải là số
                        alert('Chứng minh thư phải là số');
                        return false;
                      }
                      
                      return true;
                    
        }



}


