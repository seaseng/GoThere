//$(window).bind('page:change', doOnLoad)

$(document).ready(function(){
  doOnLoad()
  var $togglebox = $("[name='my-togglebox']")
  $togglebox.bootstrapSwitch();

  $('#label-toggle-switch').on('click', function(e, data) {
    $('.label-toggle-switch').bootstrapSwitch('toggleState');
  });
  $('.label-toggle-switch').on('switchChange', function (e, data) {
    if (data.value) {
      MapController.renderCrimeLayer() 
    } else {
      MapController.removeCrimeLayer() 
    }
  });

})

var doOnLoad = function() {
  require([
    "esri/map", 
    "esri/geometry/Point",
    "esri/graphic", 
    "esri/symbols/SimpleMarkerSymbol", 
    "dojo/_base/Color",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ImageParameters",
    "esri/dijit/Legend",
    "dojo/_base/array",
    "dojo/domReady!"
  ],  
    function(Map, Point, Graphic, SimpleMarkerSymbol, Color, ArcGISDynamicMapServiceLayer, ImageParameters, Legend, arrayUtils){
      MapController.init(Map, Point, Graphic, SimpleMarkerSymbol, Color, ArcGISDynamicMapServiceLayer, ImageParameters, Legend, arrayUtils)
    }
  )
}

//global
MapController = {
  pointer_icon: "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z",
  map_center: [-98.35,39.50], //lon, lat
  init: function(Map, Point, Graphic, SimpleMarkerSymbol, Color, ArcGISDynamicMapServiceLayer, ImageParameters, Legend, arrayUtils){
    this.Point = Point
    this.Graphic = Graphic
    this.buildMarkerObject(SimpleMarkerSymbol,Color)
    this.mapLayer = ArcGISDynamicMapServiceLayer
    this.imageParameters = ImageParameters
    var that = this;
    this.render(Map);    
    bindMapEvents(Legend, arrayUtils);
  },
  render: function(Map){
    this.map =  new Map("map", {
      basemap: "streets", 
      center: this.map_center,
      zoom: 4,
      sliderStyle: "small"
    });
  },
  recenter: function(lonlat){
    this.map.centerAndZoom(lonlat,13)
  },
  renderCrimeLayer: function(){
    var imageParameters = new this.imageParameters();
    imageParameters.format = "jpeg";
    this.dynamicMapServiceLayer = new this.mapLayer("http://megacity.esri.com/ArcGIS/rest/services/Demographics/USA_CrimeIndex/MapServer", {
      "opacity" : 0.4,
      "imageParameters" : imageParameters
    });

    this.map.addLayer(this.dynamicMapServiceLayer);
  },
  removeCrimeLayer: function() {
      this.map.removeLayer(this.dynamicMapServiceLayer);
      this.Legend.destroy();
  },

  buildMarkerObject: function(SimpleMarkerSymbol, Color){
    this.marker = new SimpleMarkerSymbol({
      color: new Color([36,109,198,1])
    })
    this.marker.setPath(this.pointer_icon)
  },
  placeHotelMarkers: function(arr){
    var arr = arr || TestData.hotels // development

    this.recenter([arr[0].longitude, arr[0].latitude])

    var that = this;
    arr.forEach(function(place,i){
      var coords = {x: place.longitude, y: place.latitude}
      var attributes = {id: i, street_address: place.address1}
      that.placeMarker({coords: coords, attributes: attributes})

      HotelListingController.buildAndPlaceListing(place, i)
    })
  },
  placeMarker: function(place){
    var place = place || TestData.place  // development
    var point = new this.Point(place.coords)
    var graphic = new this.Graphic(point, MapController.marker, place.attributes);

    this.map.graphics.add(graphic);
  }

}