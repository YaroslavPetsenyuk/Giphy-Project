$(document).ready(function () {

    movies = ["Scarface",
        "Enter the Dragon",
        "Rush Hour",
        "The Big Lebowski",
        "American Pie",
        "Inception",
        "Tenacious D",
        "Total Recall",
        "Deadpool",
        "Fight Club",
        "Logan",
        "Naked Gun",
        "Armour of God",
        "Pan's Labyrinth"];

    function generateBtns() {
        $(".button-container").empty();

        for (var i = 0; i < movies.length; i++) {
            var button = $("<button>");
            button.addClass("btn btn-primary movie-btn");
            button.attr("movie-name", movies[i]);
            button.text(movies[i]);
            $(".btn-container").append(button);
            $(".btn-container").append(" ");
        }
    }
    generateBtns();

    $(".btn").on("click", function () {
        var movieGif = $(this).attr("movie-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieGif + "&api_key=wBLZDHv9Hfw7MVFf6tGxr5rJsRn2Cl6v&limit=10";

        $.ajax({
            url: queryURL,
            method: "get"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                var results = response.data;

                for (var j = 0; j < results.length; j++) {
                    var movieDiv = $("<div>")
                    var par = $("<p>.").text("Rating " + results[j].rating);
                    movieImage = $("<img id='gif'>")

                    movieImage.attr("src", results[j].images.fixed_height.url);

                    movieDiv.append(par);
                    movieDiv.append(movieImage);

                    $(".gifs").prepend(movieDiv);
                }
            });
    });

    $("#gif").on("click", function () {
        var state = $(this).attr("data-state")

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }

        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }


    });

    function newButton() {
        $("#submit-btn").on("click", function (event) {
            event.preventDefault();
            userInput = $("#add-topic").val().trim();
            movies.push(userInput);
            generateBtns();
        })
    }
    newButton();

});
