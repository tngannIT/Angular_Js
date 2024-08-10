app.config(function ($routeProvider) {
    $routeProvider.when('/trangchu', {
        templateUrl: 'trangchu.html',
        controller: 'courseCtrl' 
    }).when('/khoahoc/:id_monhoc', {
        templateUrl: 'monhoc.html?' + Math.random(),
        controller: 'courseCtrl'
    }).when('/khoahoc', {
        templateUrl: 'khoahoc.html?' + Math.random(),
        controller: 'courseCtrl'
    }).when('/gioithieu', {
        templateUrl: 'gioithieu.html?' + Math.random(),
        controller: 'courseCtrl'
        // controllerAs: 'data'
    }).when('/hoidap', {
        templateUrl: 'hoidap.html?' + Math.random(),
        controller: 'LoginController'
    }).when('/dangnhap', {
        templateUrl: 'dangnhap.html?' + Math.random(),
        controller: 'LoginController'
    }).when('/doiMatKhau', {
        templateUrl: 'doiMatKhau.html?' + Math.random(),
        controller: 'LoginController'
    }).when('/dangky', {
        templateUrl: 'dangky.html?' + Math.random(),
        controller: 'RegisterController'
    }).when('/chinhsua', {
        templateUrl: 'editTaiKhoan.html?' + Math.random(),
        controller: 'LoginController'
    }).when('/lienhe', {
        templateUrl: 'lienhe.html?' + Math.random(),
        controller: 'contactController'
    }).when('/quizz/:id_monhoc/:ten_monhoc', {
        templateUrl: 'quizz.html?' + Math.random(),
        controller: 'quizCtrl'
    }).when('/point/:id_monhoc/:ten_monhoc/:a/:b/:c', {
        templateUrl: 'point.html?' + Math.random(),
        controller: 'quizCtrl'
    }).when('/chitietmonhoc/:id_monhoc/:ten_monhoc', {
        templateUrl: 'chitietmonhoc.html?' + Math.random(),
        controller: 'quizCtrl'     
    }).otherwise({
        templateUrl: 'trangchu.html',
        controller: 'courseCtrl'
        // template: '<h1>HIHI ĐỒ NGỐC</h1>'
    });
});