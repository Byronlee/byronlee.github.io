function dashbord_answer_check(){
    var input = $('input[class="answer"]').val();
    var answer= $('input[type="hidden"]').val();
    if (input==""){
        $("#answer_status").removeAttr("class").addClass("icon-question-sign")
    }else{
      var status;
      (input==answer) ? status="icon-ok-sign" : status="icon-remove-sign"
      $("#answer_status").removeAttr("class").addClass(status)
    }
}

function show_categories_item(id){
    $(".di_shui").remove();
    $(".show_item_lists").html($("#"+id).html());
}