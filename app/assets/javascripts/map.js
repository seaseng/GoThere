function initializeMap() {
    require(["esri/map", "dojo/domReady!"], function(Map) {
      map = new Map("map", {
        basemap: "streets", 
        center: [-122.44,37.77], // long, lat
        zoom: 13,
        sliderStyle: "small"
      })
    })
  }

var doOnLoad = function() {
  initializeMap()

}


$(document).ready(function(){
  doOnLoad()
})
$(window).bind('page:change', doOnLoad)