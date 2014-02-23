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
    console.log(id)
    $('.nav.nav-sidebar').append("<li><a href='#" + id + "'>" + hotel.name + "</a></li>")
  },
}

