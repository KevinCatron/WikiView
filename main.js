$(document).ready(function() {
    //GENERAL VARIABLES
    var resultTitle = document.getElementById("resultTitle");
    var resultInfo = document.getElementById("resultInfo");
    var result = document.getElementById("result");
    var input = document.getElementById("input");
    var search = document.getElementById("search");
    var showResult = document.getElementById("showResult")
    var clear = document.getElementById("clear");
    var random = document.getElementById("random");
    var randomURL = "https://en.wikipedia.org/wiki/Special:Random";

    $(result).hide();


    //API ENDPOINT
    var callback = "&callback=?";

    search.onclick = function(event) {

        //WHATEVER TERM WE ENTER INTO THE INPUT BOX BECOMES OUR SEARCHTERM.    
        var searchTerm = input.value;
        var url = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm +
            "&format=json&callback=?";
        $(result).show();

        $.ajax({

            type: "GET",
            url: url,
            async: false,
            dataType: "json",
            success: function(data) {
                //HEADING FOR SEARCHTERM
                console.log(data[1][0]);
                //DESCRIPTION FOR SEARCHTERM
                console.log(data[2][0]);
                //URL FOR SEARCHTERM
                console.log(data[3][0]);

                //CLEARS THE PREVIOUS SEARCH
                $("#result").html("");
                //LOOPS THROUGH THE ARRAY OF SEARCH HEADINGS
                for (var i = 0; i < data[1].length; i++) {
                    //THIS DISPLAYS OUR SEARCH RESULTS IN SEPERATE DIVS VERTICALLY.
                    $("#result").append(
                        "<a href=" + data[3][i] +
                        "' target='_blank'><div class='searchResult animated fadeInUp'><h5>" +
                        data[1][i] + "</h5><p>" + data[2][i] + "</p></div></a>")

                }

            },
            error: function(errorMessage) {

                alert("There was an error, please try again.");
            }

        });


        //CHANGES THE HEADING SO YOU KNOW WHAT YOUR SEARCHING FOR. IF NOTHING IS ENTERED ERROR MESSAGE IS DISPLAYED.
        if ($(input).val() == "") {

            $("#showResult").css("display", "block");
            showResult.innerHTML = "<span class='red'>UH OH! YOUR FORGOT TO ENTER A SEARCH!</span>"
            $(result).css("display", "none");

        } else {

            $("#showResult").css("display", "block");
            showResult.innerHTML = "SHOWING RESULTS FOR " + "<span class='red'>" + searchTerm + "</span>"

        };
        //ACTIVATES THE CLEAR BUTTON & EXECUTES FUNCTIONS AT APPROPIATE TIME.
        if ($(input).val() !== "") {

            $(clear).css({
                "opacity": "1",
                "color": "red",
            });

            $(clear).hover(function() {

                $(clear).css("cursor", "pointer");
            });
            //THIS WILL CLEAR THE INPUT & SEARCH DIVS & MAKE CLEAR NOT CLICKABLE.   
            clear.onclick = function() {

                $(input).val("");
                $(result).css("display", "none");
                showResult.innerHTML = "<span class='red'>CLEARED!</span>";
                //PUTS THE CLEAR BUTTON BACK TO DEFAULT.    
                $(clear).css({
                    "opacity": ".5",
                    "color": "grey",

                });

                $(clear).hover(function() {

                    $(clear).css("cursor", "default");

                });

            }

        }

    }

});