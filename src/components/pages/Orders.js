import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createBill, deleteOrder, getDeliverers, getOrders } from '../../store/order-actions';
import { useNavigate } from 'react-router-dom';

const Orders = (props) => {

    let [placeOfDelivery, setPlaceOfDelivery] = useState("");
    let [delivererId, setDelivererId] = useState(-1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orders = useSelector(state => state.order.orders);
    const deliverers = useSelector(state => state.order.deliverers);
    const totalPages = useSelector(state => state.order.totalPages);
    const pageNo = useSelector(state => state.order.pageNo);
  
    useEffect(() => {
        dispatch(getOrders(0, -1, ""));
        dispatch(getDeliverers());
    }, [dispatch]);

    const renderTable = () => {
        return orders.map(order => {
            return(
                <tr key={order.id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.date}</td>
                    <td>{order.placeOfDelivery}</td>
                    <td>{order.price} $</td>
                    <td>{order.description}</td>
                    <td>{order.delivererFullName}</td>
                    <td>{prepareButtons(order)}</td>
                </tr>
            )
        })
    }

    const prepareButtons = (order) => {
        if(window.localStorage['role'] === 'ROLE_KORISNIK'){
            if(order.billId === null){    
                return <Button variant="success" onClick={() => designBill(order.id)}>Create Bill</Button>
            } else {
                return <Button variant="primary" onClick={() => navigate("/orders/bills/" + order.billId )}>See Bill</Button>
            }
        } else if (window.localStorage['role'] === 'ROLE_ADMIN'){
            return <Button variant="danger" onClick={() => deleteOrderButton(order.id)}>Delete</Button>
        }
    }

    const designBill = (id) => {
        dispatch(createBill(id));
    };

    let onDelivererChange = (e) => {
        dispatch(getOrders(0, e.target.value, placeOfDelivery));
        setDelivererId(e.target.value);
    }

    let onPlaceChange = (e) => {
        dispatch(getOrders(0, delivererId, e.target.value));
        setPlaceOfDelivery(e.target.value);
    }

    const renderSearch = () => {
        return(
            <Row>
                <Col md={6}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Deliverer</Form.Label>
                            <Form.Control
                                as="select"
                                name="delivererId"
                                onChange={(e) => onDelivererChange(e)}>
                                    <option value={-1}></option>
                                    {deliverers.map(d => {
                                        return(                 
                                            <option key={d.id} value={d.id}>{d.fullName}</option>
                                        )
                                    })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Place of Delivery</Form.Label>
                            <Form.Control
                                as="input"
                                type="text"
                                name="placeOfDelivery"
                                placeholder="Place of Delivery"
                                onChange={(e) => onPlaceChange(e)}>

                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        )
    }

    const deleteOrderButton = (id) => {
        dispatch(deleteOrder(id));
    }

    const newOrders = (newPageNo) => {
        dispatch(getOrders(newPageNo));
    }

    return (
        <div >
            <h1 style={{textAlign: 'center'}}>Orders</h1>

            {renderSearch()}

            <div style={{textAlign: 'right', marginTop: '20px'}}>
                {(window.localStorage['role'] === 'ROLE_ADMIN') && <Button style={{float: 'left'}} variant="success" onClick={() => navigate('/orders/create')}>Create Order</Button>}
                <Button disabled={pageNo === 0} variant="primary" onClick={() => newOrders(pageNo - 1)}>Prev</Button>
                <Button disabled={pageNo === totalPages - 1} variant="primary" onClick={() => newOrders(pageNo + 1)}>Next</Button>
            </div>

            <Table striped style={{marginTop: '5px'}}>
                <thead className="thead-dark">
                    <tr>
                        <th>Order number</th>
                        <th>Date</th>
                        <th>Place of Delivery</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Deliverer</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable()}
                </tbody>
            </Table>
        </div>
    );
}

export default Orders;