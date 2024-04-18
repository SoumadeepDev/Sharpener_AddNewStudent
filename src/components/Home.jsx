import { useContext, useState } from "react";
import { StudentContext } from "../StudentContext";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const { students, addStudent, deleteStudent, editStudent, totalStudents } =
    useContext(StudentContext);

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setEditId("");
    resetForm();
  };

  const handleShow = () => setShowModal(true);

  const handleAddStudent = () => {
    if (editMode) {
      const updatedStudent = {
        id: editId,
        name,
        mobile,
        address,
      };
      editStudent(updatedStudent);
    } else {
      const newStudent = {
        id: Math.random().toString(),
        name,
        mobile,
        address,
      };
      addStudent(newStudent);
    }
    handleClose();
  };

  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    if (studentToEdit) {
      setEditMode(true);
      setEditId(studentToEdit.id);
      setName(studentToEdit.name);
      setMobile(studentToEdit.mobile);
      setAddress(studentToEdit.address);
      handleShow();
    }
  };
  const resetForm = () => {
    setName("");
    setMobile("");
    setAddress("");
  };

  return (
    <div className="container">
      <h1>Student Management</h1>
      <p>Total Students: {totalStudents}</p>
      <button onClick={handleShow} className="addbtn">
        Add New Student
      </button>
      {students.map((student) => (
        <div className="student-card" key={student.id}>
          <p>Name: {student.name}</p>
          <p>Mobile: {student.mobile}</p>
          <p>Address: {student.address}</p>
          <button onClick={() => handleEdit(student.id)}>Edit</button>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
        </div>
      ))}
      <div className={`modal ${showModal ? "active" : ""}`}>
        <div className="modal-content">
          <h2>{editMode ? "Edit Student" : "Add New Student"}</h2>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </form>
          <button className="btn" onClick={handleAddStudent}>
            {editMode ? "Save Changes" : "Add"}
          </button>
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
