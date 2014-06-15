var OrientationManager = (function() {
  "use strict";
 
  var supportsOrientationChange = window.hasOwnProperty("onorientationchange");
  var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
  var currentOrientation = supportsOrientationChange ? window.orientation : 0;
  var currentWidth = currentOrientation || window.outerWidth;
 
  var orientationChanged = function(callBack) {
    var newWidth = this.supportsOrientationChange ? window.orientation : window.outerWidth;
 
    // only change orientation and call provided callback if necessary
    if (newWidth !== this.currentWidth) {
      this.currentWidth = newWidth;
 
      callBack && callBack();
    }
  }
 
  var bind = function(callback) {
    $(window).on(this.orientationEvent, function(){
      OrientationManager.orientationChanged(callback);
    });
  };
 
  // exports
  return {
    supportsOrientationChange: supportsOrientationChange,
    orientationEvent: orientationEvent,
    orientationChanged: orientationChanged,
    bind: bind
  };
}());