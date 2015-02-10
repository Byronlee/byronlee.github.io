function ShowCaseListCtrl($scope) {
    $scope.cases = [
        ["text"],
     //  ["demo"],
        ["image"],
      //  ["code"]
    ];

    $scope.texts  = [
       // ["A woman programmer husband to let him go to the store to buy things: you go to a nearby store to buy some bread, eggs if there is, then, to buy six back, the husband bought a six bread back, his wife was shocked: Why did you buy 6 bread? ! Programmer husband replied: because they have eggs."],
       // ["在那山的这边海的那边有一群程序员，他们老实又胹腆，他们聪明又没钱。他们一天到晚坐在那里熬夜写软件，饿了就咬一口方便面～～哦苦命的程序员，哦苦命的程序员，只要一改需求他们就要重新搞一遍，但是期限只剩下两天"]
       //   ["一切都是最好的安排！"],
          ["也许你现在乃是一个人吃饭，一个人看电影，一个人睡觉，一个人乘地铁，然而你却能一个人吃饭，一个人看电影，一个人睡觉，一个人乘地铁，很多人离开另外一个人就没有了自己，而你却一个人度过了所有，你的孤独，虽败犹荣！"],
          //["在汽车时代早期，你问客户要什么，很多人可能都会回答'要一匹跑的更快的马'"],
          ["但行好事，莫问前程"],
          ["泰山崩于前，我依然沐浴更衣焚香沏茶，诚心正意，手起键落： Hello, World!"],
          ["生命中遇到的每一本书，都不是偶然"],
          ["北方有佳人，绝世而独立。一顾倾人城，再顾倾人国"],
          ["Iphone使用小技巧: 双击Home键，三个手指同时向上滑，可以一次性关闭3个App"]
    ];

    $scope.images = [
      //  ["/assets/images/dashborad/biye.jpg"],
      //  ["/assets/images/dashborad/my_dog.png"],
      //  ["/assets/images/dashborad/team_begin.jpg"],
      //  ["/assets/images/dashborad/team_time.jpg"],
      //  ["/assets/images/dashborad/myhome.jpg"]
      //  ["/assets/images/dashborad/biye.jpg"]

      //  ["/assets/images/dashborad/2014-12/1.jpeg"],
      //  ["/assets/images/dashborad/2014-12/2.jpeg"],
       // ["/assets/images/dashborad/2014-12/3.jpeg"],
      //  ["/assets/images/dashborad/2014-12/4.jpeg"]
        ["/assets/images/dashborad/2015-1/1.jpg"],
        ["/assets/images/dashborad/2015-1/2.jpeg"],
        ["/assets/images/dashborad/2015-1/3.jpeg"],
        ["/assets/images/dashborad/2015-1/4.jpeg"],
        ["/assets/images/dashborad/2015-1/5.jpeg"]
    ];

    $scope.demos  = [
        ["http://codepen.io/Byronlee/full/BntEA/"],
        ["http://codepen.io/skyinlayer/full/EDwsf"],
        ["http://codepen.io/skyinlayer/full/ktcFB/"],
        ["http://codepen.io/Byronlee/full/woDIA/"]
    ];

    $scope.codes= [
        ["/code/qsort_in_erlang_and_ruby.html"],
        ["/code/view_top_10_shell.html"],
       // ["/code/js_true_add_one.html"],
        ["/code/ruby_quize.html"],
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