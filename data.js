export var studen_data = {
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

export function fetchStudentById(studentId) {
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