
import React, { useState } from 'react';
import Layout from '../components/Layout';

import { Container, Row, Col, Media, Collapse, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge , Table } from 'reactstrap';

import fetch from 'isomorphic-unfetch';

const Index = props => {

    const ranking = useRankingCollapse({collapse: false, status: 'View Spares Details >>'});
    
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
        <Container>
            <Row>
                <Col md={{ size: 3, order: 1}}>
                    <div style={{
                        marginTop: 28
                    }}>
                        <ListGroup>
                            {props.data.summary.map(data => (
                                <ListGroupItem key={data.RANKING} >{data.ToolGrp} <Badge pill>{data.Count}</Badge></ListGroupItem>
                            ))}
                        </ListGroup>
                    </div>
                </Col>
                <Col md={{ size: 6, order: 2 }}>
                    <div style={{

                        marginTop: 28
                    }}>
                        {props.data.details.map(data => (
                            <Media key={data.RANK} style={{paddingBottom: 24}}>
                                <Media left href="#">
                                    <Media style={{width: 80, height: 80, borderRadius: `50%`, marginRight: 10}} object src={`http://dev-metaspf401.sunpowercorp.com:8080/images/spares/${data.ToolOwnerImage}`} alt="Generic placeholder image" />
                                </Media>
                                <Media body>
                                    <Media heading>
                                    <small style={{fontWeight: 200, fontSize: 14, opacity: 0.5}}>item: </small>
                                    {data.Item} 
                                    <Badge id={data.Item} style={{float:`right`}} color="danger" pill>      {data['UsageRate%']}
                                    </Badge>
                                    </Media>
                                    {data.Desc} <Badge style={{float:`right`}} color="dark" >{data['QDemand']}</Badge><Badge style={{float:`right`}} color="warning" >{data['QCons']}</Badge>
                                </Media>
                            </Media>
                        ))}
                        
                    </div>
                </Col>
                <Col md={{ size: 3, order: 3 }}>
                    <div style={{ 
                        position: `-webkit-sticky`, /* Safari */
                        position: `sticky`,
                        top: 0,
                        marginTop: 28
                    }} >
                        <Button block outline onClick={ranking.onToggle} style={{ marginBottom: '0rem' }}>{ranking.value.status}</Button>
                        <Collapse
                        isOpen={ranking.value.collapse}
                        onEntering={ranking.onEntering}
                        onEntered={ranking.onEntered}
                        onExiting={ranking.onExiting}
                        onExited={ranking.onExited}
                        >
                        {
                            props.data.details.map(data => (
                            <ListGroup key={data.RANK}>
                                <ListGroupItem>
                                    <ListGroupItemHeading>{data.Item}{` `}<small style={{textTransform:`lowercase`, opacity: 0.5}}>{data.ToolGrp}</small></ListGroupItemHeading>
                                    <Table borderless style={{fontSize: 12}}>
                                    <tbody>
                                    <tr>
                                        <td>{data.Category}</td>
                                        <td>{data.QUARTER}</td>
                                        <td>{data.WW}</td>
                                    </tr>
                                    <tr>
                                        <td>Budget: {data.Budget}</td>
                                        <td>Cons: {data.QCons}</td>
                                        <td>Demand: {data.QDemand}</td>
                                    </tr>
                                    <tr>
                                        <td>{data.UsageFreq}</td>
                                        <td>Linear Usage: {data['LinUseRate%']}</td>
                                        <td>{data.ToolOwner}</td>
                                    </tr>
                                    </tbody>
                                    </Table>
                                </ListGroupItem>
                            </ListGroup>
                            ))
                        }
                        
                        </Collapse>
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