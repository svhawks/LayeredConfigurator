define(['MLLCFGR'], function(MLLCFGR) {

  MLLCFGR = MLLCFGR.default;

  var cfgr = new MLLCFGR();

  var objectLayer = new MLLCFGR.ObjectLayer('test');

  describe('MLLCFGR', function () {

    it('does accept ObjectLayer instances', function() {

      cfgr.addLayer(objectLayer);

      var gotLayer = cfgr.getLayer('test');

      (gotLayer).should.be.exactly(objectLayer);

    });

    it('can remove a layer', function() {

      var result = cfgr.removeLayer('test');

      (result).should.be.true;

      var gotLayer = cfgr.getLayer('test');

      (gotLayer === undefined).should.be.true;

    });

    /*it('can get values with multiple layers', function() {

      var layers = 

    });*/

  });

});
