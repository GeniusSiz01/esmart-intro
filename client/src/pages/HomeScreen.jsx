import React from 'react';
import eSmartLogo from '../esmartbin.png';
import { BDiv, Row, Col, Button } from 'bootstrap-4-react';
import logo from '../logo.svg';

console.log(eSmartLogo);
export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const boxStyle = {
            backgroundColor: '#52B788',
            border: '1px solid rgba(86,61,124,.15)'
        }
        return (
            <div>
                <BDiv display="flex" justifyContent="center" mb="3">
                    <h7>One's man trash is another man's opportunity</h7>
                </BDiv>

                <BDiv display="flex" justifyContent="center" mb="3">
                    <h1>eSmart</h1>
                </BDiv>

                <BDiv display="flex" justifyContent="center" mb="3">
                    <img src={eSmartLogo} width='200' justifyContent='center' />
                </BDiv>


                <Row className='text-center' >
                    <Col col="sm"><Button className='btn1' >Waste Donor</Button></Col>
                    <Col col="sm"><Button className='btn1' >Waste Collector</Button></Col>
                    <Col col="sm"><Button className='btn1' >Waste depot</Button></Col>
                </Row>
            </div>
        );
    }
}