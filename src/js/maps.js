// function loadMaps() {
//     return(
//         document.addEventListener('DOMContentLoaded', function(){
//         var target = document.querySelector('#map');
//         navigator.geolocation.getCurrentPosition(function(position) {
//             var latitude   = position.coords.latitude;
//             var longitude  = position.coords.longitude;
//             var coordinate = new google.maps.LatLng(latitude, longitude);
//             var optionsMap = {
//                         center : coordinate,
//                         zoom: 19,
//                         mapTypeId: google.maps.MapTypeId.ROADMAP
//             };
//             var map = new google.maps.Map(target, optionsMap);
//             var configMarker = { 
//                                 position : coordinate,
//                                 map : map,
//                                 title: "Você está aqui!"
//                                 };
//             var marker = new google.maps.Marker(configMarker);
//             });
//         })
//     )
// }