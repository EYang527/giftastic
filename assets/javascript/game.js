    
    var animalChoice =['cat','mouse','dog','cow'];   // initialise an array of animals topics
    
    $(document).ready(function(){
        createButtons();
    });

    function createButtons()
    {   
    $("#animalButtons").empty();

    for (var index in animalChoice){
        var newButton=$("<button>");
        newButton.addClass("gif-buttons");
        newButton.attr("data-name",animalChoice[index]);
        newButton.text(animalChoice[index]);
        $("#animalButtons").append(newButton);

        console.log(newButton);
         }

    };

    $("#addAnimal").on("click",function(event){
        event.preventDefault();
        
        var animalInput=$("#animal-input").val().trim().toLowerCase();
        
        console.log(animalInput);
        animalChoice.push(animalInput);
        console.log(animalChoice);
        createButtons();
        })

    $(document).on("click",".gif-buttons",function(){

        $("#animals").empty();
    
        var searchAnimal=$(this).attr("data-name");
        console.log(searchAnimal);
    
        var queryURL="https://api.giphy.com/v1/gifs/search?q="+searchAnimal+"&api_key=bu93FDgyKIUC9eSn4YlUu8mocMocwULq&limit=10";
        console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function(response) {
        // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
        // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

        console.log(response);
        var results = response.data;
            for (var j = 0; j < results.length; j++) {
                var gifDiv = $('<div>');
                var displayGif = $('<img>');
                var rating = results[j].rating;
                var p = $("<p>").text("Rating: " + rating);

                displayGif.attr('src', results[j].images.fixed_height_still.url);
                displayGif.attr('data-still', results[j].images.fixed_height_still.url);
                displayGif.attr('data-animate', results[j].images.fixed_height.url);
                displayGif.attr('data-state', 'still');
                displayGif.attr('class', 'gif');
                gifDiv.append(displayGif);
                gifDiv.append(p);

                $('#animals').append(gifDiv);
            }
            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    });