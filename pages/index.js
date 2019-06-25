
import React, { useState } from 'react';
import Layout from '../components/Layout';

import { Container, Row, Col, Media, Collapse, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import fetch from 'isomorphic-unfetch';

const Index = props => {

    const ranking = useRankingCollapse({collapse: false, status: 'View Spares Details >>'});
    
    // find unique category
    const unique_category = ['All', ...new Set(props.data.details.map(data => data.Category))];
    const select_category = useFilterCategory(null);

    function useFilterCategory(init){
        const [value, setValue] = useState(init);

        function handleOnChange(e){
            const selected_category_id = e.target.id;
            setValue(selected_category_id);
            console.log(selected_category_id);
        }
        
        return {
            value,
            onChange: handleOnChange
        }
    }

    function useRankingCollapse(init){
        const [value, setValue] = useState(init);

        function handleOnEntering(){
            setValue({collapse: true, status: 'Opening...' });
        }

        function handleOnEntered(){
            setValue({collapse: true, status: 'Hide' });
        }

        function handleOnExiting(){
            setValue({collapse: false, status: 'Closing...' });
        }
        
        function handleOnExited(){
            setValue({collapse: false, status: 'View Spares Details >>' });
        }

        function handleOnToggle(){
            setValue(value => ({ collapse: !value.collapse }))
        }
        
        return {
            value,
            onEntering: handleOnEntering,
            onEntered: handleOnEntered,
            onExiting: handleOnExiting, 
            onExited: handleOnExited,
            onToggle: handleOnToggle
        }
        
    }

    console.log(props.data);

    return (
        <Layout>
        <Container style={{overflow: `auto`}}>
            <Row>
                <Col md={{ size: 3, order: 1}}>
                    <div style={{
                        marginTop: 28
                    }}>
                        <FormGroup tag="fieldset" row>
                        <legend className="col-form-label col-sm-12">Select Category</legend>
                            <Col sm={10}>
                                {
                                    unique_category.map(category => (
                                    <FormGroup  key={category} check>
                                        <Label check>
                                            <Input id={category} type="radio" onChange={select_category.onChange} name="rad" />{' '}
                                            {category}
                                        </Label>
                                    </FormGroup>
                                    ))
                                }
                                
                            </Col>
                        </FormGroup>
                        <ListGroup>
                            {props.data.summary.map(data => (
                                <ListGroupItem key={data.RANKING} >{data.ToolGrp} <Badge pill>{data.Count}</Badge></ListGroupItem>
                            ))}
                        </ListGroup>
                    </div>
                </Col>
                <Col md={{ size: 9, order: 2 }}>
                    <div style={{
                        marginTop: 28
                    }}>
                        <h2 style={{fontWeight: 300, marginBottom: 28}}>Overconsumption <small style={{opacity: 0.5, fontSize: 14}}>o·ver·con·sump·tion /ˌōvərkənˈsəmpSHn/</small></h2>
                        {
                            !select_category.value 
                            ? 
                                <>
                                {props.data.details.map(data => (
                                    <Media key={data.RANK} style={{borderLeft: `1px solid #00000020`, borderRight: `1px solid #00000020`, borderTop: `1px solid #00000020`, borderBottom: `1px solid #00000020`, padding: `20px`, marginBottom: 4 }}>
                                        <Media left href="#">
                                            <Media style={{width: 80, height: 80, borderRadius: `50%`, marginRight: 10}} object src={`http://dev-metaspf401.sunpowercorp.com:8080/images/spares/${data.ToolOwnerImage}`} alt="Generic placeholder image" />
                                        </Media>
                                        <Media body>
                                            <Media heading>
                                            <small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>item: </small>
                                            {data.Item} 
                                            <Badge id={data.Item} style={{float:`right`}} color="danger" pill>     <small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>usage rate: </small> {data['UsageRate%']}
                                            </Badge>
                                            </Media>

                                            <Badge style={{float:`right`}} color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>@</small> {data.ToolGrp}</Badge>

                                            <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>description: </small>{data.Desc}</Badge> 
                                            
                                            <Badge style={{float:`right`}} color="light" pill >
                                            <small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>demand: </small> {data['QDemand']}
                                            </Badge>
                                            
                                            <Badge style={{float:`right`}} color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>consumption: </small> {data['QCons']}</Badge>

                                            <Badge style={{float:`right`}} color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>category: </small> {data.Category}</Badge>
                                        </Media>
                                    </Media>
                                ))}
                                </>
                            :
                                <>
                                {props.data.details.map(function(data, i) {
                                    if(data.Category == select_category.value){
                                        return (
                                            <Media key={data.RANK} style={{borderLeft: `1px solid #00000020`, borderRight: `1px solid #00000020`, borderTop: `1px solid #00000020`, borderBottom: `1px solid #00000020`, padding: `20px`, marginBottom: 4 }}>
                                                <Media left href="#">
                                                    <Media style={{width: 80, height: 80, borderRadius: `50%`, marginRight: 10}} object src={`http://dev-metaspf401.sunpowercorp.com:8080/images/spares/${data.ToolOwnerImage}`} alt="Generic placeholder image" />
                                                </Media>
                                                <Media body>
                                                    <Media heading>
                                                    <small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>item: </small>
                                                    {data.Item} 
                                                    <Badge id={data.Item} style={{float:`right`}} color="danger" pill>     <small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>usage rate: </small> {data['UsageRate%']}
                                                    </Badge>
                                                    </Media>

                                                    <Badge style={{float:`right`}} color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>@</small> {data.ToolGrp}</Badge>

                                                    <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>description: </small>{data.Desc}</Badge> 
                                                    
                                                    <Badge style={{float:`right`}} color="light" pill >
                                                    <small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>demand: </small> {data['QDemand']}
                                                    </Badge>
                                                    
                                                    <Badge style={{float:`right`}} color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>consumption: </small> {data['QCons']}</Badge>

                                                    <Badge style={{float:`right`}} color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>category: </small> {data.Category}</Badge>
                                                </Media>
                                            </Media>
                                        )
                                    } else if(select_category.value == 'All') {
                                        return (
                                            <Media key={data.RANK} style={{borderLeft: `1px solid #00000020`, borderRight: `1px solid #00000020`, borderTop: `1px solid #00000020`, borderBottom: `1px solid #00000020`, padding: `20px`, marginBottom: 4 }}>
                                                <Media left href="#">
                                                    <Media style={{width: 80, height: 80, borderRadius: `50%`, marginRight: 10}} object src={`http://dev-metaspf401.sunpowercorp.com:8080/images/spares/${data.ToolOwnerImage}`} alt="Generic placeholder image" />
                                                </Media>
                                                <Media body>
                                                    <Media heading>
                                                    <small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>item: </small>
                                                    {data.Item} 
                                                    <Badge id={data.Item} style={{float:`right`}} color="danger" pill>     <small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>usage rate: </small> {data['UsageRate%']}
                                                    </Badge>
                                                    </Media>

                                                    <Badge style={{float:`right`}} color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>@</small> {data.ToolGrp}</Badge>

                                                    <Badge color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>description: </small>{data.Desc}</Badge> 
                                                    
                                                    <Badge style={{float:`right`}} color="light" pill >
                                                    <small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>demand: </small> {data['QDemand']}
                                                    </Badge>
                                                    
                                                    <Badge style={{float:`right`}} color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>consumption: </small> {data['QCons']}</Badge>

                                                    <Badge style={{float:`right`}} color="light" pill ><small style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>category: </small> {data.Category}</Badge>
                                                </Media>
                                            </Media>
                                        )
                                    }
                                })}
                                </>
                        }
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

    console.log(`Show data fetched. Count: ${data.summary.length}`);

    return {
        data
    };
}


export default Index;