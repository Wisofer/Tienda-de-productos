import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ProductCard = ({ producto }) => {
    const navigate = useNavigate();
    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'cover'
    };
    
    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            // Simula la eliminación del producto
            console.log(`Producto con ID ${producto.id} eliminado`);
            // Redirige a la página principal después de eliminar el producto
            navigate('/inicio');
        }
    };
    
    return (
        <div className="product-card card rounded shadow-sm bg-white mb-4">
            <img
                src={producto.imagen}
                alt={producto.nombre}
                style={imageStyle}
            />
            <div className='p-3'>
                <h4>{producto.nombre}</h4>
                <p>{producto.descripción}</p>
                <p>Precio: ${producto.precio}</p>
                <Link to={`/producto/edit/${producto.id}`}>
                    <button type='button' className='btn btn-primary btnEditar'>Editar</button>
                </Link>
                {"  "}
                <Button variant='success' className='btnEliminar'>
                    Carrito
                </Button>
                {"  "}
                <Button variant="danger" onClick={handleDelete} className='btnEliminar'>
                    Eliminar
                </Button>
            </div>
        </div>
    );
};

// Ejemplo de datos estáticos para producto
ProductCard.defaultProps = {
    producto: {
        id: 1,
        nombre: 'Producto Ejemplo',
        descripción: 'Descripción del producto ejemplo',
        imagen: 'https://via.placeholder.com/150',
        precio: 100
    }
};

export default ProductCard;
