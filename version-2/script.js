(function(){
    'use strict';
    console.log('reading js');

    
    let objectsClicked = 0;

    const background = document.querySelector('#environment');
    const textBox = document.querySelector('#textbox');
    const cirlce = document.querySelector('.circle');

    const scene = { 
        location: [
        {
            environment: "url(images/outside.JPG)",
            startDialogue: '<p>The humidity is suffocating, <br> Your throat is dry and scratchy</p>',
            objects: 2,
            objectTop: [
                '15%',
                '90%'
            ],
            objectLeft: [
                '10%',
                '20%'
            ],
            objectDialogue: [
                '<p>The air quality is poor, the regular wildfires have only made it worse </p>',
                '<p>Why keep a pretty lawn when you barely have enough water to shower?</p>'
            ]
        }
    ]

    }
    
    function loadScene(index){
        const sceneInfo = scene.location[index]
        background.style.backgroundImage = sceneInfo.environment;
        for(let i = 0; i < sceneInfo.objects; i++){
            const newCircles = cirlce.cloneNode();

            newCircles.addEventListener('click', ()=>{
                textBox.innerHTML += sceneInfo.objectDialogue[i];
            });

            background.appendChild(newCircles)
            newCircles.style.top = sceneInfo.objectTop[i];
            newCircles.style.left = sceneInfo.objectLeft[i];
        }
        textBox.innerHTML = sceneInfo.startDialogue
    }

    loadScene(0);
})();