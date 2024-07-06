document.addEventListener('DOMContentLoaded', function () {
    const daysElement = document.querySelector('.days');
    const taskModal = document.getElementById('taskModal');
    const closeModal = document.querySelector('.close');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const markAllCompleteBtn = document.getElementById('markAllCompleteBtn');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const monthYearElement = document.querySelector('.month h1');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const returnMainBtn = document.getElementById('returnMain');
    let selectedDayElement;
    let tasks = {};
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Close the modal
    closeModal.onclick = function() {
        taskModal.style.display = 'none';
    };

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === taskModal) {
            taskModal.style.display = 'none';
        }
    };

    // Add task to the selected day
    function addTask() {
        if (taskInput.value.trim() !== '') {
            addTaskToDay(selectedDayElement.dataset.day, taskInput.value);
            taskInput.value = '';
        }
    }

    addTaskBtn.onclick = addTask;

    // Add task by pressing Enter key
    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Populate calendar with days
    function updateCalendar() {
        daysElement.innerHTML = '';
        monthYearElement.innerText = `${getMonthName(currentMonth)} ${currentYear}`;

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Fill in the blank days at the start of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            daysElement.appendChild(emptyDay);
        }

        // Fill in the days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.innerText = i;
            day.dataset.day = `${currentYear}-${currentMonth + 1}-${i}`;
            day.onclick = function() {
                selectedDayElement = day;
                showTasks(day.dataset.day);
                taskModal.style.display = 'block';
            };
            daysElement.appendChild(day);
        }
    }

    // Function to show tasks for a selected day
    function showTasks(day) {
        taskList.innerHTML = '';
        if (tasks[day]) {
            tasks[day].forEach((task, index) => {
                const taskElement = createTaskElement(day, task.text, index, task.complete);
                taskList.appendChild(taskElement);
            });
        }
    }

    // Function to create a task element
    function createTaskElement(day, taskText, index, complete = false) {
        const task = document.createElement('div');
        task.className = 'task';
        if (complete) task.classList.add('complete');

        const taskContent = document.createElement('span');
        taskContent.innerText = taskText;
        task.appendChild(taskContent);

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete';
        completeBtn.innerText = 'Complete';
        completeBtn.onclick = function() {
            task.classList.toggle('complete');
            tasks[day][index].complete = !tasks[day][index].complete;
        };
        taskButtons.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.innerText = 'Delete';
        deleteBtn.onclick = function() {
            task.remove();
            tasks[day].splice(index, 1);
        };
        taskButtons.appendChild(deleteBtn);

        task.appendChild(taskButtons);
        return task;
    }

    // Function to add a task to a day
    function addTaskToDay(day, taskText) {
        if (!tasks[day]) tasks[day] = [];
        const task = { text: taskText, complete: false };
        tasks[day].push(task);
        showTasks(day);
    }

    // Function to mark all tasks complete for a day
    markAllCompleteBtn.onclick = function() {
        if (tasks[selectedDayElement.dataset.day]) {
            tasks[selectedDayElement.dataset.day].forEach(task => task.complete = true);
            showTasks(selectedDayElement.dataset.day);
        }
    };

    // Function to delete all tasks for a day
    deleteAllBtn.onclick = function() {
        if (tasks[selectedDayElement.dataset.day]) {
            tasks[selectedDayElement.dataset.day] = [];
            showTasks(selectedDayElement.dataset.day);
        }
    };

    // Function to update the calendar
    function updateCalendar() {
        daysElement.innerHTML = '';
        monthYearElement.innerText = `${getMonthName(currentMonth)} ${currentYear}`;

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Fill in the blank days at the start of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            daysElement.appendChild(emptyDay);
        }

        // Fill in the days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.innerText = i;
            day.dataset.day = `${currentYear}-${currentMonth + 1}-${i}`;
            day.onclick = function() {
                selectedDayElement = day;
                showTasks(day.dataset.day);
                taskModal.style.display = 'block';
            };
            daysElement.appendChild(day);
        }
    }

    function getMonthName(monthIndex) {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[monthIndex];
    }

    prevMonthBtn.onclick = function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar();
    };

    nextMonthBtn.onclick = function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar();
    };

    returnMainBtn.onclick = function() {
        window.location.href = 'main_page.html'; // Change this to the actual main page URL
    };

    updateCalendar();
});
