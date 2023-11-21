function showResult() {
    var searchIp = $("#searchIp").val();
    $.getJSON("http://127.0.0.1:5500/JsonFile/content.json", function(data) {
     var result = "";
     $.each(data, function(key, value) {
        if (value.keyword && value.keyword.some(keyword => keyword.toLowerCase() === searchIp.toLowerCase())) 
           {
             result += "<div class='result_item'>";
             result += "<img class= 'result_img' src='"  + value.image + "' alt='" + value.name + "' >";
             result += "<div class='result_text'>" +
                    "<button class='result_button' data-link='" + value.link + "'>" + value.name + "</button>" +
                    "</div>";
             result += "<div class= 'result_description' >" + value.description + "<div>";
             result += "</div>";

         }
     });
     if (result == "") {
         result = "No result found!";
     }
    $("#resultData").html(result);
    $("#resultData").css("display", "block");

    $(".result_button").off("click").on("click", function() {
        var link = $(this).data("link");
        window.open(link, "_blank");
    });

    
 });
}

