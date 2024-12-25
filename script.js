
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const pageInfo = document.getElementById("page-info");
const todoApp = document.getElementsByClassName("todo-app")
let pages = []; // Array to store tasks for each page
let currentPage = 0; // Tracks the current page

function addTask() {
    if (inputBox.value === "") {
        alert("Please write something before adding a task!");
    } else {
        const li = document.createElement("li");
        li.textContent = inputBox.value;
        const span = document.createElement("span");
        span.textContent = "\u00d7"; // Close button
        span.onclick = function () {
            li.remove();
            saveData();
        };


        li.appendChild(span);
        listContainer.appendChild(li);
        li.onclick = function () {
            li.classList.toggle("checked");
            saveData();
        };

        inputBox.value = "";
        saveData();
    }
}

function saveData() {
    pages[currentPage] = listContainer.innerHTML; // Save the current page tasks
    localStorage.setItem("pages", JSON.stringify(pages)); // Save all pages to localStorage
    localStorage.setItem("currentPage", currentPage); // Save the current page index
    updatePageInfo();
}

function showTask() {
    const savedPages = localStorage.getItem("pages");
    const savedPageIndex = localStorage.getItem("currentPage");

    if (savedPages) {
        pages = JSON.parse(savedPages);
        currentPage = parseInt(savedPageIndex, 10) || 0;
        listContainer.innerHTML = pages[currentPage] || ""; // Show tasks for the current page
    } else {
        pages = [""];
    }
    updatePageInfo();
}

function addNewPage() {
    pages.push(""); // Create a new empty page
    currentPage = pages.length - 1; // Switch to the new page
    listContainer.innerHTML = ""; // Clear the task list display
    saveData();
}

function cutPage() {
    if (pages.length > 1) {
        pages.splice(currentPage, 1); // Remove the current page
        currentPage = Math.max(0, currentPage - 1); // Go to the previous page if available
        listContainer.innerHTML = pages[currentPage] || ""; // Load tasks for the new current page
        saveData();
    } else {
        alert("You cannot delete the last remaining page!");
    }
}

function goBack() {
    if (currentPage > 0) {
        currentPage -= 1; // Go to the previous page
        listContainer.innerHTML = pages[currentPage] || ""; // Load tasks for the previous page
        saveData();
    } else {
        alert("You're already on the first page!");
    }
}

function previousPage() {
    if (currentPage > 0) {
        saveData(); // Save the current page data before navigating
        currentPage -= 1;
        listContainer.innerHTML = pages[currentPage] || ""; // Show the tasks for the previous page
        updatePageInfo();
    } else {
        alert("No previous pages available!");
    }
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        saveData(); // Save the current page data before navigating
        currentPage += 1;
        listContainer.innerHTML = pages[currentPage] || ""; // Show the tasks for the next page
        updatePageInfo();
    } else {
        alert("No more pages available!");
    }
}


function updatePageInfo() {
    pageInfo.textContent = `PAGE ${currentPage + 1} of ${pages.length}`; // Update page info
}

// Initialize the to-do list on page load
showTask();

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        e.style.color="red"
        saveData();
    }
});
