$(".toggle_btn").click(function(){
    $(this).toggleClass("active");
    $(".wrapper ul").toggleClass("active");

    if($(".toggle_btn").hasClass("active")){
        $(".toggle_text").text("Show Less");
    }
    else{
        $(".toggle_text").text("Show More");
    }
});