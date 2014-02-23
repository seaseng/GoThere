<<<<<<< HEAD
$(document).ready(function(){

  

});
=======
$(document).ready( function() {

  var hotel_list = [];
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
      hotel_list = hotels;
    })

  })

})
>>>>>>> 51d9d4715ea442e09f88a9088ad62dbd568efcc6
