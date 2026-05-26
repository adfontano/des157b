(function () {
    'use strict';
    console.log('reading js');
    let objectsClicked = 0;
    let isTyping = false;
    let currentScene = 1;

    let whichQuestions = '';
    let whichAnswers = '';

    const background = document.querySelector('#environment');
    const textBox = document.querySelector('#textbox');
    const cirlce = document.querySelector('.circle');
    const progressionButton = document.querySelector('.progression-button');

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
                startChoice: [
                    'pizza',
                    'coffee'
                ],
                startAnswers: [
                    'No cheese bruh', //fix later
                    'No coffee either'
                ],
                objects: 2,
                objectTop: [
                    '50%',
                    '89%'
                ],
                objectLeft: [
                    '55%',
                    '21%'
                ],
                objectDialogue: [
                    'Helps your reused water to become drinkable. The water supply is so tight these days you may run out if you aren’t careful.',
                    'Filled with oatmilk, a morning delicacy.'
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
                startChoice: [
                    'Is this a regular occurance?'
                ],
                startAnswers: [
                    'yeah' //fix later
                ],
                objects: 1,
                objectTop: [
                    '43%'
                ],
                objectLeft: [
                    '57%'
                ],
                objectDialogue: [
                    'Gotta stay cool with how hot it is at night.'
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
        let optionsRemianing = false;
        const sceneInfo = scene.location[index];
        background.style.backgroundImage = sceneInfo.environment;
        for (let i = 0; i < sceneInfo.objects; i++) {
            const newCircles = cirlce.cloneNode();
            newCircles.classList.add('circle-clone');

            newCircles.addEventListener('click', async () => {
                if (isTyping) return; // no clicking on things while there is already dialogue being added
                await typing(`${sceneInfo.objectDialogue[i]}`);


                // console.log(findChoices[1]);
                console.log(sceneInfo.dialogueChoice[i]);

                // whichQuestions = Object.values(dialogueQuestions)[i-1]; //gets the strings from the correct array inside the dialogue questions object
                // whichAnswers = Object.values(dialogueAnswers)[i-1];

                if (sceneInfo.dialogueChoice[i] !== false) { // if there are dialogue questions for this object display them
                    const findChoices = sceneInfo.dialogueChoice[i]
                    const findAnswers = sceneInfo.choiceAnswers[i]

                    const ul = document.createElement('ul'); // create a ul for the questions to go in
                    findChoices.forEach(question => {    // for each question in the array put it in an li in the ul
                        // createLi(question);
                        const li = document.createElement('li');
                        li.textContent = question;
                        ul.appendChild(li);
                    });

                    textBox.appendChild(ul);
                    const allOptions = document.querySelectorAll('li:not(.disabled)');

                    console.log(optionsRemianing)

                    allOptions.forEach((option, index) => {
                        option.addEventListener('click', async () => { //gets the string from whichAnswers that corresponds to index
                            if (isTyping) return;
                            option.className = 'disabled';

                            await typing(`${findAnswers[index]}`);

                            //figure out how to make the dialogue options reappear after a dialogue response it added, also figure out how to make it so the scene won't progress when you still have dialogue options up (maybe add continue button?)

                            const activeOptionExists = document.querySelector('li:not(.disabled)'); //recheck for disabled li's
                            optionsRemianing = !!activeOptionExists; //if there are still elements on the page that are li's without the disabled class it is true

                            if (objectsClicked >= sceneInfo.objects && !optionsRemianing) { //once all objects have been viewed add final text and progression button
                                setTimeout(async () => {
                                    await typing(`${sceneInfo.progressionDialogue}`);
                                    makeProgressionButton(sceneInfo.progressionOption);
                                    document.querySelector('.progression-button').addEventListener('click', () => {
                                        loadNextScene();
                                    }, { once: true });
                                }, 1000);
                            }
                        }, { once: true });


                    });

                }

                if (!newCircles.classList.contains('disabled')) {
                    objectsClicked++;
                }
                newCircles.classList.add('disabled');







            });


            background.appendChild(newCircles)
            newCircles.style.top = sceneInfo.objectTop[i];
            newCircles.style.left = sceneInfo.objectLeft[i];


        }

        await typing(`${sceneInfo.startDialogue}`);

        if (currentScene === 0) {
            await typing(`${sceneInfo.instructions}`);
        }


        // ----- if there additional questions to start the scene ----
        if (sceneInfo.startChoice[0] !== false) {
            const findStartChoices = sceneInfo.startChoice;
            const findStartAnswers = sceneInfo.startAnswers;
            const ul = document.createElement('ul'); // create a ul for the questions to go in
            findStartChoices.forEach((choice) => {
                // createLi(choice);
                const li = document.createElement('li');
                li.textContent = choice;
                ul.appendChild(li);
            });

            textBox.appendChild(ul);
            const allOptions = document.querySelectorAll('li:not(.disabled)');

            allOptions.forEach((option, index) => {
                option.addEventListener('click', async () => { //gets the string from whichAnswers that corresponds to index
                    if (isTyping) return;
                    option.className = 'disabled';
                    await typing(`${findStartAnswers[index]}`);


                }, { once: true });
            });

        }
    }

    function loadNextScene() {
        currentScene++;
        textBox.innerHTML = '';
        objectsClicked = 0;
        document.querySelectorAll('.circle-clone').forEach(clone => clone.remove());
        loadScene(currentScene);
    }


    loadScene(currentScene);


    function makeProgressionButton(buttonText) {
        const button = document.createElement('button');
        button.className = 'progression-button';
        button.textContent = `${buttonText}`;

        textBox.appendChild(button);
    }

    // function createLi(text) {

    //     const li = document.createElement('li');
    //     li.textContent = text;

    // }

    async function typing(text) {
        if (isTyping) return; //prevent the typing function from running more than once at a time
        isTyping = true;

        const p = document.createElement('p'); //add a paragraph to put the text into
        textBox.appendChild(p);

        const speed = 30;

        for (let i = 0; i < text.length; i++) {
            p.textContent += text.charAt(i);
            await wait(speed);
        }

        isTyping = false; //once all characters have been added turn isTyping to false
    }

})();