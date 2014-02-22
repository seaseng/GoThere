//$(window).bind('page:change', doOnLoad)

$(document).ready(function(){
  doOnLoad()
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
    "dojo/domReady!"
  ],  
    function(Map, Point, Graphic, SimpleMarkerSymbol, Color, ArcGISDynamicMapServiceLayer, ImageParameters){
      MapController.init(Map, Point, Graphic, SimpleMarkerSymbol, Color, ArcGISDynamicMapServiceLayer, ImageParameters)
    }
  )
}

//global
MapController = {
  pointer_icon: "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z",
  map_center: [-98.35,39.50], //lon, lat
  init: function(Map, Point, Graphic, SimpleMarkerSymbol, Color, ArcGISDynamicMapServiceLayer, ImageParameters){
    this.Point = Point
    this.Graphic = Graphic
    this.buildMarkerObject(SimpleMarkerSymbol,Color)
    var that = this;
    this.render(Map, function(){
      that.getData(function(json){
        that.placeMarkers(json)
      })
      that.map.on('click', function(){
        that.renderLayer(ImageParameters, ArcGISDynamicMapServiceLayer)
      })

    })
  },
  render: function(Map, callback){
    this.map =  new Map("map", {
      basemap: "streets", 
      center: this.map_center,
      zoom: 4,
      sliderStyle: "small"
    });
    callback()
  },
  recenter: function(lonlat){
    this.map.centerAndZoom(lonlat,13)
  },
  renderLayer: function(ImageParameters, ArcGISDynamicMapServiceLayer){
    var imageParameters = new ImageParameters();
    imageParameters.format = "jpeg"; //set the image type to PNG24, note default is PNG8.

    //Takes a URL to a non cached map service.
    var dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://megacity.esri.com/ArcGIS/rest/services/Demographics/USA_CrimeIndex/MapServer", {
      "opacity" : 0.8,
      "imageParameters" : imageParameters
    });

    this.map.addLayer(dynamicMapServiceLayer);
  },
  getData: function(callback){
    // $.get("http://data.sfgov.org/resource/gxxq-x39z.json")
    //  .done(callback)
  },
  buildMarkerObject: function(SimpleMarkerSymbol, Color){
    this.symbol = new SimpleMarkerSymbol({
      //style: 'circle',
      color: new Color([36,109,198,1]),
    })
    this.symbol.setPath(this.pointer_icon)
  },
  placeHotelMarkers: function(arr){
    this.recenter([arr[0].longitude, arr[0].latitude])

    var that = this;
    arr.forEach(function(place){
      var coords = {x: place.longitude, y: place.latitude}
      var attributes = {street_address: place.address1}
      that.placeMarker({coords: coords, attributes: attributes})
    })
  },
  placeMarkers: function(arr){
    var that = this;
    arr.forEach(function(place,_){
      var coords = place.coords || {x: place.location.longitude, y: place.location.latitude}
      var attributes = place.attributes || {}
      that.placeMarker({coords: coords, attributes: attributes})
    })
  },
  placeMarker: function(place){
    var place = place || TestData.place  //temp hardcode
    var point = new this.Point(place.coords)
    var graphic = new this.Graphic(point, MapController.symbol, place.attributes);

    this.map.graphics.add(graphic);
  }

}