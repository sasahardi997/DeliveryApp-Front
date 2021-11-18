import React, { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createOrder } from '../../store/order-actions';

function CreateOrder(props) {

    const [searchParams, setSearchParams] = useState({
        orderNumber: "",
        date: "",
        placeOfDelivery: "",
        price: "",
        description: "",
        deliveryId : -1
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deliverers = useSelector(state => state.order.deliverers);

    const onInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        let newSearchParams = {...searchParams};
        newSearchParams[name] = value;
        setSearchParams(newSearchParams);

    }

    const inputValid = () => {
        if(searchParams.orderNumber !== "" && searchParams.date !== "" && searchParams.placeOfDelivery !== "" &&
            searchParams.price !== "" && searchParams.description !== "" && searchParams.deliveryId !== -1){
                return true;
            } else{
                alert("All fields must be filled!");
            }
    }

    const create = () => {
        if(inputValid()){    
            dispatch(createOrder(searchParams));
            navigate("/orders")
        }
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Create Order</h1>
            <Row>
                <Col md={8}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Order number</Form.Label>
                            <Form.Control
                                as="input"
                                type="text"
                                placeholder="Order number"
                                name="orderNumber"
                                onChange={(e) => onInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                as="input"
                                type="date"
                                name="date"
                                onChange={(e) => onInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Place of Delivery</Form.Label>
                            <Form.Control
                                as="input"
                                type="text"
                                placeholder="Place of Delivery"
                                name="placeOfDelivery"
                                onChange={(e) => onInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                as="input"
                                type="text"
                                placeholder="Price"
                                name="price"
                                onChange={(e) => onInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="input"
                                type="text"
                                placeholder="Description"
                                name="description"
                                onChange={(e) => onInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Deliverer</Form.Label>
                            <Form.Control
                                as="select"
                                name="deliveryId"
                                onChange={(e) => onInputChange(e)}>
                                    <option value={-1}></option>
                                    {deliverers.map(d => {
                                        return(                 
                                            <option key={d.id} value={d.id}>{d.fullName}</option>
                                        )
                                    })}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button style={{marginTop: '20px'}} variant="primary" onClick={() => create()}>Create</Button>
                </Col>
            </Row>
        </div>
    );
}

export default CreateOrder;