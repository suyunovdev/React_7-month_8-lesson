import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap"; // React Bootstrap komponentlari import qilingan
import {
  setStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../redux/studentSlice";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap stilini import qilish

const Students = () => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);

  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formValues, setFormValues] = useState({ name: "", email: "" });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        dispatch(setStudents(response.data));
        toast.success("Students loaded successfully");
      })
      .catch(error => {
        console.error("Error fetching students:", error);
        toast.error("Failed to load students");
      });
  }, [dispatch]);

  const handleShowModal = (student = null) => {
    setEditingStudent(student);
    setFormValues(
      student
        ? {
            name: student.name,
            email: student.email,
            username: student.username,
          }
        : { name: "", email: "" }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };

  const handleDelete = id => {
    dispatch(deleteStudent(id));
    toast.success("Student deleted successfully");
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (editingStudent) {
      dispatch(updateStudent({ id: editingStudent.id, data: formValues }));
      toast.success("Student updated successfully");
    } else {
      const newStudent = { id: students.length + 1, ...formValues };
      dispatch(addStudent(newStudent));
      toast.success("Student added successfully");
    }
    handleCloseModal();
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h1>Student List</h1>
      <Button variant="primary" onClick={() => handleShowModal()}>
        Add Student
      </Button>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.username}</td>
              <td>{student.email}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowModal(student)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(student.id)}
                  style={{ marginLeft: 8 }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingStudent ? "Edit Student" : "Add Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formusername">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {editingStudent ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Students;
