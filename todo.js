document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const activeTaskList = document.getElementById('activeTaskList');
    const completedTaskList = document.getElementById('completedTaskList');

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskPriority = prioritySelect.value;
        
        if (taskText === '') {
            return;
        }

        const li = document.createElement('li');
        li.classList.add('task-item');
        
        // Add priority class for styling
        const prioritySpan = `<span class="priority ${taskPriority}">${taskPriority}</span>`;

        li.innerHTML = `
            <span>${taskText}</span>
            <div class="task-actions">
                ${prioritySpan}
                <button class="complete-btn">&#10003;</button>
                <button class="delete-btn">&#10005;</button>
            </div>
        `;
        
        // Append new task to the active list
        activeTaskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Add event listeners for new task
        li.querySelector('.complete-btn').addEventListener('click', () => {
            if (li.classList.contains('completed')) {
                li.classList.remove('completed');
                activeTaskList.appendChild(li); // Move back to active list
                li.querySelector('.complete-btn').textContent = '✔';
            } else {
                li.classList.add('completed');
                completedTaskList.appendChild(li); // Move to completed list
                li.querySelector('.complete-btn').textContent = '⟲'; // Change button text
            }
        });
        
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
        });
    }

    // Add task on button click
    addTaskBtn.addEventListener('click', addTask);

    // Add task on 'Enter' key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});