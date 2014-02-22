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
    "dojo/domReady!"
  ],  
    function(Map, Point, Graphic, SimpleMarkerSymbol, Color){
      MapController.init(Map, Point, Graphic, SimpleMarkerSymbol, Color)
    }
  )
}

//global
MapController = {
  pointer_icon: "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z",
  map_center: [-122.44,37.77], //lon, lat
  init: function(Map, Point, Graphic, SimpleMarkerSymbol, Color){
    this.Point = Point
    this.Graphic = Graphic
    esriConfig.defaults.io.proxyUrl = ""
    this.buildMarkerObject(SimpleMarkerSymbol,Color)
    var that = this;
    this.render(Map, function(){
      that.getData(function(json){
        that.placeMarkers(json)
      })
    })
  },
  render: function(Map, callback){
    this.map =  new Map("map", {
      basemap: "streets", 
      center: this.map_center,
      zoom: 13,
      sliderStyle: "small"
    });
    callback()
  },
  getData: function(callback){
    $.get("http://data.sfgov.org/resource/gxxq-x39z.json")
     .done(callback)
  },
  buildMarkerObject: function(SimpleMarkerSymbol, Color){
    this.symbol = new SimpleMarkerSymbol({
      //style: 'circle',
      //color: new Color([153,0,51,0.75]),
    })
    this.symbol.setPath(this.pointer_icon)
  },
  placeMarkers: function(arr){
    var that = this;
    arr.forEach(function(place,_){
      //console.log(place.category)
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
  ],

  crimes: [{
    "time" : "12:00",
    "category" : "LARCENY/THEFT",
    "pddistrict" : "CENTRAL",
    "location" : {
      "needs_recoding" : false,
      "longitude" : "-122.419616109671",
      "latitude" : "37.8019942438049"
    },
    "address" : "LOMBARD ST / HYDE ST",
    "descript" : "GRAND THEFT FROM LOCKED AUTO",
    "dayofweek" : "Friday",
    "resolution" : "NONE",
    "date" : 1391155200,
    "y" : "37.8019942438049",
    "x" : "-122.419616109671",
    "incidntnum" : "146022613"
  }
  , {
    "time" : "13:55",
    "category" : "LARCENY/THEFT",
    "pddistrict" : "CENTRAL",
    "location" : {
      "needs_recoding" : false,
      "longitude" : "-122.405894420706",
      "latitude" : "37.7896023539705"
    },
    "address" : "300 Block of SUTTER ST",
    "descript" : "GRAND THEFT FROM LOCKED AUTO",
    "dayofweek" : "Friday",
    "resolution" : "NONE",
    "date" : 1391155200,
    "y" : "37.7896023539705",
    "x" : "-122.405894420706",
    "incidntnum" : "146022362"
  }
  , {
    "time" : "17:15",
    "category" : "BURGLARY",
    "pddistrict" : "TENDERLOIN",
    "location" : {
      "needs_recoding" : false,
      "longitude" : "-122.409973312269",
      "latitude" : "37.7851896203434"
    },
    "address" : "200 Block of ELLIS ST",
    "descript" : "BURGLARY,STORE UNDER CONSTRUCTION, FORCIBLE ENTRY",
    "dayofweek" : "Friday",
    "resolution" : "NONE",
    "date" : 1391155200,
    "y" : "37.7851896203434",
    "x" : "-122.409973312269",
    "incidntnum" : "140098935"
  }
  , {
    "time" : "14:00",
    "category" : "LARCENY/THEFT",
    "pddistrict" : "CENTRAL",
    "location" : {
      "needs_recoding" : false,
      "longitude" : "-122.409043928994",
      "latitude" : "37.7975730481122"
    },
    "address" : "BROADWAY ST / CORDELIA ST",
    "descript" : "GRAND THEFT FROM UNLOCKED AUTO",
    "dayofweek" : "Friday",
    "resolution" : "NONE",
    "date" : 1391155200,
    "y" : "37.7975730481122",
    "x" : "-122.409043928994",
    "incidntnum" : "140091785"
  }
  , {
    "time" : "02:00",
    "category" : "LARCENY/THEFT",
    "pddistrict" : "MISSION",
    "location" : {
      "needs_recoding" : false,
      "longitude" : "-122.418601780502",
      "latitude" : "37.7636325572274"
    },
    "address" : "100 Block of CAPP ST",
    "descript" : "GRAND THEFT FROM LOCKED AUTO",
    "dayofweek" : "Friday",
    "resolution" : "NONE",
    "date" : 1391155200,
    "y" : "37.7636325572274",
    "x" : "-122.418601780502",
    "incidntnum" : "146023229"
  }
  , {
    "time" : "14:48",
    "category" : "NON-CRIMINAL",
    "pddistrict" : "NORTHERN",
    "location" : {
      "needs_recoding" : false,
      "longitude" : "-122.420676028352",
      "latitude" : "37.7762540028806"
    },
    "address" : "100 Block of FELL ST",
    "descript" : "DEATH REPORT, CAUSE UNKNOWN",
    "dayofweek" : "Friday",
    "resolution" : "NONE",
    "date" : 1391155200,
    "y" : "37.7762540028806",
    "x" : "-122.420676028352",
    "incidntnum" : "140091848"
  }]
}
