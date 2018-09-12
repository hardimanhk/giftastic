var topics = ["footbal", "soccer", "baseball", "hockey", "tennis"];

function showGif() {
    var gifTerm = $(this).attr("data-name");
    var myAPI = "pPBJWIlzXd6iKV3VSgrpNSL4fG3DQF6m";
    // "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifTerm + "&api_key=" + myAPI + "&limit=10";

    // Creates AJAX call for the specific GIF button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
            // log response to console
            console.log(response.data[i]);
            // Creates a div to hold the gif
            var newDiv = $("<div>");
            // Retreives the gif still image url
            var gifURLstill = response.data[i].images.fixed_height_still.url;
            // Retreives the gif animated image url
            var gifURLanimated = response.data[i].images.fixed_height.url;
            // Retrieves the Rating Data
            var rating = response.data[i].rating;
            newDiv.html(`<img src=${gifURLstill} data-still=${gifURLstill} data-animate=${gifURLanimated} data-state="still" class="gif-render"><p>Rating: ${rating}</p>`);
            // Puts the gif div before the previous gifs
            $("#display").prepend(newDiv);
        }
    });

}

// Function for displaying movie data
function renderButtons() {

    // Deletes the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons").empty();
    // Loops through the array of gifs
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generates buttons for each gif in the array
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("gif");
        // Added a data-attribute
        a.attr("data-name", topics[i]);
        a.attr("data-state", "still");
        // Provided the initial button text
        a.text(topics[i]);
        // Added the button to the buttons div
        $("#buttons").append(a);
    }
}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The movie from the textbox is then added to our array
    topics.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".gif", showGif);

$(document).on("click", ".gif-render", function() {
    if ($(this).attr("data-state") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Calling the renderButtons function to display the intial buttons
renderButtons();