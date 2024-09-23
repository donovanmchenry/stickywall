let noteCount = 0;
const wall = document.getElementById('wall');
const addNoteButton = document.getElementById('addNoteButton');

// Function to generate a random pastel color
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
    const pastel = `hsl(${hue}, 100%, 85%)`; // Full saturation, lightness for pastel effect
    return pastel;
}

addNoteButton.addEventListener('click', () => {
    addStickyNote();
});

function addStickyNote() {
    const stickyNote = document.createElement('div');
    stickyNote.classList.add('sticky-note');
    stickyNote.setAttribute('draggable', true);
    stickyNote.style.top = `${Math.random() * 60}vh`;
    stickyNote.style.left = `${Math.random() * 60}vw`;

    // Apply a random background color to the sticky note
    stickyNote.style.backgroundColor = getRandomColor();

    const ul = document.createElement('ul');
    for (let i = 0; i < 3; i++) {
        const li = document.createElement('li');

        // Create editable text element
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.contentEditable = true;
        taskText.textContent = `Task ${i + 1}`;

        // Create the stylish "X" button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleTask(li);
        });

        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    }
    stickyNote.appendChild(ul);

    wall.appendChild(stickyNote);
    enableDrag(stickyNote);
}

function toggleTask(li) {
    li.classList.toggle('checked');
    checkAllTasks(li.closest('.sticky-note'));
}

function checkAllTasks(stickyNote) {
    const allTasks = stickyNote.querySelectorAll('li');
    const completedTasks = stickyNote.querySelectorAll('li.checked');
    if (allTasks.length === completedTasks.length) {
        stickyNote.classList.add('fall');
        setTimeout(() => {
            wall.removeChild(stickyNote);
        }, 1000);
    }
}

function enableDrag(stickyNote) {
    let offsetX, offsetY;

    stickyNote.addEventListener('dragstart', (event) => {
        offsetX = event.offsetX;
        offsetY = event.offsetY;
    });

    stickyNote.addEventListener('dragend', (event) => {
        stickyNote.style.left = `${event.pageX - offsetX}px`;
        stickyNote.style.top = `${event.pageY - offsetY}px`;
    });
}

