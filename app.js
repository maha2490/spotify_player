// app.js


//________________EVENTS _______________________________________________________________________

$(document).ready(function(){

	$(".js_song_form").on("submit", fetchSongInfo); // form

//________________PLAY _____________________________
	$('.btn-play').on('click', function(){

		if ($('.btn-play').hasClass('playing')){
			$('.js_player').trigger('pause');
			$('.btn-play').removeClass('playing');
		}
		else {
			$('.js_player').trigger('play');
     		$('.btn-play').addClass('playing');
		}
	});

	$('.js_player').on('timeupdate', printTime);
});

//________________FETCH SONG _____________________________________________________________________

function fetchSongInfo (event) {
  event.preventDefault();

  var searchTerm = $('.js_song_input').val(); // form INPUT
  

  $.ajax({
    type: "GET",
                                    //  Query string parameters
                                    //      key   value
    								//       |     | 
    url: "https://api.spotify.com/v1/search?type=track&query=" + searchTerm,
                                //         |          |
                                //    Indicated by ?  -------------- Multiple values separated by &
    success: showInfo,
    error: handleError
  });

  $('.js_song_input').val("");
}

function showInfo(songResponse){
  $(".js_title").empty();
  $(".js_name").empty();
  $(".js_image").empty();
  $(".js_player").empty();

  console.log(songResponse);
  console.log(songResponse.tracks.items[0].preview_url);

  var title = songResponse.tracks.items[0].artists[0].name;
  var artist_name = songResponse.tracks.items[0].name;
  var image = ` <img src="${songResponse.tracks.items[0].album.images[0].url}"> `;
  var preview = songResponse.tracks.items[0].preview_url;


  $(".js_title").html(title);
  $(".js_name").html(artist_name);
  $(".js_image").html(image);
  $(".js_player").prop('src', preview);
}


//________________STATUS BAR________________________________________________________________________

// Define a function to print the player's current time

function printTime () {
  var current = $('.js_player').prop('currentTime');
  console.log('currentTime' + current);
  // update value in <progress>

  $("progress").prop('value', current);
}


//________________ERROR_____________________________________________________________________________

function handleError (error) {
  console.log("Time to de-bug!");
  console.log(error.responseText);
}