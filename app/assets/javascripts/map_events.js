$(document).ready(function() {

  bindMapEvents = function(Legend, arrayUtils) {
    MapController.map.on("layer-add-result", function (evt) {
      var layerInfo = arrayUtils.map(evt.layer, function (layer, index) {
        return {layer:layer.layer, title:layer.layer.name};
      });
      var legendDijit = new Legend({
        map: MapController.map
      }, "legendDiv");
      legendDijit.startup();
    });
  };

});