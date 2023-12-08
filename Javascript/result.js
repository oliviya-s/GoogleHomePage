
              function showResult() {
              var searchIp = $("#searchIp").val();
              $.ajax({
                  url: `http://localhost:3000/api/search/${searchIp}`,
                  method: 'GET',
                  success: function (data) {
                      var result = "";
                      $.each(data, function (key, value) {
                          result += "<div class='result_item'>";
                          result += "<div class='result_text'>" +
                              "<button class='result_button' data-link='" + value.link + "'>" + value.name + "</button>" +
                              "</div>";
                          result += "<div class='result_description'>" + value.description + "</div>";
                          result += "</div>";
                      });
          
                      if (result === "") {
                          result = "No result found!";
                      }
          
                      $("#resultModalBody").html(result);
                      $("#resultModal").modal("show");
          
                      $(".result_button").off("click").on("click", function () {
                          var link = $(this).data("link");
                          window.open(link, "_blank");
                      });
          
                  },
                  error: function (error) {
                      console.error('Error retrieving search results:', error);
                      alert('Error retrieving search results. Please try again later.');
                  }
              });
          }
           