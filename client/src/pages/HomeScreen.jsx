import React from 'react';
import eSmartLogo from '../esmartbin.png';
import { BDiv, Row, Col, Button } from 'bootstrap-4-react';


console.log(eSmartLogo);
export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {

        return (
            <div>
                {/* <BottomTabNavigation /> */}
                <BDiv display="flex" justifyContent="center" mb="5">
                    <h7 style={{ paddingTop: 15 }} className='appSlogan'>One's man trash is another man's opportunity</h7>
                </BDiv>

                <BDiv display="flex" justifyContent="center" mb="5">
                    <h1 className='appHeader' style={{ fontWeight: 'bold' }}>eSmart</h1>
                </BDiv>

                <BDiv display="flex" justifyContent="center" mb="5">
                    <img src={eSmartLogo} width='200' justifyContent='center' />
                </BDiv>


                <Row className='text-center' >
                    <Col col="sm" mb='4' ><a href="/donor/home"><Button className='btn1' >Waste Donor</Button></a></Col>
                    <Col col="sm" mb='4'><a href="/collector/home"><Button className='btn1' >Waste Collector</Button></a></Col>
                    <Col col="sm" mb='4'><Button disabled className='btn1' >Waste depot</Button></Col>
                </Row>
            </div>
        );
    }
}