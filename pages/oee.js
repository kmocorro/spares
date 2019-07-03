
import React, { useState } from 'react';
import Layout from '../components/Layout';

import { Container, Row, Col, Media, ListGroup, ListGroupItem, Badge, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';

import fetch from 'isomorphic-unfetch';

const OEE = props => {

    // find unique process, ww, 
    const unique_process = ['All', ...new Set(props.data.oee.map(data => data.Process))];
    const unique_YR = [...new Set(props.data.oee.map(data => data.Year))];
    const unique_WW = [...new Set(props.data.oee.map(data => data.WW))];

    const filter = useFilter(null); 

    function useFilter(init){
        const [value, setValue] = useState(init);

        function handleOnChange(e){
            const selected_filter = e.target.id;
            setValue(selected_filter);
            
        }
        
        return {
            value,
            onChange: handleOnChange
        }
    }

    return (
        <Layout>
        <Container style={{overflow: `auto`}}>
            <Row>
                <Col md={{ size: 3, order: 1}}>
                    <div style={{
                        marginTop: 28,
                    }}>
                        <FormGroup tag="fieldset" row>
                        <legend className="col-form-label col-sm-12">Select Process</legend>
                            <Col sm={10}>
                                {
                                    unique_process.map(process => (
                                        process === 'All' ?
                                        <FormGroup  key={process} check>
                                            <Label check>
                                                <Input id={process} type="radio" onChange={filter.onChange} name="rad" />{' '}
                                                {process}
                                            </Label>
                                        </FormGroup>
                                        :
                                        <FormGroup  key={process} check>
                                            <Label check>
                                                <Input id={process} type="radio" onChange={filter.onChange} name="rad" />{' '}
                                                {process}
                                            </Label>
                                        </FormGroup>
                                    ))
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup tag="fieldset" row>
                        <legend className="col-form-label col-sm-12">Select Week</legend>
                            <Col sm={10}>
                                {
                                    unique_WW.map(ww => (
                                        ww === 'All' ?
                                        <FormGroup  key={ww} check>
                                            <Label check>
                                                <Input id={ww} type="radio" onChange={filter.onChange} name="rad" />{' '}
                                                W{ww}
                                            </Label>
                                        </FormGroup>
                                        :
                                        <FormGroup  key={ww} check>
                                            <Label check>
                                                <Input id={ww} type="radio" onChange={filter.onChange} name="rad" />{' '}
                                                W{ww}
                                            </Label>
                                        </FormGroup>
                                    ))
                                }
                            </Col>
                        </FormGroup>
                        
                    </div>
                </Col>
                <Col md={{ size: 6, order: 2 }}>
                    <div style={{
                        marginTop: 28
                    }}>
                        <h2 style={{fontWeight: 400, marginBottom: 28}}>Dashboard <small style={{opacity: 0.5, fontSize: 14}}>o·e·e</small> <span style={{float: `right`, opacity: 0.8}}> W{unique_WW}</span></h2>
                        {
                            props.data.oee.map(data => (
                            <Media key={data.RANK} style={{borderLeft: `1px solid #00000020`, borderRight: `1px solid #00000020`, borderTop: `1px solid #00000020`, borderBottom: `1px solid #00000020`, padding: `20px`, marginBottom: 4 }}>
                                <Media left href="#">
                                    <Media style={{width: 80, height: 80, borderRadius: `50%`, marginRight: 10}} object src={`http://dev-metaspf401.sunpowercorp.com:8080/images/spares/Blank.png`} alt="Generic placeholder image" />
                                </Media>
                                <Media body>
                                    <Media heading>
                                    <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}></small>
                                    {data.Process} 
                                    <Badge id={data.Process} style={{float:`right`}} color="warning" pill>     <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>speed loss: </small>
                                        {data['%SpeedLoss']}
                                    </Badge>
                                    <Badge id={data.Process} style={{float:`right`}} color="info" pill>     <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>OEE: </small>
                                        {data['']}
                                    </Badge>
                                    </Media>
                                    <Media body>
                                        <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>Productive Time: </small>{data['Productive Time']}</Badge> 
                                        
                                    </Media>
                                    
                                </Media>
                            </Media>    
                                
                            ))
                        }
                    </div>
                </Col>
                <Col md={{ size: 3, order: 3}}>
                    <div style={{
                        marginTop: 28
                    }}>
                        <h4 style={{fontWeight: 400, marginBottom: 28}}></h4>
                        
                    </div>
                </Col>
            </Row>
        </Container>
        </Layout>
    )
}

OEE.getInitialProps = async function(){
    const res = await fetch('http://dev-metaspf401.sunpowercorp.com:8080/api/oee');
    const data = await res.json();

    console.log(data.oee);

    //console.log(`Show data fetched. Count: ${data.summary.length}`);
    return {
        data
    };
}

export default OEE;