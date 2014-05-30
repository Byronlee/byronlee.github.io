
$(function (){ 
    //赞一个
    $('.support').on('ajax:error', function(event, xhr, status) {
	alert("网络异常，请稍后再试！");
	$('.support').find("i").removeClass("icon-spinner icon-spin").addClass("icon-thumbs-up")
    }).on('ajax:success', function(data) {
	$(".support_table").html('<span class="label label-important" style="background-color: #999999;"><i class="icon-thumbs-up">你真有眼光 ^_^</i></span>')	
    }).on('ajax:beforeSend', function(data) {
	$('.support').find("i").removeClass("icon-thumbs-up").addClass("icon-spinner icon-spin")
    })


    $('#my_skill').highcharts({
	title : {
	    text : ""
	},
	legend : {
	    enabled : false
	},
	xAxis : [{
	    categories :  ['团队精神','文艺气息','英语四级', 'J2EE/J2ME/J2SE','TDD/BDD/DDD/敏捷开发', 'Ruote/State_Machine/DSL','RPC/Thrift/MessagePack', '面向对象编程','设计模式','Mapreduce', 'Ruby/Rails','Linux','Emacs/Git','Mysql/Mongodb/Pgsql','前台开发,前台框架,设计','Php','Andorid','NodeJs'] ,
	    labels : {
		rotation : 320,
		x : 0,
		y : 25,
	    }
	}],
	yAxis : [{// Primary yAxis
	    labels : {
		formatter : function() {
		    return this.value + '%';
		},
		style : {
		    color : '#DDDF0D'
		},
		align : 'left',
		x : 0,
		y : -2,
	    },
	    showFirstLabel : false,
	    title : {
		text : '技能熟悉度',
		style : {
		    color : '#89A54E'
		}
	    }
	}, {// Secondary yAxis
	    title : {
		text : '技能熟悉度',
		style : {
		    color : '#4572A7'
		}
	    },
	    labels : {
		align : 'right',
		x : 0,
		y : -2,
		formatter : function() {
		    return this.value + '%';
		},
		style : {
		    color : '#4572A7'
		}
	    },
	    showFirstLabel : false,
	    opposite : true
	}],
	tooltip : {
	    formatter : function() {
		return '' + this.x + ': ' + this.y + '%';
	    }
	},
	series : [{
	    name : '技能熟悉度',
	    color : '#4572A7',
	    type : 'column',
	    yAxis : 1,
	    data :  [70,68,70,50,23,17,28,25,25,62,70,68,69,66,70,63,60,20]
	    
	}, {
	    name : '技能熟悉度',
	    color : '#DDDF0D',
	    type : 'spline',
	    data :  [70,68,70,50,23,17,28,25,25,62,70,68,69,66,70,63,60,20]
	}]	
    });
})


