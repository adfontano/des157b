(function(){
    'use strict';
    console.log('reading js');

    const video = document.querySelector('#beachVideo');
    const screenWidth = window.innerWidth;
    const line1 = document.querySelector('h1:first-of-type');
    const line2 = document.querySelector('h1:last-of-type');
    const fs = document.querySelector('.fa-expand');
    

    document.addEventListener('mousemove', function(e){
        let sepiaValue = (e.clientX / (screenWidth/2)) - 1;
        let saturateValue = (1-(e.clientX / (screenWidth)))*1.5;

        if(e.clientX > screenWidth / 2) {
            video.style.filter = (`sepia(${sepiaValue*75}%)`);
            line1.className = 'hidden';
            line2.className = 'showing';
        } else if (e.clientX < screenWidth / 2) {
            video.style.filter = (`saturate(${saturateValue*100}%)`);
            line1.className = 'showing';
            line2.className = 'hidden';
        } 

        fs.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        })

    })
})();