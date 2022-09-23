import L from 'leaflet';
import ExifReader from 'exifreader';

L.Map.addInitHook(function() {
  this.getContainer()._leaflet_map = this;
});
let markerIcon = L.icon({
  iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC",
  shadowSize: [41, 41]
});
let __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
let lGEvents = {
  afterAppendSlide: "lgAfterAppendSlide",
  init: "lgInit",
  hasVideo: "lgHasVideo",
  containerResize: "lgContainerResize",
  updateSlides: "lgUpdateSlides",
  afterAppendSubHtml: "lgAfterAppendSubHtml",
  beforeOpen: "lgBeforeOpen",
  afterOpen: "lgAfterOpen",
  slideItemLoad: "lgSlideItemLoad",
  beforeSlide: "lgBeforeSlide",
  afterSlide: "lgAfterSlide",
  posterClick: "lgPosterClick",
  dragStart: "lgDragStart",
  dragMove: "lgDragMove",
  dragEnd: "lgDragEnd",
  beforeNextSlide: "lgBeforeNextSlide",
  beforePrevSlide: "lgBeforePrevSlide",
  beforeClose: "lgBeforeClose",
  afterClose: "lgAfterClose",
  rotateLeft: "lgRotateLeft",
  rotateRight: "lgRotateRight",
  flipHorizontal: "lgFlipHorizontal",
  flipVertical: "lgFlipVertical",
  autoplay: "lgAutoplay",
  autoplayStart: "lgAutoplayStart",
  autoplayStop: "lgAutoplayStop"
};
let exifSettings = {
  exifMarkup: '<div id="lg-exif-box" class="lg-exif-box lg-fb-exif-box"><div class="lg-exif-header"><h3 class="lg-exif-title">Image Information</h3><span class="lg-exif-close lg-icon"></span></div><div class="lg-exif-body"></div></div>',
  exifPluginStrings: {
    toggleexifs: "Toggle Image Information"
  }
};
let map = null;
let Exif = function() {
  function Exif2(instance, $LG) {
    this.core = instance;
    this.$LG = $LG;
    this.exif = {};
    this.html = "";
    this.settings = __assign(__assign({}, exifSettings), this.core.settings);
    return this;
  }
  Exif2.prototype.appendData = function(exif, value, label, prefix, suffix) {
    var _a;
    let exifEl = exif[value];
    let data = "";
    if (exifEl) {
      label = (label || value) + ": ";
      prefix = prefix || "";
      suffix = suffix || "";
      let style = "";
      if (typeof exifEl === "string" && exifEl.startsWith(prefix))
        prefix = "";
      if (typeof exifEl === "string" && exifEl.endsWith(suffix))
        suffix = "";
      if (value === "ExposureTime" && exifEl.description) {
        data = exifEl.description;
      } else if (value === "DateTimeOriginal") {
        let d = new Date(exifEl.value);
        data = d.toLocaleString();
        if (data === "Invalid Date") {
          data = exifEl.description;
        }
      } else if (value === "GPSLatitude" && exifEl.description) {
        data = Number.parseFloat(Math.abs(exifEl.description).toFixed(5));
        if (exif.GPSLatitudeRef && exif.GPSLatitudeRef.description)
          suffix = " " + exif.GPSLatitudeRef.description.replace("North", "N").replace("South", "S").replace(" latitude", "");
      } else if (value === "GPSLongitude" && exifEl.description) {
        data = Number.parseFloat(Math.abs(exifEl.description).toFixed(5));
        if (exif.GPSLongitudeRef && exif.GPSLongitudeRef.description)
          suffix = " " + exif.GPSLongitudeRef.description.replace("East", "E").replace("West", "W").replace(" longitude", "");
      } else if (value === "GPSAltitude" && exifEl.description) {
        data = exifEl.description;
      } else if (!isNaN(exifEl)) {
        data = +parseFloat(exifEl).toFixed(2);
      } else {
        data = (_a = exifEl.description) != null ? _a : exifEl.value[0];
      }
      if (value === "Make" || value === "Model") {
        data = exifEl.value[0].toLowerCase();
        style = 'style="text-transform: capitalize;"';
      }
      return "<li " + style + ">" + label + prefix + data + suffix + "</li>";
    }
  };
  Exif2.prototype.formatExifDetails = function(exif) {
    let html = "<ul>";
    html += this.appendData(exif, "Filename");
    html += this.appendData(exif, "DateTimeOriginal", "Date Taken");
    html += this.appendData(exif, "FNumber", "Aperature");
    html += this.appendData(exif, "ExposureTime", "Exposure", "", " sec");
    html += this.appendData(exif, "ISOSpeedRatings", "ISO");
    html += this.appendData(exif, "FocalLength", "Focal Length");
    html += this.appendData(exif, "LensModel", "Lens");
    html += this.appendData(exif, "Model");
    html += this.appendData(exif, "Make");
    html += "<hr>";
    html += this.appendData(exif, "GPSLatitude", "Latitude");
    html += this.appendData(exif, "GPSLongitude", "Longitude");
    html += this.appendData(exif, "GPSAltitude", "Altitude");
    html += '</ul><div id="map"></div>';
    return html;
  };
  Exif2.prototype.setMarkup = function() {
    this.core.outer.append(this.settings.exifMarkup + '<div class="lg-exif-overlay"></div>');
    let exifToggleBtn = '<button type="button" aria-label="' + this.settings.exifPluginStrings["toggleexifs"] + '" class="lg-exif-toggle lg-icon lg-info"></button>';
    this.core.$toolbar.append(exifToggleBtn);
  };
  Exif2.prototype.toggleExifPanel = function() {
    let _this_1 = this;
    this.core.outer.find(".lg-exif-toggle").first().on("click.lg.exif", function() {
      _this_1.core.outer.toggleClass("lg-exif-active");
    });
    this.core.outer.find(".lg-exif-overlay").first().on("click.lg.exif", function() {
      _this_1.core.outer.removeClass("lg-exif-active");
    });
    this.core.outer.find(".lg-exif-close").first().on("click.lg.exif", function() {
      _this_1.core.outer.removeClass("lg-exif-active");
    });
  };
  Exif2.prototype.getExif = function(event) {
    let _this = this;
    const thumbnail = event.target.querySelectorAll("img")[event.detail.index];
    let useData = thumbnail.dataset.filename;
    if (useData) {
      this.exif = new Promise((resolve, reject) => {
        resolve({
          Filename: { description: thumbnail.dataset.filename },
          DateTimeOriginal: { description: thumbnail.dataset.datetimeoriginal },
          FNumber: { description: thumbnail.dataset.fnumber },
          ExposureTime: { description: thumbnail.dataset.exposuretime },
          ISOSpeedRatings: { description: thumbnail.dataset.isospeedratings },
          FocalLength: { description: thumbnail.dataset.focallength },
          LensModel: { description: thumbnail.dataset.lensmodel },
          Model: { description: thumbnail.dataset.model },
          Make: { description: thumbnail.dataset.make },
          GPSLatitude: { description: thumbnail.dataset.gpslatitude },
          GPSLongitude: { description: thumbnail.dataset.gpslongitude },
          GPSLatitudeRef: { description: thumbnail.dataset.gpslatituderef },
          GPSLongitudeRef: { description: thumbnail.dataset.gpslongituderef },
          GPSAltitude: { description: thumbnail.dataset.gpsaltitude }
        });
      });
    } else {
      this.exif = ExifReader.load(thumbnail.src);
      this.exif.then(function(exif) {
        var _a;
        _this.exif = exif;
        _this.exif.Filename = { description: (_a = thumbnail.dataset.imgFilename) != null ? _a : thumbnail.src.replace(/^.*[\\\/]/, "") };
      });
    }
  };
  Exif2.prototype.init = function() {
    let _this = this;
    if (!this.settings.exif) {
      return;
    }
    this.setMarkup();
    this.toggleExifPanel();
    this.core.LGel.on(lGEvents.beforeSlide + ".exif", function(event) {
      _this.getExif(event);
      _this.exif.then(function(exif) {
        let html = _this.formatExifDetails(exif);
        _this.core.outer.find(".lg-exif-body").html(html);
        return exif;
      }).then(function(exif) {
        if (typeof exif.GPSLatitude !== "undefined" && typeof exif.GPSLatitude.description !== "undefined" && typeof exif.GPSLongitude !== "undefined" && typeof exif.GPSLongitude.description !== "undefined") {
          map = L.map("map").setView([exif.GPSLatitude.description, exif.GPSLongitude.description], 13);
          L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "\xA9 OpenStreetMap"
          }).addTo(map);
          L.marker([exif.GPSLatitude.description, exif.GPSLongitude.description], { icon: markerIcon }).addTo(map);
        }
      });
    });
    this.core.LGel.on(lGEvents.afterSlide + ".exif", function() {
    });
  };
  Exif2.prototype.destroy = function() {
    if (this.settings.exif) {
      this.core.outer.find(".lg-exif").remove();
      this.core.outer.find("#lg-exif-box").remove();
    }
    this.core.LGel.off(".lg.exif");
    this.core.LGel.off(".exif");
  };
  return Exif2;
}();

export { Exif as default };
