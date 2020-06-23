import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { updateItem } from '../../actions/itemActions';
import PencilAltIcon from '../heroicons/PencilAlt.jsx';

class UpdateItemModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            id: this.props.id,
            name: this.props.name,
            isCompleted: this.props.isCompleted
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChangeName = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeIsCompleted = e => {
        this.setState({ [e.target.name]: e.target.checked });
    };

    onSubmit = e => {
        e.preventDefault();

        // const updatedItem = {
        //     id: this.state.id,
        //     name: this.state.name,
        //     isCompleted: this.state.isCompleted
        // }

        // Add item via addItem action
        // this.props.updateItem(updatedItem);

        // Close modal
        this.toggle();
    }

    render(){
        return(
            <span>
                {this.props.isAuthenticated ? <PencilAltIcon onClick={this.toggle} /> : null}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                ></Input>
                                <input 
                                    type="checkbox" 
                                    className="item-checkbox"
                                    style={{marginTop: '1rem'}}
                                    name="isCompleted"
                                    checked={this.state.isCompleted}
                                    value={this.state.isCompleted}
                                    onChange={this.onChangeIsCompleted}
                                />
                                <label for="isCompleted">Completed</label>
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Edit</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </span>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {  })(UpdateItemModal);