document.addEventListener('DOMContentLoaded', function() {
    const addEventBtn = document.getElementById('addEventBtn');
    const eventModal = document.getElementById('eventModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const eventForm = document.getElementById('eventForm');
    const eventList = document.getElementById('eventList');
    const modalTitle = document.getElementById('modalTitle');

    let currentEventItem = null;

    // Open the modal to add an event
    addEventBtn.onclick = function() {
        openModal();
    };

    // Close the modal
    closeModal.onclick = function() {
        closeModalForm();
    };

    // Close the modal if the user clicks outside of it
    window.onclick = function(event) {
        if (event.target == eventModal) {
            closeModalForm();
        }
    };

    // Handle form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;

        if (eventName && eventDate) {
            if (currentEventItem) {
                updateEvent(currentEventItem, eventName, eventDate);
            } else {
                addEvent(eventName, eventDate);
            }
            closeModalForm();
        }
    });

    // Function to open the modal
    function openModal(eventItem = null) {
        currentEventItem = eventItem;
        if (eventItem) {
            modalTitle.textContent = 'Edit Event';
            document.getElementById('eventName').value = eventItem.querySelector('.event-name').textContent;
            document.getElementById('eventDate').value = eventItem.querySelector('.event-date').textContent;
        } else {
            modalTitle.textContent = 'Add Event';
            eventForm.reset();
        }
        eventModal.style.display = 'block';
    }

    // Function to close the modal and reset the form
    function closeModalForm() {
        eventModal.style.display = 'none';
        eventForm.reset();
        currentEventItem = null;
    }

    // Function to add an event to the list
    function addEvent(name, date) {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
            <span class="event-name">${name}</span> - <span class="event-date">${date}</span>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;
        eventList.appendChild(eventItem);

        // Handle edit event
        eventItem.querySelector('.editBtn').addEventListener('click', function() {
            openModal(eventItem);
        });

        // Handle delete event
        eventItem.querySelector('.deleteBtn').addEventListener('click', function() {
            eventList.removeChild(eventItem);
        });
    }

    // Function to update an existing event
    function updateEvent(eventItem, name, date) {
        eventItem.querySelector('.event-name').textContent = name;
        eventItem.querySelector('.event-date').textContent = date;
    }
});