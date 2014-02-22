$(window).bind('page:change', doOnLoad)

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
    "dojo/domReady!"
  ],  
    function(Map, Point, Graphic, SimpleMarkerSymbol, Color){
      MapController.init(Map, Point, Graphic, SimpleMarkerSymbol, Color)
    }
  )
}

//global
MapController = {
  pointerIcon: "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z",
  map_center: [-122.44,37.77], //lon, lat
  init: function(Map, Point, Graphic, SimpleMarkerSymbol, Color){
    this.Point = Point
    this.Graphic = Graphic
    this.render(Map)
    this.buildMarkerObject(SimpleMarkerSymbol,Color)
  },
  render: function(Map){
    this.map =  new Map("map", {
      basemap: "streets", 
      center: this.map_center,
      zoom: 4,
      sliderStyle: "small"
    });
  },
  buildMarkerObject: function(SimpleMarkerSymbol, Color){
    this.symbol = new SimpleMarkerSymbol({
      //color: new Color([153,0,51,0.75]),
    })
    this.symbol.setPath(this.pointerIcon)
  },
  placeMarkers: function(arr){
    var that = this;
    arr.forEach(function(place,_){
      that.placeMarker(place)
    })
  },
  placeMarker: function(place){
    var place = place || TestData.place  //temp hardcode
    var point = new this.Point(place.coords)
    var graphic = new this.Graphic(point, this.symbol, place.attributes);

    this.map.graphics.add(graphic);
  }

}

TestData = {
  place: {
    coords: {
      x: -82.59, 
      y: 39.59
    }, attributes: {
      address: "100 Street",
      price: "$2.50"
    }
  },
  places: [
    this.place,
    {coords: {
      x: -122.59, 
      y: 39.59
    }, attributes: {
      address: "200 Street",
      price: "$12.50"
    }}
  ]
}
