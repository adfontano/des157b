(function(){
    'use strict';
    console.log('reading js');

    const block = document.querySelector('.block');
    const myDay = document.querySelector('#my-day');   
    let activeBlock = null;


    async function getData(){
        const myDay = await fetch('data/day.json');
        const data = await myDay.json();
        console.log(data);
        makeBlocks(data);  
    } 

    function makeBlocks(data){
        const numBlocks = data.schedule;

        numBlocks.forEach(function(data){
            const newBlock = block.cloneNode(true);
            

            planner.appendChild(newBlock);
            newBlock.innerHTML = `<p>${data.time}<p>`; 
    
            newBlock.style.flex = data.hours;
            console.log(data.hours);

            newBlock.addEventListener('click',function(){
                myDay.innerHTML = `<img src='${data.images}'>
                <div>
                    <p>Time Started: ${data.time}</p>
                    <p>Activity: ${data.activity}</p>
                    <p>Feeling: ${data.feeling}</p>
                </div>`;
                blockColor(); 
                
            })
        });   
        
    }

    function blockColor(){
        const allBlocks = document.querySelectorAll('.block');
        for(const oneBlock of allBlocks){
                oneBlock.addEventListener('click', function(event){  
                    event.currentTarget.style.backgroundColor = '#f7e2a5';
                    
                    if(activeBlock !== null && activeBlock !== event.currentTarget){
                        activeBlock.style.backgroundColor = '#f7efcb';
                    }

                    activeBlock = event.currentTarget;
                });
        };
    }

    getData();
    
    
})();