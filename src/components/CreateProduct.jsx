import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configura tu aplicación Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDZgbr2PbVpDXoqJFjhZI7u9Ow6E19Be2k",
  authDomain: "fire-producto.firebaseapp.com",
  projectId: "fire-producto",
  storageBucket: "fire-producto.appspot.com",
  messagingSenderId: "366580040370",
  appId: "1:366580040370:web:3548f085a469aa44f03fab"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CreateProduct = () => {
    const [producto, setProducto] = useState({
        nombre: '',
        descripción: '',
        imagen: null,
        precio: 0,
        id_categoria: 1,
    });

    const [categorias] = useState([
        { id: 1, nombre: 'Categoría 1' },
        { id: 2, nombre: 'Categoría 2' },
        { id: 3, nombre: 'Categoría 3' },
    ]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setProducto({ ...producto, [name]: type === 'file' ? e.target.files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newProductRef = await addDoc(collection(db, 'productos'), {
                nombre: producto.nombre,
                descripción: producto.descripción,
                imagen: URL.createObjectURL(producto.imagen),
                precio: producto.precio,
                id_categoria: producto.id_categoria,
            });
    
            console.log('Producto creado:', { id: newProductRef.id, ...producto });
            navigate('/');
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <Form onSubmit={handleSubmit}>
                <h2>Crear Nuevo Producto</h2>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="descripción">
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control as="textarea" rows={3} name="descripción" value={producto.descripción} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="imagen">
                    <Form.Label>Imagen:</Form.Label>
                    <Form.Control type="file" name="imagen" accept="image/*" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="precio">
                    <Form.Label>Precio:</Form.Label>
                    <Form.Control type="number" name="precio" value={producto.precio} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="id_categoria">
                    <Form.Label>Categoría:</Form.Label>
                    <Form.Control as="select" name="id_categoria" value={producto.id_categoria} onChange={handleChange}>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <p></p>
                <Button variant="primary" type="submit">
                    Crear Producto
                </Button>
                <p></p>
            </Form>
        </div>
    );
};

export default CreateProduct;
