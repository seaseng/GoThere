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
      slideySlideSliderSetup()
    })
  })

})

function slideySlideSliderSetup(){
    $('.slider').slider({min: 1, max: 5, value: 3})
              .on('slideStop', function(e){
                HotelListingController.filterByStars(e.value)
              })
}

HotelListingController = {
  buildAndPlaceListing: function(hotel, id){
    var img_base_url = 'http://images.travelnow.com'
    $('.nav.nav-sidebar').append("<li data-stars='" + hotel.hotelRating + 
      "' class='list-group-item'><a href='#" + id + "'>" + hotel.name + "</a><center><img src='" + 
      img_base_url + hotel.thumbNailUrl + "'></center></li>") 
  },
  filterByStars: function(stars){
    this.beforeSort()
    
    $.each(this.listings, function(_,listing){
      if (Math.ceil(listing.dataset.stars) === stars){
        $('.nav.nav-sidebar').append(listing)
      }
    })
  },
  beforeSort: function(){
    if (this.listings === undefined){
      this.listings = $('.nav.nav-sidebar').children()
    }
    $('.nav.nav-sidebar').empty()
  }

}

