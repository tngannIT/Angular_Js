const app = angular.module("myApp", ["ngRoute"]);

app.controller("courseCtrl", function($scope, $routeParams, $http) {
    $scope.khoahoc = $routeParams.khoahoc;
    $scope.monhoc = $routeParams.id_monhoc; 
     $scope.Subjects = [];
    $http.get('assets/db/Subjects.js').then(function(response){
        $scope.Subjects = response.data;
    })
    $scope.list_courses = [];
    $http.get('assets/db/courses.js').then(function(response) {
    $scope.list_courses = response.data;
    }).catch(function(error) {
        console.error('Error fetching courses:', error);
    });
});





app.controller("LoginController", function($scope, $rootScope, $window,$http) {
    $scope.Students = [];
    $scope.Students = JSON.parse(localStorage.getItem('students'));
    if ($scope.Students == null) {
        $http.get('assets/db/Students.js').then(
            function(res){
                $scope.Students = res.data;
                localStorage.setItem('students', JSON.stringify(res.data))
            },
            function(res) {
                alert("Lỗi khi lấy students");
            }
        );
    }
    console.log("Students=", $scope.Students);
    
    // Lấy giá trị của username và email từ sessionStorage
    $rootScope.username = sessionStorage.getItem('username');
    $rootScope.email = sessionStorage.getItem('email');
    $rootScope.fullname = sessionStorage.getItem('fullname');
    // $rootScope.marks = sessionStorage.getItem('marks');
    $rootScope.birthday = sessionStorage.getItem('birthday');
    $rootScope.gender = sessionStorage.getItem('gender');
    // $rootScope.schoolfee = sessionStorage.getItem('schoolfee');
    // console.log($rootScope.username);
    // console.log($rootScope.fullname);
    // console.log($rootScope.marks);
    // console.log($rootScope.gender);
    // console.log($rootScope.birthday);
    // console.log($rootScope.schoolfee);
    // console.log($rootScope.email);
    $rootScope.loggedIn = !!$rootScope.username; 

    $scope.dangnhap = function() {
        var u = $scope.u;
        var p = $scope.p;
        var index = $scope.Students.findIndex(st => st.username == u && st.password == p);
        if (index >= 0) {
            $rootScope.username = u;
            $rootScope.email = $scope.Students[index].email; 
            $rootScope.fullname = $scope.Students[index].fullname;
            $rootScope.marks = $scope.Students[index].marks;
            $rootScope.birthday = $scope.Students[index].birthday;
            $rootScope.gender = $scope.Students[index].gender; 
            $rootScope.schoolfee = $scope.Students[index].schoolfee;
            $rootScope.loggedIn = true;
            sessionStorage.setItem('username', u);
            sessionStorage.setItem('email', $rootScope.email); // Lưu email vào sessionStorage
            sessionStorage.setItem('fullname', $rootScope.fullname); // Lưu fullname vào sessionStorage
            sessionStorage.setItem('marks', $rootScope.marks); // Lưu fullname vào sessionStorage
            sessionStorage.setItem('birthday', $rootScope.birthday); // Lưu fullname vào sessionStorage
            sessionStorage.setItem('gender', $rootScope.gender); // Lưu fullname vào sessionStorage
            sessionStorage.setItem('schoolfee', $rootScope.schoolfee); // Lưu fullname vào sessionStorage
            $window.location.href = '#!trangchu';
        } else {
            alert("Đăng nhập không thành công");
        }
    };
    console.log(sessionStorage);
   
    

    // $scope.quenpass = function(){
    //     const user = $scope.Students.find(s => s.email === $scope.email);
    //     if (user) {
    //         alert("Mật khẩu của bạn là: " + user.password);
    //     }else 
    //         alert("Email không tồn tại!")
    // };
    
    $scope.doipass = function (){
        user = $scope.Students.find( s => s.username == $rootScope.username);
        if (user == null) {
            alert ("Không có tên trong db");
            return;
        }
        if (user.password != $scope.pass_old){
            alert ("Mật khẩu cũ không đúng");
            return;
        }
        if ($scope.pass_new1 != $scope.pass_new2){
            alert ("Cả hai password mới không trùng nhau");
            return;
        }

        user.password = $scope.pass_new1
        localStorage.setItem('students', JSON.stringify($scope.Students));
        alert ("Đổi mật khẩu thành công");
        $window.location.href = '#!trangchu';
    }

    // ĐĂNG XUẤT
    $rootScope.dangXuat = function() {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('email'); // Lưu email vào sessionStorage
        sessionStorage.removeItem('fullname'); // Lưu fullname vào sessionStorage
        sessionStorage.removeItem('marks'); // Lưu fullname vào sessionStorage
        sessionStorage.removeItem('birthday'); // Lưu fullname vào sessionStorage
        sessionStorage.removeItem('gender'); // Lưu fullname vào sessionStorage
        sessionStorage.removeItem('schoolfee');
        $rootScope.username = "";
        $window.location.href = '#!dangnhap';
    };



    $scope.initFormData = function() {
        $scope.Students = JSON.parse(localStorage.getItem('students')) || [];
        // $scope.Students = JSON.parse(localStorage.getItem('students')) || [];
        var user = $scope.Students.find(s => s.username === $rootScope.username);
        
        if (user) {
            // Đổ dữ liệu người dùng vào form
            $scope.username = user.username;
            $scope.email = user.email;
            $scope.fullname = user.fullname;
            $scope.marks = user.marks;
            $scope.gender = user.gender;
            $scope.birthday = user.birthday;
            $scope.schoolfee = user.schoolfee;
        } else {
           
            $scope.username = '';
            $scope.email = '';
            $scope.fullname = '';
            $scope.marks = '';
            $scope.gender = '';
            $scope.birthday = '';
            $scope.schoolfee = '';
            
        }
    };
        $scope.init = function() {
            $scope.initFormData();
        };
        $scope.init();
 
        $scope.update = function(){
            // Tìm người dùng dựa trên tên đăng nhập
            var user = $scope.Students.find(s => s.username == $rootScope.username);
            
            if (!user) {
                alert("Không tìm thấy người dùng");
                return;
            }
            
            // Cập nhật thông tin người dùng từ form
            user.username = $scope.username || user.username;
            user.email = $scope.email || user.email;
            user.fullname = $scope.fullname || user.fullname;
            user.marks = $scope.marks || user.marks;
            user.gender = $scope.gender || user.gender;
            user.birthday = $scope.birthday || user.birthday;
            user.schoolfee = $scope.schoolfee || user.schoolfee;
            
            // Lưu cập nhật vào localStorage
            localStorage.setItem('students', JSON.stringify($scope.Students));
            alert("Cập nhật thông tin tài khoản thành công");
        
        }
    
        


    
   
});


app.controller("RegisterController", function($scope, $http,$window,$rootScope) {
    $scope.Students = [];
    $scope.Students = JSON.parse(localStorage.getItem('students'));
    console.log($scope.Students);
    if($scope.Students == null) 
        $http.get('assets/db/Students.js').then(
        function(res){
            $scope.Students = res.data;
            localStorage.setItem('students', JSON.stringify(res.data))
        },
        function(res) {
            alert ("Lỗi khi lấy students");
        }
    );
    console.log("Students=" , $scope.Students);
    $scope.dangky = function(){
        if ($scope.myRegisterForm.$valid) { 
            $scope.Students.push($scope.Student);
            localStorage.setItem('students', JSON.stringify($scope.Students));
    
            // Cập nhật dữ liệu vào $rootScope để có thể dùng ở các phần khác của ứng dụng
            $rootScope.email = $scope.Student.email;
            $rootScope.fullname = $scope.Student.fullname;
            $rootScope.username = $scope.Student.username;
            $rootScope.birthday = $scope.Student.birthday;
            // $rootScope.marks = $scope.Student.marks;
            $rootScope.gender = $scope.Student.gender;
            // $rootScope.schoolfee = $scope.Student.schoolfee;
    
            // Lưu dữ liệu vào sessionStorage để sử dụng tạm thời
            sessionStorage.setItem('email', $rootScope.email);
            sessionStorage.setItem('fullname', $rootScope.fullname);
            sessionStorage.setItem('username', $rootScope.username);
            sessionStorage.setItem('birthday', $rootScope.birthday);
            // sessionStorage.setItem('marks', $rootScope.marks);
            sessionStorage.setItem('gender', $rootScope.gender);
            // sessionStorage.setItem('schoolfee', $rootScope.schoolfee);
    
            alert("Đã đăng ký thành công");
            $window.location.href = '#!dangnhap';
        } else {
            alert("Vui lòng điền đầy đủ thông tin theo yêu cầu của form.");
        }
    }
    
});


app.controller("quizCtrl", function($scope,$http,$routeParams,$interval, $window,$rootScope,$location) {
    $scope.id_monhoc = $routeParams.id_monhoc;
    $scope.ten_monhoc = $routeParams.ten_monhoc; 
    $scope.correctAnswers = $routeParams.a;
    $scope.incorrectAnswers = $routeParams.b;
    $scope.totalScore = $routeParams.c;
    $scope.pageSize = 1;
    $scope.questions = [];
    $scope.answers = [];
    $scope.sogiay = 900; // Khởi tạo thời gian là 900 giây
    $scope.reply = [];

    
    
    $http.get('assets/db/Quizs/' + $scope.id_monhoc + ".js").then(
        function(response) {
            $scope.questions = response.data.slice(0, 15); 
            console.log($scope.questions);
        },
        function(response) {
            console.log(response);
        }
    );
    // Lấy ảnh phần chi tiết môn học
    $http.get('assets/db/Subjects.js').then(function(response) {
        var idMonHoc = $routeParams.id_monhoc;
                $scope.courseDetail = null;
                var subjects = response.data;
                for (var i = 0; i < subjects.length; i++) {
                    if (subjects[i].Id === idMonHoc) {
                        $scope.courseDetail = subjects[i];
                        break;
                    }
                }
    }).catch(function(error) {
        console.error('Error fetching subjects:', error);
    });
    
    
    $scope.start = 0;

    $scope.endQuiz = function() {
        $scope.calculateResult(); 
        $location.path(`point/${$scope.id_monhoc}/${$scope.ten_monhoc}/${$scope.correctAnswers}/${$scope.incorrectAnswers}/${$scope.totalScore}`);
    }

    $scope.replace = function (answerId) {
        $scope.reply[$scope.start] = answerId;
    }

    // $scope.core = 0;
    $scope.calculateResult = function() {
        $scope.correctAnswers = 0;
        $scope.incorrectAnswers = 0;

    for(let i = 0; i < $scope.questions.length; i++) {
        if($scope.questions[i].AnswerId === $scope.reply[i]) {
            $scope.correctAnswers++;
        } else {
            $scope.incorrectAnswers++;
        }
    }

    // Tính tổng điểm
    $scope.totalScore = $scope.correctAnswers * 10; // Giả sử mỗi câu đúng được 10 điểm
    localStorage.setItem('students', JSON.stringify($scope.totalScore));
    }
    
    
    $scope.next = function() {
        if ($scope.start < $scope.questions.length - $scope.pageSize) {
            $scope.start += 1; // Chuyển sang câu hỏi tiếp theo
        } else {
            $scope.start = $scope.questions.length - $scope.pageSize;
        }
    }
    
    $scope.prev = function() {
        if ($scope.start > 0) {
            $scope.start -= $scope.pageSize;
        }
    }
    
    // $scope.diem = 0;
    $scope.getTime = function() {
        var minutes = Math.floor($scope.sogiay / 60);
        var seconds = $scope.sogiay % 60;
        return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };
    var timer = $interval(function() {
        $scope.sogiay--;
        if($scope.sogiay < 0) {
            $interval.cancel(timer);
            alert("Hết giờ!");
            // Thực hiện thêm hành động khi hết giờ ở đây
        }
    }, 1000);
    
});

