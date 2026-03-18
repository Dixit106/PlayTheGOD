let item1 = null;
let item2 = null;

const slot1 = document.getElementById('slot-1');
const slot2 = document.getElementById('slot-2');
const combineBtn = document.getElementById('combine-btn');
const resultMsg = document.getElementById('result-message');
const particles = document.querySelectorAll('.element');

// clicking particles to put them in slots
particles.forEach(particle => {
    particle.addEventListener('click', () => {
        const name = particle.getAttribute('data-name');

        if (!item1) {
            item1 = name;
            slot1.innerText = name;
        } else if (!item2) {
            item2 = name;
            slot2.innerText = name;
        }
    });
});

//clicking slots to empty them
slot1.addEventListener('click', () => {
    item1 = null;
    slot1.innerText = "Select Item 1";
});

slot2.addEventListener('click', () => {
    item2 = null;
    slot2.innerText = "Select Item 2";
});

//clicking the collide button
combineBtn.addEventListener('click', () => {
    if (item1 && item2) {
        resultMsg.innerText = 'smashing ${item1} and ${item2} together...'
        
    // will send in flask to see what it makes    
    fetch('/combine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item1: item1,item2: item2 }),    
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            resultMsg.innerText = 'Success! You created: ${data.result}';
            resultMsg.style.colour = "#66fc1"; // success
        } else {
            resultMsg.innerText = data.result;
            resultMsg.style.color = "#c5c6c7" //failure
        }
    });
    
    } else {
        resultMsg.innerText = "pick two particles first!";
    }
});