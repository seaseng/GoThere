$(document).ready(function(){
  
  var map;

  require(["esri/map", "dojo/domReady!"], function(Map) {
    map = new Map("map", {
      basemap: "streets", 
      center: [-122.44,37.77], // long, lat
      zoom: 13,
      sliderStyle: "small"
    })
  })

})