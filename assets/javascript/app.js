var films = ["The Seventh Seal", "Persona - Bergman", "A Clockwork Orange", "Citizen Kane", "Who's Afraid of Virginia Woolf?"]
var UrlSubmission = "";

function createButtons() {
    $("#buttons").empty();
    for (var i = 0; i < films.length; i++) {
        var topicButton = $(" <button> ");
        topicButton.addClass("letter-button letter letter-button-color");
        topicButton.attr("data-letter", films[i]);
        topicButton.text(films[i]);
        $("#buttons").append(topicButton);
        $("#buttons").append(" ");
    }
}

$(document).on("click", ".letter-button", function () {

    var letter = $(this).attr("data-letter")

    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${letter}&api_key=9dhDLZG9Xr2NAxd2paCSxJCUyTIzgzzm&limit=10`
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            
            $("#gifArea").empty();
            for (i = 0; i < response.data.length; i++) {
                
                var letterDiv = $("<div>").addClass("gifStyle");
                var pTag = $("<p>").text("Rating:" + response.data[i].rating)
                var gifImage = $("<img>")
                var gifImgStill = response.data[i].images.downsized_still.url;
                var gifImgActive = response.data[i].images.downsized.url;

                gifImage.attr("data-state", "still")
                gifImage.attr("src", gifImgStill)
                gifImage.attr("data-still", gifImgStill);
                gifImage.attr("data-active", gifImgActive);
                gifImage.addClass("letterImage")
                letterDiv.append(pTag)
                letterDiv.append(gifImage)

                $("#gifArea").append(letterDiv)

            }
            $(document).on("click", ".letterImage", function () {
                
                var state = $(this).attr("data-state");
             
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-active"));
                    $(this).attr("data-state", "active");
                } else if (state === "active") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                };
            });
        });

});
$(document).on("click", "#buttonInputSubmit", function(){
    var newFilm = $("#buttonInputText").val();
    films.push(newFilm);
    createButtons();
})
createButtons();