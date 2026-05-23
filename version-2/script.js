(function(){
    'use strict';
    console.log('reading js');
    let objectsClicked = 0;
    let isTyping = false;
    let currentScene = 0;
    const ul = document.createElement('ul'); // create a ul for the questions to go in
    let whichQuestions = '';
    let whichAnswers = '';
    

    const background = document.querySelector('#environment');
    const textBox = document.querySelector('#textbox');
    const cirlce = document.querySelector('.circle');
    const progressionButton = document.querySelector('.progression-button');

    const wait = (ms) => new Promise(resolve=> setTimeout(resolve,ms)); // helps to create a pause between characters appearing in the typing function

    const dialogueQuestions = {
        lawn: [
            'options 1', 
            'options 2'
        ]
    }
    const dialogueAnswers = {
        lawn: [
            'you clicked option 1',
            'you clicked option 2'
        ]
    }
    
    
    const scene = { 
        location: [
        {
            environment: "url(images/outside.JPG)",
            startDialogue: 'The humidity is suffocating, Your throat is dry and scratchy',
            instructions: '*click on anything highlighted with a white circle to progress*',
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
                'The air quality is poor, the regular wildfires have only made it worse',
                'Why keep a pretty lawn when you barely have enough water to shower?'
            ],
            dialogueChoice: [
                false,
                dialogueQuestions.lawn
            ],
            progressionDialogue: [
                "It’s far too hot to stand around out here, you should head inside."
            ],
            progressionOption: [
                '> Head inside'
            ]
        },
        {
            environment: "url(images/kitchen.JPG)",
            startDialogue: 'You should probably make something to eat, what are you thinking?'
        }
    ]
        

    }
    
    
    async function loadScene(index){
        
        const sceneInfo = scene.location[index];
        background.style.backgroundImage = sceneInfo.environment;
        for(let i = 0; i < sceneInfo.objects; i++){
            const newCircles = cirlce.cloneNode();

            newCircles.addEventListener('click', async()=>{
                if(isTyping) return; // no clicking on things while there is already dialogue being added
                await typing(`${sceneInfo.objectDialogue[i]}`);

                whichQuestions = Object.values(dialogueQuestions)[i-1]; //gets the strings from the correct array inside the dialogue questions object
                whichAnswers = Object.values(dialogueAnswers)[i-1];

                if(sceneInfo.dialogueChoice[i] !== false){ // if there are dialogue questions for this object display them
                    
                    whichQuestions.forEach(question => {    // for each question in the array put it in an li in the ul
                        createLi(question);
                    });
                    textBox.appendChild(ul);
                    const allOptions = document.querySelectorAll('li');

                    allOptions.forEach((option, index) => {
                        option.addEventListener('click',async()=>{ //gets the string from whichAnswers that corresponds to index
                            console.log(whichAnswers[index]);
                            option.className = 'disabled';
                            await typing(`${whichAnswers[index]}`);
                            
                            
                            textBox.appendChild(ul);

                        }, {once: true})
                    });
                    
                }

                if(!newCircles.classList.contains('disabled')){
                    objectsClicked++;
                }
                newCircles.classList.add('disabled');  
                
                
                
                
                if(objectsClicked == sceneInfo.objects){ //once all objects have been viewed add final text and progression button
                    setTimeout(async()=> {
                        await typing(`${sceneInfo.progressionDialogue}`);
                        makeProgressionButton(sceneInfo.progressionOption);
                        document.querySelector('.progression-button').addEventListener('click', ()=>{
                            loadNextScene();
                        }, {once: true});
                    }, 1000);
                }
            }); 

            background.appendChild(newCircles)
            newCircles.style.top = sceneInfo.objectTop[i];
            newCircles.style.left = sceneInfo.objectLeft[i];

            
        }

        await typing(`${sceneInfo.startDialogue}`);
        await typing(`${sceneInfo.instructions}`);

        
    }

    function createLi(text){
        const li = document.createElement('li'); 
        li.textContent = text;
        ul.appendChild(li);
    }

    function loadNextScene() {
        currentScene++;
        textBox.innerHTML = '';
        loadScene(currentScene);
    }


    loadScene(currentScene);
   

    function makeProgressionButton(buttonText) {
        const button = document.createElement('button');
        button.className = 'progression-button';
        button.textContent = `${buttonText}`;

        textBox.appendChild(button);
    } 

    async function typing(text){
        if(isTyping) return; //prevent the typing function from running more than once at a time
        isTyping = true;

        const p = document.createElement('p'); //add a paragraph to put the text into
        textBox.appendChild(p);

        const speed = 30;

        for(let i = 0; i < text.length; i++){
            p.textContent += text.charAt(i); 
            await wait(speed);
        }

        isTyping = false; //once all characters have been added turn isTyping to false
    }

})();