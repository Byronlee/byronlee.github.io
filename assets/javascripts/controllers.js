function ShowCaseListCtrl($scope) {
    $scope.cases = [
       // ["text"],
       // ["image"],
      //  ["demo"]
        ["code"]
    ];

    $scope.texts  = [
        ["A woman programmer husband to let him go to the store to buy things: you go to a nearby store to buy some bread, eggs if there is, then, to buy six back, the husband bought a six bread back, his wife was shocked: Why did you buy 6 bread? ! Programmer husband replied: because they have eggs."],
        ["在那山的这边海的那边有一群程序员，他们老实又胹腆，他们聪明又没钱。他们一天到晚坐在那里熬夜写软件，饿了就咬一口方便面～～哦苦命的程序员，哦苦命的程序员，只要一改需求他们就要重新搞一遍，但是期限只剩下两天"]
    ];

    $scope.images = [
        ["/assets/images/dashborad/biye.jpg"],
        ["/assets/images/dashborad/my_dog.png"],
        ["/assets/images/dashborad/team_begin.jpg"],
        ["/assets/images/dashborad/team_time.jpg"],
        ["/assets/images/dashborad/xiaohui.jpg"],
        ["/assets/images/dashborad/biye.jpg"]
    ];

    $scope.demos  = [
        ["http://codepen.io/Byronlee/full/BntEA/"],
        ["http://codepen.io/skyinlayer/full/EDwsf"],
        ["http://codepen.io/skyinlayer/full/ktcFB/"],
        ["http://codepen.io/Byronlee/full/woDIA/"]
    ];

    $scope.codes= [
       // ["/code/qsort_in_erlang_and_ruby.html"],
       // ["/code/view_top_10_shell.html"],
        ["/code/js_true_add_one.html"],
        ["code/one_ruby_test.html"]
    ];

    $scope.actived_text_index = Math.floor(Math.random() * $scope.texts.length)
    $scope.actived_text = $scope.texts[ $scope.actived_text_index ]

    $scope.actived_image_index = Math.floor(Math.random() * $scope.images.length)
    $scope.actived_image = $scope.images[ $scope.actived_image_index ]

    $scope.actived_demo_index = Math.floor(Math.random() * $scope.demos.length)
    $scope.actived_demo = $scope.demos[ $scope.actived_demo_index ]

    $scope.actived_code_index = Math.floor(Math.random() * $scope.codes.length)
    $scope.actived_code = $scope.codes[ $scope.actived_code_index ]

    $scope.active_active_index = Math.floor(Math.random() * $scope.cases.length)
    $scope.active_case = $scope.cases[ $scope.active_active_index ]
}

angular.module('myApp', []).config([
    '$interpolateProvider', function($interpolateProvider) {
        return $interpolateProvider.startSymbol('{(').endSymbol(')}');
    }
]);