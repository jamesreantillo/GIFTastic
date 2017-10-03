
// https://api.giphy.com/v1/gifs/search?api_key=ID1890lE9jA5qZo0jBhWSjcJ7QEFd7tk&q=basketball&limit=10&offset=0&rating=PG-13&lang=en

var giftastic = {

  players : ["Micheal Jordan", "Kobe Bryant", "Allen Iverson", "Vince Carter", "Magic Johnson", "Larry Bird"],
  
  // adds button  
  playersButton: function () {
    $(".playerButton").empty();
    for (var i = 0; i < giftastic.players.length; i++) {
    // console.log("hello")
    var addButton = $("<button>");
    addButton.addClass("btn btn-default gifs");
    addButton.attr("data-name", giftastic.players[i]);
    addButton.text(giftastic.players[i]);
    $(".playerButton").append(addButton);
   }
  },

  imageGifs: function () {
    $(".playerGifs").empty();
    // var api_key = ID1890lE9jA5qZo0jBhWSjcJ7QEFd7tk;

    var search = $(this).attr("data-name");
    // var search = "basketball"
    
    var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&rating=PG&api_key=ID1890lE9jA5qZo0jBhWSjcJ7QEFd7tk";

      // ajax call
      $.ajax({
        url: searchURL, 
        method: "GET"}).done(function (response) {
        
    
        var results = response.data;
        // console.log(response.data)
        for (var i = 0; i < results.length; i++) {
          // adds new div
          var newDiv = $("<div class='giphy'>");
          // adds p tags with class ratings
          var ratings = $("<p class='ratings'>")
          // adds image tagds
          var imgGif = $("<img>");

            ratings.html("Rating: " + results[i].rating)
            imgGif.attr("src", results[i].images.fixed_height_still.url);
            imgGif.attr("data-still", results[i].images.fixed_height_still.url);
            imgGif.attr("data-state", "still");
            imgGif.addClass("gif");
            imgGif.attr("data-animate", results[i].images.fixed_height.url);
            newDiv.append(ratings, imgGif)

          $(".playerGifs").prepend(newDiv);

         
        }


        
      })

  }
};

// pushes the userinput to the array;
$("#addPlayer").on("click", function(event) {
    event.preventDefault();
    var input = $("#inputPlayer").val().trim();
    // console.log(input)
    giftastic.players.push(input);
    // $("#addPlayer").val("");
    $("#inputPlayer").val("");
    giftastic.playersButton();
  });




$(document).on("click", ".gif", function(){
  var state = $(this).attr("data-state");
    if ( state == "still"){
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            }else{
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            };
});



$(document).on("click", ".gifs", giftastic.imageGifs);

// calls the function
giftastic.playersButton();

