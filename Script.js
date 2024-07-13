const plusButton = document.getElementById("addButton");
let count = 0;
const toggle = document.getElementById("toggle");

// Refresh localStorage
const refresh = document.getElementById("refresh");
refresh.addEventListener("click", function () {
    localStorage.removeItem("data");
    location.reload();
    count = 0;
});

// Mode switching: dark to light or light to dark
toggle.addEventListener('change', function (event) {
    const index = event.target;
    if (index.checked) {
        document.getElementById('AllInOne').style.backgroundColor = '#FFFFFF';
        document.getElementsByClassName('input-container')[0].style.backgroundColor = '#F0F3F5';
        document.getElementById('inputText').style.backgroundColor = '#F0F3F5';
        const temp = document.getElementsByClassName('tr1');
        Array.from(temp).forEach((cur) => {
            cur.style.backgroundColor = '#F0F3F5';
        });
    } else {
        document.getElementById('AllInOne').style.backgroundColor = '#373f68';
        document.getElementsByClassName('input-container')[0].style.backgroundColor = '#1d244b';
        document.getElementById('inputText').style.backgroundColor = '#1d244b';
        const temp = document.getElementsByClassName('tr1');
        Array.from(temp).forEach((cur) => {
            cur.style.backgroundColor = '#454e70';
        });
    }
});

// Handle task completion
function checkHandler(event) {
    event.target.disabled = true;
    let index = event.target.id;
    const tr = document.getElementById("a" + index);
    const table = document.getElementById("table2").getElementsByTagName("tbody")[0];
    table.appendChild(tr);

    const task = document.getElementById("task" + index);
    const text = task.innerText;
    task.innerHTML = `<s>${text}</s>`;
    coData.push(text);
    saveData();
}

// Adding new tasks
plusButton.addEventListener("click", function () {
    const input = document.getElementById("inputText");
    const table = document.getElementById("table1").getElementsByTagName("tbody")[0];
    const tr = document.createElement("tr");
    const data = new Date();
    let text = input.value;
    if (!text) {
        alert('Enter something in inputBox');
    } else {
        input.value = '';
        doData.push(text);
        tr.setAttribute("id", "a" + count);
        tr.setAttribute("class", "tr1");
        tr.innerHTML = `
            <td><input type="checkbox" class="box" id=${count}></td>
            <td id="task${count}" class="sort">${text}</td>
            <td>${data.toLocaleTimeString()}</td>
        `;
        table.appendChild(tr);
        count++;
    }

    // Get all checkbox elements
    const checkboxes = document.querySelectorAll('.box');

    // Attach the change event listener to each checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkHandler);
    });

    saveData();
});

// Save data to localStorage
function saveData() {
    const table1 = document.getElementById("table1").getElementsByTagName("tbody")[0].innerHTML;
    const table2 = document.getElementById("table2").getElementsByTagName("tbody")[0].innerHTML;
    const data = {
        table1: table1,
        table2: table2,
        count: count,
        doData: doData,
        coData: coData
    };
    localStorage.setItem("data", JSON.stringify(data));
}

// Load data from localStorage
function showData() {
    const savedData = JSON.parse(localStorage.getItem("data"));
    if (savedData) {
        document.getElementById("table1").getElementsByTagName("tbody")[0].innerHTML = savedData.table1;
        document.getElementById("table2").getElementsByTagName("tbody")[0].innerHTML = savedData.table2;
        count = savedData.count;
        doData = savedData.doData;
        coData = savedData.coData;

        // Re-attach event listeners to checkboxes
        const checkboxes = document.querySelectorAll('.box');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', checkHandler);
        });
    }
}

showData();
