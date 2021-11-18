import React, { useState } from 'react';
import {Form, Button, Row, Col, FormGroup} from 'react-bootstrap';

import {login} from '../../services/auth';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onInputChanged = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        if(name === 'username'){
            setUsername(value);
        }
        if(name === 'password'){
            setPassword(value);
        }
    }

    return (
        <div>
            <h3 style={{textAlign: 'center', marginTop: "45px"}}>Please, Login!</h3>

            <Row className="justify-content-center">
                <Col md={6}>
                    <Form>
                        <FormGroup>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                value={username}
                                as="input"
                                type="text"
                                name="username"
                                onChange={(e) => {onInputChanged(e)}}>
                            </Form.Control>
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                value={password}
                                as="input"
                                type="password"
                                name="password"
                                onChange={(e) => {onInputChanged(e)}}>
                            </Form.Control>
                        </FormGroup>
                        <Button style={{position: 'absolute', marginTop: '20px'}} variant="success" onClick={() => login(username, password)}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Login;