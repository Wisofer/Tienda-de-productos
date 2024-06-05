import React, { useEffect, useState } from 'react';
import { getCategorias } from '../api/api';
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Offcanvas
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    useEffect(() => {
        // Obtiene las categorías al cargar el componente
        getCategorias()
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener categorías: ' + error);
            });
    }, []);

    const handleSearchChange = (e) => {
        // Actualiza el estado del término de búsqueda cuando cambia
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para buscar productos según el término de búsqueda
        console.log('Buscar productos con el término:', searchQuery);
    };

    return (
        <div className="bg-white">
            <Container fluid className='mb-3'>
                <Navbar bg="light" expand={false}>
                    <Link to="/" className="nav-link">
                        <Navbar.Brand href="#">
                            <img src="https://i.imgur.com/BlyxxN9.png" width="40" height="30" className="d-inline-block align-top" alt="Logo" />
                            {" "} Bakery Store</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" aria-label="Toggle navigation" onClick={handleShowOffcanvas} />
                </Navbar>
                <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end" aria-labelledby="offcanvasNavbarLabel">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title h5 id="offcanvasNavbarLabel">Contenido</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <FormControl type="search" placeholder="Buscar" aria-label="Buscar" className="me-2" value={searchQuery} onChange={handleSearchChange} />
                            <Button variant="outline-success" type="submit">Buscar</Button>
                        </Form>
                        <Nav className="justify-content-end flex-grow-1 pe-3 navbar-nav">
                            <Nav.Link href="#carrito">Carrito</Nav.Link>
                            <Nav.Link href="#lista-deseos">Lista de deseos</Nav.Link>
                            <NavDropdown title="Categorías" id="offcanvasNavbarDropdown">
                                {categorias.map((categoria) => (
                                    <Link to={`/categoria/${categoria.nombre}`} className="dropdown-item" key={categoria.id}>
                                        {categoria.nombre}
                                    </Link>
                                ))}
                                <NavDropdown.Divider />
                                <Link to="/" className="dropdown-item">Todos</Link>
                            </NavDropdown>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </Container>
        </div>
    );
}

export default NavBar;
