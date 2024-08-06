document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("simja");
    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");
    const checkListButton = document.querySelector("div button");
    const nameList = document.querySelector("ul");

    const serverUrl = "https://your-service-name.onrender.com"; // Render에서 제공한 URL 사용

    async function addStudent(name, number) {
        try {
            const response = await fetch(`${serverUrl}/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, number })
            });
            if (!response.ok) {
                const error = await response.json();
                alert(error.message);
                return;
            }
        } catch (error) {
            console.error("Error adding student:", error);
        }
    }

    async function fetchStudentList() {
        try {
            const response = await fetch(`${serverUrl}/students`);
            const students = await response.json();
            return students;
        } catch (error) {
            console.error("Error fetching student list:", error);
            return [];
        }
    }

    async function displayStudentList() {
        const students = await fetchStudentList();
        nameList.innerHTML = "";
        students.forEach(function(student) {
            const listItem = document.createElement("li");
            listItem.textContent = `${student.name} (${student.number})`;
            nameList.appendChild(listItem);
        });
    }

    checkListButton.addEventListener("click", function() {
        displayStudentList();
    });

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        const name = nameInput.value.trim();
        const number = numberInput.value.trim();

        if (name && number) {
            await addStudent(name, number);
            nameInput.value = "";
            numberInput.value = "";
            displayStudentList();
        } else {
            alert("이름과 학번을 모두 입력해주세요.");
        }
    });

    displayStudentList();
});
