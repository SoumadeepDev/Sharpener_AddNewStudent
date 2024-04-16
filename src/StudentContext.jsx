import React, { createContext, useState, useEffect } from "react";

export const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    setTotalStudents(students.length); // Update totalStudents whenever students array changes
  }, [students]);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };
  const editStudent = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        deleteStudent,
        editStudent,
        totalStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
