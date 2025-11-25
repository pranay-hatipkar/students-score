export function createStudentButtons() {
  var matrixBox = document.getElementById("matrixBox");
  var totalCells = 10;
  var studentCount = 10;
  var i;

  for (i = 1; i <= studentCount; i++) {
    var btn = document.createElement("button");
    btn.className = "student-btn";
    btn.setAttribute("data-student-id", String(i));
    btn.setAttribute("role", "button");
    btn.setAttribute("aria-label", "Open details for Student " + i);

    var label = document.createElement("span");
    label.className = "student-label";
    label.textContent = "Student " + i;

    btn.appendChild(label);
    matrixBox.appendChild(btn);
  }
}

export function renderStudentModal(student) {
  var modal = document.getElementById("modal");
  var modalContent = document.getElementById("modalContent");
  var closeBtn = document.getElementById("closeBtn");

  var title = student.name;
  var initial = student.name.split(" ").pop();
  modalContent.innerHTML = "";

  var avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = initial;

  var nameEl = document.createElement("div");
  nameEl.style.fontWeight = "700";
  nameEl.textContent = student.name;

  var idEl = document.createElement("div");
  idEl.style.color = "#6b7280";
  idEl.style.fontSize = "13px";
  idEl.textContent = "ID: " + student.id;

  var list = document.createElement("ul");
  list.className = "marks-list";

  var subjectNames = Object.keys(student.marks);
  var i;
  for (i = 0; i < subjectNames.length; i++) {
    var sub = subjectNames[i];
    var li = document.createElement("li");

    var left = document.createElement("span");
    left.textContent = sub;

    var right = document.createElement("span");
    right.textContent = String(student.marks[sub]);

    li.appendChild(left);
    li.appendChild(right);
    list.appendChild(li);
  }

  modalContent.appendChild(list);

  var sum = 0;
  for (i = 0; i < subjectNames.length; i++) {
    sum += student.marks[subjectNames[i]];
  }
  var avg = Math.round(sum / subjectNames.length);

  var avgEl = document.createElement("div");
  avgEl.style.marginTop = "12px";
  avgEl.style.fontWeight = "700";
  avgEl.textContent = "Average: " + avg + " / 100";

  modalContent.appendChild(avgEl);

  modal.classList.remove("hidden");
  closeBtn.focus();
}