(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const sections = document.querySelectorAll('section')
    const darkImages = document.querySelectorAll('#dark-images img');
    const lightImages = document.querySelectorAll('#light-images img');
    const links = document.querySelectorAll('section a');
    let mode = 'dark';

    for (const link of links) {
        link.style.setProperty('--afterColor', '#FF619C');
    }
    
    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            button.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            for (const darkImage of darkImages) {
                darkImage.className = 'switch';
            }
            for (const lightImage of lightImages) {
                lightImage.removeAttribute('class');
            }
            for (const link of links) {
                link.style.setProperty('--afterColor', '#647FC6');
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            for (const lightImage of lightImages) {
                lightImage.className = 'switch';
            }
            for (const darkImage of darkImages) {
                darkImage.removeAttribute('class');;
            }
            for (const link of links) {
                link.style.setProperty('--afterColor', '#FF619C');
            }
            mode = 'dark'
        }
    })
})()