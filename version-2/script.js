(function () {
    'use strict';
    console.log('reading js');
    let objectsClicked = 0;
    let isTyping = false;
    let skipTyping = false;
    let currentScene = 0;
    let enableCircleClicks = true;
    let allOptions;
    let activeMusic = null;
    let startDialogueTyping = false;
    let optionsRemaining = false;

    const background = document.querySelector('#environment');
    const textBox = document.querySelector('#textbox');
    const cirlce = document.querySelector('.circle');
    const progressionButton = document.querySelector('.progression-button');
    const startScreen = document.querySelector('#start-screen');
    const startButton = document.querySelector('#start-button');
    const main = document.querySelector('main');
    const muteButton = document.querySelector('#mute')
    let allowMusic = true;
    const bgMusic = new Audio('audio/bgMusic2.m4a');
    const startMusic = new Audio('audio/bgMusic1.m4a')
    const typeSound = new Audio('audio/fastTyping.mp3');
    typeSound.volume = 0.7;

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // helps to create a pause between characters appearing in the typing function

    const dialogueQuestions = {
        filter: [
            'Reused water?',
            'What happened to all the water?'
        ],
        mug: [
            'Is it that good?'
        ],
        fan: [
            "It's hot at night?",
            'Why not use the AC?'
        ]
    }
    const dialogueAnswers = {
        filter: [
            'Leftover shower and sink water, caught in a handy bucket.',
            'You don’t know? The droughts only get worse every year and the data centers need that water.'
        ],
        mug: [
            'When coffee and milk prices skyrocket you start to think it’s good.'
        ],
        fan: [
            'So hot it keeps you awake sometimes.',
            'You try, but you never know when the power might go out, besides do you really make enough money to be using the AC?'
        ]
    }


    const scene = {
        location: [
            {
                environment: "url(images/outside.JPG)",
                startDialogue: 'The humidity is suffocating, Your throat is dry and scratchy',
                startChoice: [
                    false
                ],
                startAnswers: [
                    false
                ],
                instructions: '<span class = "instructions">*click on anything highlighted with a orange circle to progress*</span>',
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
                    '<span class = "object-title">The cloudy sky: </span>The air quality is poor, the regular wildfires have only made it worse',
                    '<span class = "object-title">The dead landscaping: </span>Why keep a pretty lawn when you barely have enough water to shower?'
                ],
                dialogueChoice: [
                    false,
                    false
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
                startDialogue: 'You should probably make something to eat, what are you thinking?',
                startId: 'lunch',
                id: ['water', 'mug'],
                startChoice: [
                    'pizza',
                    'coffee'
                ],
                startAnswers: [
                    "Hm, we haven't seen any cheese in the store with all the dairy shortages", //fix later
                    "Maybe if you were rich, coffee bean prices have skyrocketed..."
                ],
                objects: 2,
                objectTop: [
                    '50%',
                    '89%'
                ],
                objectLeft: [
                    '62%',
                    '24%'
                ],
                objectDialogue: [
                    '<span class="object-title>"The water filter: </span>Helps your reused water to become drinkable. The water supply is so tight these days you may run out if you aren’t careful.',
                    '<span class="object-title">A half empty mug: </span>Filled with oatmilk, a morning delicacy.'
                ],
                dialogueChoice: [
                    dialogueQuestions.filter,
                    dialogueQuestions.mug
                ],
                choiceAnswers: [
                    dialogueAnswers.filter,
                    dialogueAnswers.mug
                ],
                progressionDialogue: [
                    "Looks like the power went out... your bedroom will be the coolest spot in the house to wait this out"
                ],
                progressionOption: [
                    '> Head to your room'
                ]

            },
            {
                environment: "url(images/bedroom.JPG)",
                startDialogue: 'This should be a good spot to wait out the outage',
                startId: 'waiting',
                id: ['fan'],
                startChoice: [
                    'Is this a regular occurance?'
                ],
                startAnswers: [
                    'yeah' //fix later
                ],
                objects: 1,
                objectTop: [
                    '45%'
                ],
                objectLeft: [
                    '65%'
                ],
                objectDialogue: [
                    '<span class = "object-title">A battery powered fan: </span> Gotta stay cool with how hot it is at night.'
                ],
                dialogueChoice: [
                    dialogueQuestions.fan
                ],
                choiceAnswers: [
                    dialogueAnswers.fan
                ],
                progressionDialogue: [
                    "End of game"
                ],
                progressionOption: [
                    '> End of game'
                ]

            }
        ]


    }


    async function loadScene(index) {

        //--------------------------------------- gets scene data and sets the bg --------------------------------
        const sceneInfo = scene.location[index];
        background.style.backgroundImage = sceneInfo.environment;

        //---------------------------------------- generates the interactive circles based on the scene data -----------------
        for (let i = 0; i < sceneInfo.objects; i++) {
            const newCircles = cirlce.cloneNode();
            newCircles.classList.add('circle-clone');

            // ----------------------------------------- listens for a circle to be clicked on ----------------------------------------------   
            newCircles.addEventListener('click', async () => {
                console.log(enableCircleClicks);
                if (isTyping) return; // no clicking on things while there is already dialogue being added
                if (!enableCircleClicks) return; // if there is current dialogue options active, no clicking

                await typing(`${sceneInfo.objectDialogue[i]}`); //once an object is clicked display the dialogue attached to it


                //---------------------------------- if there are dialogue questions for this object display them ---------------------------
                if (sceneInfo.dialogueChoice[i] !== false) {
                    if (isTyping) return;
                    enableCircleClicks = false;
                    makeChoices(sceneInfo.dialogueChoice[i], sceneInfo.choiceAnswers[i], sceneInfo.id[i], sceneInfo);

                }


                // ---------------------------------- Once an item has been clicked on dull the circle and increase counter ------------------
                newCircles.classList.add('disabled');
                objectsClicked++;

                // ------------------------------------ Progression dialogue for scenes with no dialogue options -----------------------------
                setTimeout(async () => {
                    if (sceneInfo.dialogueChoice[i] == false) {
                        if (objectsClicked >= sceneInfo.objects) {
                            if (isTyping) return;
                            await typing(`${sceneInfo.progressionDialogue}`);
                            makeProgressionButton(sceneInfo.progressionOption);
                            document.querySelector('.progression-button').addEventListener('click', () => {
                                loadNextScene();
                            }, { once: true });
                        };

                    }
                }, (500))



            });


            // ----------------------------------------- display the circles ---------------------------------------
            background.appendChild(newCircles)
            newCircles.style.top = sceneInfo.objectTop[i];
            newCircles.style.left = sceneInfo.objectLeft[i];


        }

        // --------------------------------------------- Starting dialogue plays -------------------------------------------
        startDialogueTyping = true;
        await typing(`${sceneInfo.startDialogue}`);
        startDialogueTyping = false;

        if (currentScene === 0) {

            await typing(`${sceneInfo.instructions}`);
        }

        // ---------------------------- if there additional questions to start the scene ---------------------------------
        if (sceneInfo.startChoice[0] !== false) {
            enableCircleClicks = false;
            makeChoices(sceneInfo.startChoice, sceneInfo.startAnswers, sceneInfo.startId, false);
        }



    }

    function loadNextScene() {
        currentScene++;
        textBox.innerHTML = '';
        objectsClicked = 0;
        document.querySelectorAll('.circle-clone').forEach(clone => clone.remove());
        loadScene(currentScene);
    }

    function startGame() {
        
        startMusic.currentTime = 0
        main.style.display = 'none';
        startScreen.style.display = 'block';

        activeMusic = startMusic
        playMusic();

        startButton.addEventListener('click', () => {
            bgMusic.currentTime = 0;
            startMusic.pause();
            main.style.display = 'flex';
            startScreen.style.display = 'none';
            loadScene(currentScene);

            activeMusic = bgMusic
            playMusic();
        }, { once: true });
    }

    startGame();


    // ----------------------------------------------------- creates dialogue choices ------------------------------------
    function makeChoices(choice, answer, id, sceneInfo) {
        const findChoices = choice;
        const findAnswers = answer;
        const continueButton = document.createElement('li');
        const ul = document.createElement('ul');

        optionsRemaining = true;
        ul.setAttribute('id', id)

        // -------------------------------------------------- puts each dialogue choice into a list item ---------------------------
        findChoices.forEach((choice) => {
            // createLi(choice);
            const li = document.createElement('li');
            li.textContent = choice;
            ul.appendChild(li);
        });

        // -------------------------------------------------- creates a continue button and appends all li's to a ul ----------------
        continueButton.textContent = 'continue'
        continueButton.className = 'continue';
        ul.appendChild(continueButton);
        textBox.appendChild(ul);

        // -------------------------------------------------- Select all choices and output their responses --------------------------
        allOptions = document.querySelectorAll(`#${id} li:not(.disabled)`);

        allOptions.forEach((option, index) => {
            option.addEventListener('click', async () => {
                if (isTyping) return;

                if (option.classList.contains('continue')) {

                    option.className = 'disabled';
                    await typing('continuing (placeholder text)');
                    allOptions.forEach(option => option.className = 'disabled');
                    ul.className = 'disabled';
                    optionsRemaining = false;
                    enableCircleClicks = true;

                    console.log(enableCircleClicks);

                    //--------------------------------- Add progression dialogue ---------------------------------------
                    if (sceneInfo !== false) {
                        setTimeout(async () => {
                            if (objectsClicked >= sceneInfo.objects && !optionsRemaining) {
                                if (isTyping) return;
                                await typing(`${sceneInfo.progressionDialogue}`);
                                makeProgressionButton(sceneInfo.progressionOption);
                                document.querySelector('.progression-button').addEventListener('click', () => {
                                    loadNextScene();
                                }, { once: true });
                            }
                        }, (500))

                    }

                } else {
                    if (ul.className === 'disabled') return;
                    option.className = 'disabled';
                    await typing(`${findAnswers[index]}`);
                    optionsRemaining = true;
                }


            }, { once: true });

        });

    }


    function makeProgressionButton(buttonText) {
        const button = document.createElement('button');
        button.className = 'progression-button';
        button.textContent = `${buttonText}`;

        textBox.appendChild(button);
        textBox.scrollTo({
            top: textBox.scrollHeight,
            behavior: 'smooth'
        });
    }


    async function typing(text) {
        if (isTyping) return; //prevent the typing function from running more than once at a time
        let fullText = text;
        const p = document.createElement('p'); //add a paragraph to put the text into
        const speed = 30;
        let targetElement = p;
        const parser = document.createElement('div'); //creates a div
        const textTokens = []; //array for tracking each part of the string

        isTyping = true;
        skipTyping = false;
        textBox.appendChild(p);
        typeSound.currentTime = 0;
        parser.innerHTML = text; //puts full string inside the div


        parser.childNodes.forEach(node => { //looks at each word in the div
            if (node.nodeType === Node.TEXT_NODE) { //if the div just contains plain text, put it inside an empty text node and add it to the paragraph
                const textNode = document.createTextNode("");
                p.appendChild(textNode);
                textTokens.push({ element: textNode, fullText: node.textContent })
            } else if (node.nodeName === 'SPAN') { //if the div contains a span, create a span element
                const styledSpan = document.createElement('span');
                styledSpan.className = node.className; 
                p.appendChild(styledSpan);
                textTokens.push({ element: styledSpan, fullText: node.textContent })
            }
        })

        for (const token of textTokens) {
            if (skipTyping) { break; } // if the user clicks again in the text box the loop will end early
            for (let i = 0; i < token.fullText.length; i++) {
                if (skipTyping) { break; }

                if (token.element.nodeType === Node.TEXT_NODE) { //checks if the target element is plain text or an html span node
                    token.element.nodeValue += token.fullText.charAt(i) //gets character at position [i] and adds it to the screen
                } else {
                    token.element.textContent += token.fullText.charAt(i)
                }

                if (allowMusic === true) {
                    typeSound.play();
                }

                await wait(speed);
            }
        }

        textTokens.forEach(token => { //if the user skips the text, displays the full string
            if (token.element.nodeType === Node.TEXT_NODE) {
                token.element.nodeValue = token.fullText;
            } else {
                token.element.textContent = token.fullText
            }
        })

        typeSound.pause();
        typeSound.currentTime = 0;

        textBox.scrollTo({
            top: textBox.scrollHeight,
            behavior: 'smooth'
        });

        isTyping = false; //once all characters have been added turn isTyping to false
    }

    function playMusic(music) {
        bgMusic.loop = true;
        startMusic.loop = true;

        if (allowMusic === true) {
            muteButton.className = 'fa-solid fa-volume-low';
            if (activeMusic) {
                activeMusic.play();
            }
        } else if (allowMusic === false) {
            muteButton.className = 'fa-solid fa-volume-xmark';
            activeMusic.pause();
            typeSound.pause();
        }

    }


    //---------------------------- makes dialogue auto complete if you click in the text box -------------------------
    textBox.addEventListener('click', () => {
        if (isTyping && !optionsRemaining && !startDialogueTyping) {
            skipTyping = true;
        }

    })

    muteButton.addEventListener('click', () => {
        allowMusic = !allowMusic;
        playMusic();
    })


})();