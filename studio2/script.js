(function(){
    'use strict';
    console.log('reading js');

    const blocks = document.querySelector('.block');
    const planner = document.querySelector('.planner');
    //const plannerText = document.querySelector('.planner-text');

    async function getData(){
        const myDay = await fetch('data/day.json');
        const data = await myDay.json();
        console.log(data);
        makeBlocks(data);
    } 
    function makeBlocks(data){
        const numBlocks = data.schedule;

        numBlocks.forEach(function(data){
            const newBlock = blocks.cloneNode(true);
            planner.appendChild(newBlock);
            newBlock.textContent = data.time; 
        });
        // need to make each block's height relative to the amount of hours it represents
    }

    getData();
    
})();