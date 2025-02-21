const tasks = [
    { id: 1, name: "Site Hygiene - Homepage, header, menu & footer", assignedTo: "ReEnable" },
    { id: 2, name: "Checking & publishing promos", assignedTo: "ReEnable" },
    { id: 3, name: "Generating URLs & Adding products to categories", assignedTo: "Bandile" },
    { id: 4, name: "Checking and activating URLs 2 days before go-live date", assignedTo: "Bandile" },
    { id: 5, name: "Site Hygiene - Brand Pages", assignedTo: "Bandile" },
    { id: 6, name: "Site Hygiene - All levels", assignedTo: "Tally" },
    { id: 7, name: "ISSUU(Linking, embedding on Magento)", assignedTo: "Tally" },
    { id: 8, name: "Page Builds(Generic)", assignedTo: "Tally" },
    { id: 9, name: "Google Shopping Tags", assignedTo: "Yale" },
    { id: 10, name: "Prepping scrollers(adding products from brief to categories)", assignedTo: "Tally" }
];

let currentWeek = 0;

function rotateTasks() {
    currentWeek++;
    const rotation = currentWeek % 4;
    tasks.forEach(task => {
        if (rotation === 0) {
            task.assignedTo = ["ReEnable", "Bandile", "Tally", "Yale"][Math.floor(Math.random() * 4)];
        } else if (rotation === 1) {
            task.assignedTo = ["Bandile", "Tally", "Yale", "ReEnable"][Math.floor(Math.random() * 4)];
        } else if (rotation === 2) {
            task.assignedTo = ["Tally", "Yale", "ReEnable", "Bandile"][Math.floor(Math.random() * 4)];
        } else {
            task.assignedTo = ["Yale", "ReEnable", "Bandile", "Tally"][Math.floor(Math.random() * 4)];
        }
    });
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.setAttribute('data-id', task.id);
        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>Assigned to: ${task.assignedTo}</p>
            <button onclick="completeTask(${task.id})">Complete</button>
            <div class="comment-section">
                <textarea id="comment-${task.id}" placeholder="Add a comment..."></textarea>
                <button onclick="addComment(${task.id})">Add Comment</button>
                <div id="comments-${task.id}"></div>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}

function completeTask(taskId) {
    const taskElement = document.querySelector(`#task-list div[data-id="${taskId}"]`);
    taskElement.classList.add('completed');
    taskElement.querySelector('button').textContent = 'Completed';
    taskElement.querySelector('button').disabled = true;
}

function addComment(taskId) {
    const commentText = document.getElementById(`comment-${taskId}`).value;
    if (commentText) {
        const commentsElement = document.getElementById(`comments-${taskId}`);
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.textContent = commentText;
        commentsElement.appendChild(commentElement);
        document.getElementById(`comment-${taskId}`).value = '';
    }
}

setInterval(() => {
    const incompleteTasks = tasks.filter(task => !document.querySelector(`#task-list div[data-id="${task.id}"]`).classList.contains('completed'));
    incompleteTasks.forEach(task => {
        alert(`Reminder: ${task.name} is still incomplete.`);
    });
}, 2 * 60 * 60 * 1000); // Every 2 hours

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    setInterval(rotateTasks, 7 * 24 * 60 * 60 * 1000); // Rotate tasks every week
});