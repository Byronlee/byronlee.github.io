function ShowCaseListCtrl($scope) {
    $scope.cases = [
        ["text","A woman programmer husband to let him go to the store to buy things: you go to a nearby store to buy some bread, eggs if there is, then, to buy six back, the husband bought a six bread back, his wife was shocked: Why did you buy 6 bread? ! Programmer husband replied: because they have eggs."],
        ["text","在那山的这边海的那边有一群程序员，他们老实又胹腆，他们聪明又没钱。他们一天到晚坐在那里熬夜写软件，饿了就咬一口方便面～～哦苦命的程序员，哦苦命的程序员，只要一改需求他们就要重新搞一遍，但是期限只剩下两天"],
        ["image","http://ent.qingdaonews.com/images/attachement/jpg/site1/20140124/001d094935da144c5cd72e.jpg"],
        ["demo","http://codepen.io/Byronlee/full/BntEA/"],
        ["demo","http://codepen.io/skyinlayer/full/EDwsf"],
        ["demo","http://codepen.io/skyinlayer/full/ktcFB/"],
        ["demo","http://codepen.io/Byronlee/full/woDIA/"]
    ];
    $scope.active_active_index = Math.floor(Math.random() * $scope.cases.length)
    $scope.active_case = $scope.cases[ $scope.active_active_index ]
}

angular.module('myApp', []).config([
    '$interpolateProvider', function($interpolateProvider) {
        return $interpolateProvider.startSymbol('{(').endSymbol(')}');
    }
]);
