$(document).ready(function () {
  const amenities = [];
  $('li :checkbox').change(function () {
    if (this.checked) {
      amenities.push($(this).attr('data-name'));
    } else {
      amenities.pop();
    }
    $('.amenities h4').html(amenities.join(', '));
  });

  const placesUri = 'http://c66a74704532.93090521.hbtn-cod.io:5001/api/v1/places_search/';

  $.ajax({
    url: placesUri,
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      console.log
      for (let i = 0; i < data.length; i++) {
        $('section.places').append(parsePlace(data[i]));
      }
    }
  });

  getStatus('http://c66a74704532.93090521.hbtn-cod.io:5001/api/v1/status/');
});

function getStatus (url) {
  $.get(url, function (json) {
    if (json.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
}

function parsePlace (data) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    placeBuilder(place.name)
  }
}

function placeBuilder(title) {
return `<article>
	  <div class="title_box">
	    <h2>${title}</h2>
	    <div class="price_by_night">{{ place.price_by_night }}</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
            <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
            <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
	  </div>
	  <div class="user">
            <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}
          </div>
          <div class="description">
	    {{ place.description | safe }}
          </div>
	</article>`;
}