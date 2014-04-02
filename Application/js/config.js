
var HTTP_ROOT = 'http://your.domain/root_folder';

var JSON_SOURCE = 'json.php';

var IMG_ROOT = 'http://src.sencha.io/' + HTTP_ROOT + '/images/';

var homeTitle = 'Easy Treaty';

var homeHtml = '<div style="text-align:center"><img src="location-app.png"/><p><b>Easy Treaty</b> is the perfect way to display Loaction based Disease Treatment.</p></div>';

var homeTabTxt = 'Home';


var listingTitle = 'Locations Information';

var listingTabTxt = 'Information';



var startLat = 28.6100;
var startLng = 77.2300;

var mapZoom = 10;

var detailZoom = 12;

var searchZoom = 15;

var moreInfo = 'View Location';

var locationFields = [
        {name: 'title', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'details', type: 'string'},
        {name: 'images', type: 'object'},
        {name: 'thumb', type: 'string'},
        {name: 'marker', type: 'string'},
        {name: 'lat',       type: 'float'},
        {name: 'lng',   type: 'float'}
    ]
    
var detailsTemplate = 	'<div><tpl if="address"><address>{address}</address></tpl><tpl if="details"><p>{details}</p></tpl></div>';