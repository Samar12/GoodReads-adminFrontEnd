
import React from 'react';
import { thead, tr, Table, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { MyContext } from '../../../App'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const uuidv1 = require('uuid/v1');


export class BooksListing extends React.Component {
    constructor(props) {
        super(props);

        this.OpenAddPopUp = this.OpenAddPopUp.bind(this);
        this.ColseAddPopUp = this.ColseAddPopUp.bind(this);
        this.Typing = this.Typing.bind(this);
        this.TypingEditCategory = this.TypingEditCategory.bind(this);
        this.ColseEditPopUp = this.ColseEditPopUp.bind(this);

        this.state = {
            Search:'',
            BookName: '',
            CategoryId: '',
            AuthorId: '',
            imageUrl: '',
            Description:'',

            NewCategoryPopSHow: false,
            EditPopShow: false,
            EditedBookValues: []
        }

    }
    ColseEditPopUp() {
        this.setState({ EditPopShow: false });
    }

    OpenEditPopUp = (value) => (e) => {
        this.setState({ EditPopShow: true, EditedBookValues: value });
    }

    TypingEditCategory(e) {
        
        const value = e.target.value;
        this.setState({ EditedCategoryName: value });
    }

    SaveEdit = (inputvalue, id) => (e) => {
        inputvalue.EditCategory(id, this.state.EditedCategoryName)
        this.setState({ EditPopShow: false })
    }

    OpenAddPopUp() {
        this.setState({ NewCategoryPopSHow: true });
    }

    ColseAddPopUp() {
        this.setState({ NewCategoryPopSHow: false });
    }

    Typing(e) {
        const name = e.target.name;
        const value = e.target.value;

        console.log(value, name)

        this.setState({ [name]: value });
        // const value = e.target.value;
        // this.setState({ addnewCategoryName: value });
    }

    AddNewBook = (inputvalue) => (e) => {
        const BookName = this.state.BookName;
        if (!BookName) return;
        const Book = {
            ID: uuidv1(), photo: this.state.imageUrl, Name: BookName, CategoryId: this.state.CategoryId, AuthorId: this.state.AuthorId, deleted: false
        };
        console.log(Book)
        inputvalue.AddNewBook(Book)
        this.setState({
            NewCategoryPopSHow: false, BookName: '',
            CategoryId: '',
            AuthorId: '',
            imageUrl: '',
            Description:''
        })
    }

    DeleteBook = (inputvalue, id) => (e) => {
        inputvalue.DeleteBook(id)
    }


    render() {
        return (
            <MyContext.Consumer>
                {
                    value => (
                        <React.Fragment>

                            <Container>
                                <Row>
                                <Col md={9}>  <Form.Control className="Search" type="text" placeholder="Search Book" name="Search" onChange={this.Typing}/></Col>

                                    <Col md={3}><Button className="AddNewCategory" variant="primary" onClick={this.OpenAddPopUp}>Add New Book</Button></Col>
                                </Row>
                            </Container>


                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            {value.state.Books.th.map((p, i) => (<td key={uuidv1()}> {p}   </td>))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {value.state.Books.tbody.filter(c => (!(c.deleted)&&(c.Name).includes(this.state.Search))).map(z =>

                                            <tr key={uuidv1()} >

                                                <td key={uuidv1()}>{z.ID}</td>
                                                <td key={uuidv1()}><img className="BookPhoto" src={z.photo} alt={z.photo} /></td>
                                                <td key={uuidv1()}>{z.Name}</td>
                                                <td key={uuidv1()}>{z.CategoryId}</td>
                                                <td key={uuidv1()}>{z.AuthorId}</td>

                                                <td>
                                                    <>
                                                        <FontAwesomeIcon className="EditIcon" icon={faEdit} onClick={this.OpenEditPopUp(z)} />
                                                        <FontAwesomeIcon className="DeleteIcon" icon={faTrash} onClick={this.DeleteBook(value, z.ID)} />
                                                    </>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>

                            </Container>
                            {/* -------------------------------------new Book---------------------------------------------------- */}
                            <Modal show={this.state.NewCategoryPopSHow} onHide={this.ColseAddPopUp}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridAddress1" >
                                                <Form.Label >Book Name</Form.Label>

                                                <Form.Control value={this.state.BookName} onChange={this.Typing} name="BookName" />

                                                <Form.Label > Category Name</Form.Label>

                                                <Form.Control as="select" name="CategoryId" value={this.state.CategoryId} onChange={this.Typing} >
                                                    <option disabled>Choose...</option>
                                                    {value.state.Categories.tbody.filter(c => (!(c.deleted))).map(z =>
                                                        <option key={uuidv1()} value={z.Name} >{z.Name}</option>)}
                                                </Form.Control>

                                                <Form.Label > Author Name</Form.Label>

                                                <Form.Control as="select" name="AuthorId" value={this.state.AuthorId} onChange={this.Typing} >
                                                    <option disabled>Choose...</option>
                                                    {value.state.Authors.tbody.filter(c => (!(c.deleted))).map(z =>
                                                        <option key={uuidv1()} value={z.FirstName} >{z.FirstName}</option>)}
                                                </Form.Control>

                                                <Form.Label >Image Url</Form.Label>

                                                <Form.Control value={this.state.imageUrl} onChange={this.Typing} name="imageUrl" />
                                                    
                                                    
                                                <Form.Label >Book Description</Form.Label>

                                                <Form.Control value={this.state.Description} onChange={this.Typing} name="Description" />

                                            </Form.Group>
                                        </Form.Row>



                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.ColseAddPopUp}>
                                        Close
            </Button>
                                    <Button variant="primary" onClick={this.AddNewBook(value)}>
                                        Add
            </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* -------------------------------------------Edit---------------------------------------------------- */}

                            <Modal show={this.state.EditPopShow} onHide={this.ColseEditPopUp}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridAddress1" >
             
                                                <Form.Label >Book Name</Form.Label>

                                                <Form.Control placeholder={this.state.EditedBookValues.Name} value={this.state.EditedBookValues.BookName}onChange={this.Typing} name="BookName" />
                                                <Form.Label >Category Name</Form.Label>
                                                
                                                <Form.Control as="select" name="CategoryId"  value={this.state.EditedBookValues.CategoryId}  onChange={this.Typing} >
                                                    <option  >Choose...</option>
                                                    {value.state.Categories.tbody.filter(c => (!(c.deleted))).map(z =>
                                                        <option key={uuidv1()} value={z.Name} >{z.Name}</option>)}
                                                </Form.Control>

                                                    <Form.Label > Author Name</Form.Label>
                                                <Form.Control as="select" name="CategoryId"  value={this.state.EditedBookValues.AuthorId}  onChange={this.Typing} >
                                                    <option  >Choose...</option>
                                                    {value.state.Authors.tbody.filter(c => (!(c.deleted))).map(z =>
                                                        <option key={uuidv1()} value={z.FirstName} >{z.FirstName}</option>)}
                                                </Form.Control>



                                                {/* <Form.Control placeholder={this.state.EditedBookValues.AuthorName} onChange={this.Typing} name="AuthorName" /> */}
                                                <Form.Label >Image Url</Form.Label>

                                                <Form.Control placeholder={this.state.EditedBookValues.photo} onChange={this.Typing} name="imageUrl" />

                                            </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.ColseEditPopUp}>
                                        Close
                </Button>
                                    <Button variant="primary" onClick={this.SaveEdit(value, this.state.EditedBookValues.ID)}>
                                        Save Changes
            </Button>
                                </Modal.Footer>
                            </Modal>

                        </React.Fragment>
                    )
                }
            </MyContext.Consumer>
        );
    }
}
