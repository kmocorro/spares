
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ReactImageFallback from 'react-image-fallback';

import { Container, Row, Col, Media, ListGroup, Spinner, ListGroupItem, Badge, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';

import fetch from 'isomorphic-unfetch';

const Index = props => {

    // find unique category, ww, toolgroup
    const unique_category = ['All', ...new Set(props.data.details.map(data => data.Category))];
    const unique_WW = [...new Set(props.data.details.map(data => data.WW))];
    const unique_toolgrp = ['All', ...new Set(props.data.details.map(data => data.ToolGrp))];

    const filter = useFilter(null);

    const search = useSearch('');

    function useSearch(init){
        const [ value, setValue ] = useState(init);

        function handleOnChange(e){
            setValue(e.target.value);
        }

        function handleOnClickClear(){
            setValue('');
        }

        return {
            value,
            onChange: handleOnChange,
            onClick: handleOnClickClear
        }
    }

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

    function makeid(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return (
        <Layout>
        <Container style={{overflow: `auto`}}>
            <Row>
                <Col md={{ size: 3, order: 1}}>
                    <div style={{
                        marginTop: 28,
                    }}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">#</InputGroupAddon>
                            <Input autoFocus value={search.value} placeholder="Search item number..." onClick={search.onClick} onChange={search.onChange} />
                                {
                                    !search.value
                                    ?
                                       <>
                                       </>
                                    : 
                                    <InputGroupAddon addonType="append">
                                    <Button outline color="danger" onClick={search.onClick}>x</Button>
                                    </InputGroupAddon> 
                                }
                        </InputGroup>
                        <FormGroup tag="fieldset" row>
                        <legend className="col-form-label col-sm-12">Select Category</legend>
                            <Col sm={10}>
                                {
                                    unique_category.map(category => (
                                        category === 'All' ?
                                        <FormGroup  key={category} check>
                                            <Label check>
                                                <Input id={category} type="radio" onChange={filter.onChange} name="rad" />{' '}
                                                {category}
                                            </Label>
                                        </FormGroup>
                                        :
                                        <FormGroup  key={category} check>
                                            <Label check>
                                                <Input id={category} type="radio" onChange={filter.onChange} name="rad" />{' '}
                                                {category}
                                            </Label>
                                        </FormGroup>
                                    ))
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup tag="fieldset" row>
                        <legend className="col-form-label col-sm-12">Select Tool Group</legend>
                            <Col sm={10}>
                                {
                                    unique_toolgrp.map(toolgrp => (
                                        toolgrp === 'All' ?
                                        <FormGroup  key={toolgrp} check>
                                            <Label check>
                                                <Input id={toolgrp} type="radio" onChange={filter.onChange} name="rad" />{' '}
                                                {toolgrp}
                                            </Label>
                                        </FormGroup>
                                        :
                                        <FormGroup  key={toolgrp} check>
                                            <Label check>
                                                <Input id={toolgrp} type="radio" onChange={filter.onChange} name="rad" />{' '}
                                                {toolgrp}
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
                        <h2 style={{fontWeight: 400, marginBottom: 28}}>Dashboard <small style={{opacity: 0.5, fontSize: 14}}>o·ver·con·sump·tion</small> <span style={{float: `right`, opacity: 0.8}}> {unique_WW}</span></h2>
                        {
                            !filter.value && !search.value
                            ? 
                                <>
                                {props.data.details.map(data => (
                                    <Media key={data.RANK} style={{borderLeft: `1px solid #00000020`, borderRight: `1px solid #00000020`, borderTop: `1px solid #00000020`, borderBottom: `1px solid #00000020`, padding: `20px`, marginBottom: 4 }}>
                                        <Media left href="#">
                                            {
                                                data.ToolOwnerImage !== 'Blank.png' ?
                                                <>
                                                    <ReactImageFallback 
                                                        style={{width: 80, height: 80, borderRadius: `50%`, marginRight: 10}}
                                                        src={`http://dev-metaspf401.sunpowercorp.com:8080/images/spares/${data.ToolOwnerImage}`}
                                                        fallbackImage={`https://robohash.org/${makeid(9)}.png`}
                                                        initialImage={<Spinner color="dark" />}
                                                        alt="cool image should be here"
                                                        className="my-image" 
                                                    />
                                                </> :
                                                <>
                                                    <Media style={{width: 80, height: 80, borderRadius: `50%`, marginRight: 10}} object src={`https://robohash.org/${makeid(9)}.png`} alt="img" />
                                                </>
                                            }
                                        </Media>
                                        <Media body>
                                            <Media heading>
                                            <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>#</small>
                                            {data.Item} 
                                            <Badge id={data.Item} style={{float:`right`}} color="danger" pill>     <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>usage rate: </small>
                                            {
                                                data['QDemand'] === '0.01' ?
                                                <>
                                                    {'No Forecast'}
                                                </>
                                                :
                                                <>
                                                    {data['UsageRate%']}
                                                </>
                                            }
                                            </Badge>
                                            </Media>
                                            <Media body>

                                                <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>@</small>{data.ToolGrp}</Badge>

                                                <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>description: </small>{data.Desc}</Badge> 
                                                
                                            </Media>
                                            <Media body>
                                                <Badge color="light" pill >
                                                <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>demand: </small> {   
                                                    data['QDemand'] === '0.01' ?
                                                    <>
                                                        {'0'}
                                                    </>
                                                    :
                                                    <>
                                                    {
                                                        data['QDemand']
                                                    }
                                                    </>
                                                }
                                                </Badge>
                                                
                                                <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>consumption: </small> {data['QCons']}</Badge>

                                                <Badge  color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>category: </small> {data.Category}</Badge>

                                            </Media>
                                            <Media body>
                                            
                                                <Badge  color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>on-hand: </small> {data.OnHand}</Badge>

                                                <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>open-po: </small> {data.OpenPO}</Badge>

                                                <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>in-transit: </small> {data.InTransit}</Badge>

                                            </Media>
                                        </Media>
                                    </Media>
                                ))}
                                </>
                            :
                                <>
                                {props.data.details.map(function(data, i) {
                                    if(data.Category === filter.value || data.ToolGrp === filter.value || data.Item === search.value){
                                        return (
                                            <Media key={data.RANK} style={{borderLeft: `1px solid #00000020`, borderRight: `1px solid #00000020`, borderTop: `1px solid #00000020`, borderBottom: `1px solid #00000020`, padding: `20px`, marginBottom: 4 }}>
                                                <Media left href="#">
                                                    {
                                                        data.ToolOwnerImage !== 'Blank.png' ?
                                                        <>
                                                            <ReactImageFallback 
                                                                style={{width: 80, height: 80, borderRadius: `50%`, marginRight: 10}}
                                                                src={`http://dev-metaspf401.sunpowercorp.com:8080/images/spares/${data.ToolOwnerImage}`}
                                                                fallbackImage={`https://robohash.org/${makeid(9)}.png`}
                                                                initialImage={<Spinner color="dark" />}
                                                                alt="img"
                                                            />
                                                        </> :
                                                        <>
                                                            <Media style={{width: 80, height: 80, borderRadius: `50%`, marginRight: 10}} object src={`https://robohash.org/${makeid(4)}.png`} alt="img" />
                                                        </>
                                                    }
                                                </Media>
                                                <Media body>
                                                    <Media heading>
                                                    <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>#</small>
                                                    {data.Item} 
                                                    <Badge id={data.Item} style={{float:`right`}} color="danger" pill>     <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>usage rate: </small> 
                                                    {
                                                        data['QDemand'] === '0.01' ?
                                                        <>
                                                            {'No Forecast'}
                                                        </>
                                                        :
                                                        <>
                                                            {data['UsageRate%']}
                                                        </>
                                                    }
                                                    </Badge>
                                                    </Media>

                                                    <Media body>

                                                        <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>@</small>{data.ToolGrp}</Badge>

                                                        <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>description: </small>{data.Desc}</Badge> 
                                                        
                                                    </Media>
                                                    <Media body>
                                                        <Badge color="light" pill >
                                                        <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>demand: </small> {   
                                                            data['QDemand'] === '0.01' ?
                                                            <>
                                                                {'0'}
                                                            </>
                                                            :
                                                            <>
                                                            {
                                                                data['QDemand']
                                                            }
                                                            </>
                                                        }
                                                        </Badge>
                                                        
                                                        <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>consumption: </small> {data['QCons']}</Badge>

                                                        <Badge  color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>category: </small> {data.Category}</Badge>

                                                    </Media>
                                                    <Media body>
                                                    
                                                        <Badge  color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>on-hand: </small> {data.OnHand}</Badge>

                                                        <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>open-po: </small> {data.OpenPO}</Badge>

                                                        <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>in-transit: </small> {data.InTransit}</Badge>

                                                    </Media>
                                                </Media>
                                            </Media>
                                        )
                                    } else if(filter.value === 'All') {
                                        return (
                                            <Media key={data.RANK} style={{borderLeft: `1px solid #00000020`, borderRight: `1px solid #00000020`, borderTop: `1px solid #00000020`, borderBottom: `1px solid #00000020`, padding: `20px`, marginBottom: 4 }}>
                                                <Media left href="#">
                                                    {
                                                        data.ToolOwnerImage !== 'Blank.png' ?
                                                        <>
                                                            <ReactImageFallback 
                                                                style={{width: 80, height: 80, borderRadius: `50%`, marginRight: 10}}
                                                                src={`http://dev-metaspf401.sunpowercorp.com:8080/images/spares/${data.ToolOwnerImage}`}
                                                                fallbackImage={`https://robohash.org/${makeid(9)}.png`}
                                                                initialImage={<Spinner color="dark" />}
                                                                alt="cool image should be here"
                                                                className="my-image" 
                                                            />
                                                        </> :
                                                        <>
                                                            <Media style={{width: 80, height: 80, borderRadius: `50%`, marginRight: 10}} object src={`https://robohash.org/${makeid(8)}.png`} alt="img" />
                                                        </>
                                                    }
                                                    
                                                </Media>
                                                <Media body>
                                                    <Media heading>
                                                    <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>#</small>
                                                    {data.Item} 
                                                    <Badge id={data.Item} style={{float:`right`}} color="danger" pill>     <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>usage rate: </small> 
                                                    {
                                                        data['QDemand'] === '0.01' ?
                                                        <>
                                                            {'No Forecast'}
                                                        </>
                                                        :
                                                        <>
                                                            {data['UsageRate%']}
                                                        </>
                                                    }
                                                    </Badge>
                                                    </Media>
                                                    <Media body>

                                                        <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>@</small>{data.ToolGrp}</Badge>

                                                        <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>description: </small>{data.Desc}</Badge> 

                                                    </Media>
                                                    <Media body>
                                                        <Badge color="light" pill >
                                                        <small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>demand: </small> {   
                                                            data['QDemand'] === '0.01' ?
                                                            <>
                                                                {'0'}
                                                            </>
                                                            :
                                                            <>
                                                            {
                                                                data['QDemand']
                                                            }
                                                            </>
                                                        }
                                                        </Badge>

                                                        <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>consumption: </small> {data['QCons']}</Badge>

                                                        <Badge  color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>category: </small> {data.Category}</Badge> 

                                                    </Media>
                                                    <Media body>

                                                        <Badge  color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>on-hand: </small> {data.OnHand}</Badge>

                                                        <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>open-po: </small> {data.OpenPO}</Badge>

                                                        <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.8}}>in-transit: </small> {data.InTransit}</Badge>

                                                    </Media>
                                                </Media>
                                            </Media>
                                        )
                                    }
                                })}
                                </>
                        }
                    </div>
                </Col>
                <Col md={{ size: 3, order: 3}}>
                    <div style={{
                        marginTop: 28
                    }}>
                        <h4 style={{fontWeight: 400, marginBottom: 28}}>Top Overconsumption Rates</h4>
                        <ListGroup>
                            {props.data.summary.map(data => (
                                <ListGroupItem key={data.RANKING} >{data.ToolGrp} <Badge pill>{data.Count}</Badge></ListGroupItem>
                            ))}
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </Container>
        </Layout>
    )

}

Index.getInitialProps = async function(){
    const res = await fetch('http://dev-metaspf401.sunpowercorp.com:8080/api/spares');
    const data = await res.json();

    //console.log(`Show data fetched. Count: ${data.summary.length}`);

    return {
        data
    };
}


export default Index;