/*
Leaflet.Messagebox
Display a temporary text message on a map by Martijn Grendelman (https://github.com/tinuzz/)
https://github.com/tinuzz/leaflet-messagebox
 */

L.Control.Messagebox = L.Control.extend({
  options: {
    position: 'topright',
  },

  onAdd: function () {
    this._container = L.DomUtil.create('div', 'leaflet-control-messagebox');
    return this._container;
  },

  show: function (message) {
    const elem = this._container;
    elem.innerHTML = message;
    elem.style.display = 'block';
  },

  hide: function () {
    const elem = this._container;
    elem.style.display = 'none';
  },
});

L.Map.mergeOptions({
  messagebox: false,
});

L.Map.addInitHook(function () {
  if (this.options.messagebox) {
    this.messagebox = new L.Control.Messagebox();
    this.addControl(this.messagebox);
  }
});

L.control.messagebox = function (options) {
  return new L.Control.Messagebox(options);
};
