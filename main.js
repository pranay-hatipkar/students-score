import { fetchStudentById } from "./data.js";
import { createStudentButtons, renderStudentModal } from "./ui.js";

var matrixBox = document.getElementById("matrixBox");
var modal = document.getElementById("modal");
var modalContent = document.getElementById("modalContent");
var closeBtn = document.getElementById("closeBtn");

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

  fetchStudentById(studentId)
    .then(function(response) {
      if (response && response.status === 200) {
        renderStudentModal(response.data);
      } else {
        modalContent.innerHTML = "<div style='color:#b91c1c'>Failed to load data</div>";
      }
    })
    .catch(function(err) {
      modalContent.innerHTML = "<div style='color:#b91c1c'>Error: " + (err && err.error ? err.error : "Unknown") + "</div>";
    });
}

function closeModal() {
  modal.classList.add("hidden");
  matrixBox.querySelector(".student-btn") &&
    matrixBox.querySelector(".student-btn").focus();
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