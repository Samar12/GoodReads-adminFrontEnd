import React from "react";
import { Table, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { MyContext } from "./../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import uuidv4 from "uuid";

export class AuthorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addAuthorModal: false,
      editAuthorModal: false,
      editableName: "",
      newName: "",
      EditableAuthorId: "",
      name: "",
      DOB: "",
      photo: "https://www.pexels.com/photo/women-s-white-and-black-button-up-collared-shirt-774909/",
      error: "",
      editableAuthor: {}
    };
  }
  closeEditModal = () => {
    this.setState({ editAuthorModal: false });
  };

  showEditModal = value => e => {
    this.setState({ editAuthorModal: true });
  };

  handleEditChange = e => {
    const value = e.target.value;

    this.setState({ name: value, error: "" });

    this.setState({
      editableAuthor: {
        Photo: this.Photo,
        name: this.state.name,
        DOB: this.DOB
      }
    });
  };

  submitAuthorEdit = (id, value) => e => {
    value.editAuthor(id, this.state.name);
    this.setState({ editAuthorModal: false });
  };

  showAddModal = () => {
    this.setState({ addAuthorModal: true });
  };

  closeAddModal = () => {
    this.setState({ addAuthorModal: false });
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ newName: value });
  };

  AddNewAuthor = value => e => {
    if (this.name.value == "" || this.DOB.value == "" || this.photo.value == "") {
      this.setState({ error: "You Must Fill all Inputs", addAuthorModal: true });
    } else {
      const NewAuthor = {
        id: uuidv4,
        photo: this.photo.value,
        name: this.name.value,
        DOB: this.DOB.value
      };

      value.addAuthor(NewAuthor);
      this.setState({ addAuthorModal: false });
    }
  };

  DeleteAuthor = (value, id) => e => {
    value.deleteAuthor(id);
  };

  render() {
    return (
      <MyContext.Consumer>
        {value => (
          <>
            <Col>
              <Row className="d-flex justify-content-center mt-5">
                <Col md="8" className="d-flex justify-content-center mt-5">
                  <Table striped bordered hover className="table">
                    <thead>
                      <tr>
                        <td>ID </td>
                        <td> Photo </td>
                        <td> Name</td>
                        <td>DOB </td>
                        <td>Action </td>
                      </tr>
                    </thead>
                    <tbody>
                      {value.state.Authors.body.map(author => (
                        <tr key={author.id}>
                          <td>{author.id}</td>
                          <td>{author.photo}</td>
                          <td>{author.name}</td>
                          <td>{author.DOB}</td>
                          <td>
                            <>
                              <FontAwesomeIcon className="edit-icon" icon={faEdit} onClick={this.showEditModal(author)} />
                              <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={this.DeleteAuthor(value, author.id)} />
                            </>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md="1">
                  <FontAwesomeIcon className="add-icon" icon={faPlus} onClick={this.showAddModal} />
                </Col>
              </Row>
            </Col>

            <Modal show={this.state.addAuthorModal} onHide={this.closeAddModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group as={Col} controlId="formBasicbook">
                    <h3>{this.state.error}</h3>
                    <Form.Control ref={element => (this.name = element)} type="text" placeholder="Enter Name..." />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formBasicbook">
                    <Form.Control ref={element => (this.DOB = element)} type="date" />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control type="file" ref={element => (this.photo = element)} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeAddModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.AddNewAuthor(value)}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={this.state.editAuthorModal} onHide={this.closeEditModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Edit Author</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group as={Col} controlId="formBasicbook">
                    <Form.Control onChange={this.handleEditChange} data-id="name" value={this.state.name} type="text" placeholder={this.state.editableName} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formBasicbook">
                    <Form.Control ref={a => (this.DOB = a)} type="date" />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control type="file" ref={a => (this.Photo = a)} />
                  </Form.Group>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeEditModal}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={this.submitAuthorEdit(this.state.EditableAuthorId, value)}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}
