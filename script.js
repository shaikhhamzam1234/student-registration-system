let students = [];

function calculateGrade(marks) {
    if (marks >= 90) return "A";
    else if (marks >= 75) return "B";
    else if (marks >= 50) return "C";
    else return "Fail";
}

$("#name, #email, #marks").keyup(function () {
    let valid = true;

    if ($("#name").val() === "") {
        $("#nameError").text("Name required");
        valid = false;
    } else {
        $("#nameError").text("");
    }

    if ($("#email").val() === "" || !$("#email").val().includes("@")) {
        $("#emailError").text("Valid email required");
        valid = false;
    } else {
        $("#emailError").text("");
    }

    let marks = $("#marks").val();
    if (marks === "" || marks < 0 || marks > 100) {
        $("#marksError").text("Marks must be 0-100");
        valid = false;
    } else {
        $("#marksError").text("");
    }

    $("#submitBtn").prop("disabled", !valid);
});

$("#studentForm").submit(function (e) {
    e.preventDefault();

    let name = $("#name").val();
    let email = $("#email").val();
    let marks = parseInt($("#marks").val());
    let grade = calculateGrade(marks);

    let index = $("#editIndex").val();

    let student = {
        name: name,
        email: email,
        marks: marks,
        grade: grade
    };

    if (index === "") {
        students.push(student);
    } else {
        students[index] = student;
    }

    displayStudents();

    $("#successMsg").hide().text("Saved Successfully!").fadeIn();

    $("#studentForm")[0].reset();
    $("#editIndex").val("");
    $("#submitBtn").prop("disabled", true);
});

function displayStudents() {
    let output = "";

    students.forEach(function (s, index) {
        output += `
        <tr>
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td>${s.marks}</td>
            <td>${s.grade}</td>
            <td>
                <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
                <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
    });

    $("#studentTable").html(output);
}

function editStudent(index) {
    let s = students[index];

    $("#name").val(s.name);
    $("#email").val(s.email);
    $("#marks").val(s.marks);
    $("#editIndex").val(index);

    $("#submitBtn").prop("disabled", false);
}

function deleteStudent(index) {
    if (confirm("Delete this student?")) {
        students.splice(index, 1);
        displayStudents();
    }
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.text("Student Report", 20, 10);

    let y = 20;

    students.forEach((s, i) => {
        doc.text(
            `${i + 1}. ${s.name} | ${s.email} | ${s.marks} | ${s.grade}`,
            10,
            y
        );
        y += 10;
    });

    doc.save("students.pdf");
          }
