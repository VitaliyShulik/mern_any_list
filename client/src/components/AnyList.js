import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, toggleIsCompleted, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import UpdateItemModal from './item/UpdateItemModal';

class AnyList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
    }

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    };

    onToggleIsCompletedClick = (id, name, isCompleted) => {
        this.props.toggleIsCompleted(id, name, isCompleted);
    }

    render() {
        const { items } = this.props.item;
       
        return(
            <Container>
                <ListGroup> 
                    <TransitionGroup className="any-list">
                        {items.map(({ _id, name, isCompleted }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem className="list-item">
                                    <div className="item">
                                        { this.props.isAuthenticated ? 
                                            <input 
                                                type="checkbox" 
                                                className="item-checkbox"
                                                checked={isCompleted}
                                                onChange={this.onToggleIsCompletedClick.bind(this, _id, name, isCompleted)}
                                            /> : null}
                                            <span 
                                                style={
                                                    isCompleted ? 
                                                    { textDecoration: 'line-through black' } : 
                                                    { textDecoration: 'none' }
                                                    }
                                            >{name}</span>
                                        { this.props.isAuthenticated ? <UpdateItemModal id={_id} name={name} isCompleted={isCompleted} /> : null }
                                    </div>
                                    { this.props.isAuthenticated ? 
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                        >
                                            &times;
                                        </Button> : null }
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    };
};

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps, 
    { getItems, toggleIsCompleted, deleteItem }
)(AnyList);
