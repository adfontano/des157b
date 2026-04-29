(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([38.777185, -121.295566], 13);
    var hsMarker = L.marker([38.758449, -121.277008]).addTo(map);
    var joannMarker = L.marker([38.781315, -121.271414]).addTo(map);
    var parkMarker = L.marker([38.777596, -121.298728]).addTo(map);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    
    hsMarker.bindPopup("My highschool");
    joannMarker.bindPopup("My first job!");
    parkMarker.bindPopup("My favorite park");


}());