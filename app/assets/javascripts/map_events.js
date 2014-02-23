$(document).ready(function() {

  bindMapEvents = function(Legend, arrayUtils) {
    MapController.map.on("layer-add-result", function (evt) {
      var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
        debugger
        return {layer:layer.layer, title:layer.layer.name};
      });
      // if (layerInfo.length > 0) {
        var legendDijit = new Legend({
          map: MapController.map
        }, "legendDiv");
        legendDijit.startup();
      // }
    });
  };

});