import React, { useState } from 'react';
import Link from 'next/link';

import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,DropdownMenu,DropdownItem, Badge
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {

    const isOpen = useNavOpen(false);

    function useNavOpen(init){
        const [value, setValue] = useState(init);
        
        function handleToggle(e){
            if(!value){
                setValue(true);
            } else {
                setValue(false);
            }
        }

        return {
            value,
            onClick: handleToggle
        }
    }

    return (
        <Navbar color="dark" dark expand="md" style={{padding: `auto`}}>
            <Container>
                <NavbarBrand href="/">Fab4 Spares</NavbarBrand>
                <NavbarToggler onClick={isOpen.onClick} />
                <Collapse isOpen={isOpen.value} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="#">Request</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Approval <Badge color="danger" pill>516</Badge></NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                        Profile
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem>
                            Notifications
                        </DropdownItem>
                        <DropdownItem>
                            Settings
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            Logout
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    )

}