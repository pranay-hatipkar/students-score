var studen_data = {
  1: { id:1, name: "Student 1", marks: { Math:82, English:74, Science:91, History:68, Geography:77 } },
  2: { id:2, name: "Student 2", marks: { Math:56, English:66, Science:59, History:72, Geography:61 } },
  3: { id:3, name: "Student 3", marks: { Math:92, English:88, Science:95, History:90, Geography:93 } },
  4: { id:4, name: "Student 4", marks: { Math:45, English:52, Science:48, History:39, Geography:44 } },
  5: { id:5, name: "Student 5", marks: { Math:76, English:71, Science:69, History:74, Geography:70 } },
  6: { id:6, name: "Student 6", marks: { Math:66, English:61, Science:64, History:58, Geography:62 } },
  7: { id:7, name: "Student 7", marks: { Math:88, English:82, Science:85, History:80, Geography:84 } },
  8: { id:8, name: "Student 8", marks: { Math:54, English:49, Science:58, History:50, Geography:52 } },
  9: { id:9, name: "Student 9", marks: { Math:99, English:96, Science:100, History:95, Geography:97 } },
  10:{ id:10,name: "Student 10",marks: { Math:71, English:69, Science:73, History:68, Geography:70 } }
};

function fetchStudentById(studentId) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      var data = studen_data[studentId];
      if (data) {
        resolve({
          status:200,
          data: data
        });
      } else {
        reject({
          status:404,
          error: "Student not found"
        });
      }
    }, 450);
  });
}

var matrixBox = document.getElementById("matrixBox");
var modal = document.getElementById("modal");
var modalContent = document.getElementById("modalContent");
var closeBtn = document.getElementById("closeBtn");

function createStudentButtons() {
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

  // var currentCount = matrixBox.children.length;
  // for (i = currentCount; i < totalCells; i++) {
  //   var sp = document.createElement("div");
  //   sp.className = "spacer";
  //   matrixBox.appendChild(sp);
  // }
}

function renderStudentModal(student) {
  var title = student.name;
  var initial = student.name.split(" ").pop();
  modalContent.innerHTML = "";

  // header meta
  // var meta = document.createElement("div");
  // meta.className = "student-meta";

  var avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = initial;

  // var metaText = document.createElement("div");
  var nameEl = document.createElement("div");
  nameEl.style.fontWeight = "700";
  nameEl.textContent = student.name;

  var idEl = document.createElement("div");
  idEl.style.color = "#6b7280";
  idEl.style.fontSize = "13px";
  idEl.textContent = "ID: " + student.id;

  // metaText.appendChild(nameEl);
  // metaText.appendChild(idEl);

  // meta.appendChild(avatar);
  // meta.appendChild(metaText);

  // modalContent.appendChild(meta);

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

function onMatrixClick(event) {
  var target = event.target;

  while (target && target !== matrixBox && !target.hasAttribute("data-student-id")) {
    target = target.parentElement;
  }
  if (!target || target === matrixBox) {
    return;
  }

  var idAttr = target.getAttribute("data-student-id");
  if (!idAttr) {
    return;
  }
  var studentId = parseInt(idAttr, 10);

  modalContent.innerHTML = "<div style='font-weight:700;margin:12px 0'>Loading student data...</div>";
  modal.classList.remove("hidden");

  fetchStudentById(studentId).then(function(response) {
    if (response && response.status === 200) {
      renderStudentModal(response.data);
    } else {
      modalContent.innerHTML = "<div style='color:#b91c1c'>Failed to load data</div>";
    }
  }).catch(function(err) {
    modalContent.innerHTML = "<div style='color:#b91c1c'>Error: " + (err && err.error ? err.error : "Unknown") + "</div>";
  });
}

function closeModal() {
  modal.classList.add("hidden");
  matrixBox.querySelector(".student-btn") && matrixBox.querySelector(".student-btn").focus();
}

function init() {
  createStudentButtons();
  matrixBox.addEventListener("click", onMatrixClick, false);

  closeBtn.addEventListener("click", function() {
    closeModal();
  }, false);

  modal.addEventListener("click", function(evt) {
    var panel = modal.querySelector(".modal-panel");
    if (!panel.contains(evt.target)) {
      closeModal();
    }
  }, false);

  document.addEventListener("keydown", function(ev) {
    if (ev.key === "Escape") {
      if (!modal.classList.contains("hidden")) {
        closeModal();
      }
    }
  }, false);
}

document.addEventListener("DOMContentLoaded", init, false);