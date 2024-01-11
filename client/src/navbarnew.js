import React from 'react';
import "../index.css"
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBNavbarLink,
} from 'mdb-react-ui-kit';

export default function NavbarDropdown() {
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbar>
          <MDBNavbarLink href='/'>Home</MDBNavbarLink>
        </MDBNavbar>
        <MDBNavbarNav>
          <MDBNavbarItem>
            <MDBDropdown>

              <MDBDropdownToggle tag='a' className='nav-link'>
                Actions
              </MDBDropdownToggle>

              <MDBDropdownMenu>

                {/* <MDBDropdownItem>
                  <MDBNavbarLink href="/">Action</MDBNavbarLink>
                </MDBDropdownItem>

                <MDBDropdownItem>
                  <MDBNavbarLink href="#">Another action</MDBNavbarLink>
                </MDBDropdownItem> */}




                <MDBDropdownItem>
                  <MDBNavbarLink href="#">Submenu &raquo;</MDBNavbarLink>
                  <ul className="dropdown-menu dropdown-submenu">
                    
                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 1</MDBNavbarLink>
                    </MDBDropdownItem>

                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 2</MDBNavbarLink>
                    </MDBDropdownItem>

                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 3 &raquo;</MDBNavbarLink>
                      <ul className="dropdown-menu dropdown-submenu">
                        <MDBDropdownItem>
                          <MDBNavbarLink href="#">Multi level 1</MDBNavbarLink>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <MDBNavbarLink href="#">Multi level 2</MDBNavbarLink>
                        </MDBDropdownItem>
                      </ul>
                    </MDBDropdownItem>

                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 4</MDBNavbarLink>
                    </MDBDropdownItem>

                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 5</MDBNavbarLink>
                    </MDBDropdownItem>
                  </ul>
                </MDBDropdownItem>






                <MDBDropdownItem>
                  <MDBNavbarLink href="#">Submenu &raquo;</MDBNavbarLink>
                  <ul className="dropdown-menu dropdown-submenu">
                    
                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 1</MDBNavbarLink>
                    </MDBDropdownItem>

                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 2</MDBNavbarLink>
                    </MDBDropdownItem>

                    {/* <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 3 &raquo;</MDBNavbarLink>
                      <ul className="dropdown-menu dropdown-submenu">
                        <MDBDropdownItem>
                          <MDBNavbarLink href="#">Multi level 1</MDBNavbarLink>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <MDBNavbarLink href="#">Multi level 2</MDBNavbarLink>
                        </MDBDropdownItem>
                      </ul>
                    </MDBDropdownItem> */}

                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 4  &rarr;</MDBNavbarLink>
                    </MDBDropdownItem>

                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 5</MDBNavbarLink>
                    </MDBDropdownItem>
                  </ul>
                </MDBDropdownItem>







                <MDBDropdownItem>
                  <MDBNavbarLink href="#">Submenu &raquo;</MDBNavbarLink>
                  <ul className="dropdown-menu dropdown-submenu">
                    
                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 1</MDBNavbarLink>
                    </MDBDropdownItem>

                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 2</MDBNavbarLink>
                    </MDBDropdownItem>

                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 3 &raquo;</MDBNavbarLink>
                      <ul className="dropdown-menu dropdown-submenu">
                        <MDBDropdownItem>
                          <MDBNavbarLink href="#">Multi level 1</MDBNavbarLink>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <MDBNavbarLink href="#">Multi level 2</MDBNavbarLink>
                        </MDBDropdownItem>
                      </ul>
                    </MDBDropdownItem>

                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 4</MDBNavbarLink>
                    </MDBDropdownItem>

                    <MDBDropdownItem>
                      <MDBNavbarLink href="#">Submenu item 5</MDBNavbarLink>
                    </MDBDropdownItem>
                  </ul>
                </MDBDropdownItem>






              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}