__CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}

var bootPATH = __CreateJSPath("image.boot.js");
//
document.write('<script src="' + bootPATH + 'OpenLayers/OpenLayers.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'jquery/jquery-1.7.1.min.js" type="text/javascript" ></script>');
document.write('<script src="' + bootPATH + 'json.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'drag.js" type="text/javascript" ></script>');
document.write('<script src="' + bootPATH + 'util/map.js?r='+ Math.random() +'" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'util/util.js?r='+ Math.random() +'" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'local/resource.js?r='+ Math.random() +'" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'local/img.map.js?r='+ Math.random() +'" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'local/img.vectors.js?r='+ Math.random() +'" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'local/img.api.js?r='+ Math.random() +'" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'local/cs.api.js?r='+ Math.random() +'" type="text/javascript"></script>');

//test
document.write('<script src="' + bootPATH + 'local/test.js?r='+ Math.random() + '" type="text/javascript" ></script>');