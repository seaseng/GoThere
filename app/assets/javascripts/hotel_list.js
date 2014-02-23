$(document).ready( function() {

  $('form#form-search').on('submit', function(e) {
    e.preventDefault()
    url = $(this).attr('action')
    var value = $('form#form-search #search').val()
    $.ajax({
      type: 'post',
      url: url,
      data: { search: value },
      dataType: 'json'
    }).success( function(hotels) {
      MapController.placeHotelMarkers(hotels)
    })
  })

})

var HotelListingController = {
  buildAndPlaceListing: function(hotel, id){
    var img_base_url = 'http://images.travelnow.com'
    $('.nav.nav-sidebar').append("<li><a href='#" + id + "'>" + hotel.name + "</a><center><img src='" + img_base_url + hotel.thumbNailUrl + "'></center></li> . . . . . . . . . . . . . . . . . . . . . .") 
  },
}

