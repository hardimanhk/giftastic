var topics = ["footbal", "soccer", "baseball", "hockey", "tennis"];
var favGifArray = [];

function showGif() {
    var clicks = $(this).attr("click-count");
    var gifTerm = $(this).attr("data-name");
    var myAPI = "pPBJWIlzXd6iKV3VSgrpNSL4fG3DQF6m";
    var offset = 10 * clicks;
    // "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifTerm + "&api_key=" + myAPI + "&limit=10&offset=" + offset;
    clicks++;
    $(this).attr("click-count", clicks);

    // Creates AJAX call for the specific GIF button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
            // Creates a div to hold the gif
            var newDiv = $("<div>");
            // Retreives the gif still image url
            var gifURLstill = response.data[i].images.fixed_height_still.url;
            // Retreives the gif animated image url
            var gifURLanimated = response.data[i].images.fixed_height.url;
            console.log(gifURLstill);
            // Retrieves the Rating Data
            var rating = response.data[i].rating;
            // Retreives title
            var title = response.data[i].title.trim();
            // get small image
            var small = response.data[i].images.fixed_height_small.url
            // get download
            var downloadable = response.data[i].images.fixed_height.mp4;

            newDiv.html(
                `<div class="card gif-render">
                    <img class="card-img-top gif-image" style="height:200px;" src=${gifURLstill} data-still=${gifURLstill} data-animate=${gifURLanimated} data-state="still">
                    <i class="fa fa-heart fa-lg" data-thumbnail=${small} data-title=${title}></i>
                    <a id="gif-download" href=${downloadable} download=${title} ><i class="fa fa-download fa-lg"></i></a>
                    <div class="card-body">
                        <p class="card-text">Title: ${title}<br>Rating: ${rating}</p>
                    </div>
                </div>`)
            // newDiv.html(`<img src=${gifURLstill} data-still=${gifURLstill} data-animate=${gifURLanimated} data-state="still" class="gif-render"><p>Rating: ${rating}</p>`);
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
        // Adds a class of gif to button
        a.addClass("gif");
        // Added a data-attribute
        a.attr("data-name", topics[i]);
        a.attr("data-state", "still");
        a.attr("click-count", 0);
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

    $("#gif-input").val("");
});

$("#clear-faves").click(function() {
    $("#favorites").empty();
    localStorage.removeItem("allGifs");
    favGifArray = [];
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".gif", showGif);

$(document).on("click", ".gif-image", function () {
    console.log(this);
    if ($(this).attr("data-state") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".fa-heart", function () {
    var smallURL = $(this).attr("data-thumbnail");
    favGifArray.push(smallURL);
    localStorage.setItem("allGifs", JSON.stringify(favGifArray));
    renderFavGifs();
});

function renderFavGifs() {
    if (localStorage.getItem("allGifs") === null) {
        $("#favorites").text("No favorites yet.")
    }
    else {
        $("#favorites").text("");
        favGifArray = JSON.parse(localStorage.allGifs);
        for (var i = 0; i < favGifArray.length; i++) {
            var imgDiv = $("<img>").attr("src", favGifArray[i]);
            imgDiv.addClass("favGif");
            $("#favorites").prepend(imgDiv);
        }
    }  
}

// $(document).on("click", "#gif-download", function () {
//     console.log(this);
// });

// Calling the renderButtons function to display the intial buttons
renderButtons();
renderFavGifs();

