import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductListCategory = () => {
    const { nombreCategoria } = useParams();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Datos estáticos para los productos por categoría
        const productosEstaticos = {
            'Categoria 1': [
                {
                    id: 1,
                    nombre: 'Producto 1 de Categoria 1',
                    descripción: 'Descripción del producto 1 de Categoria 1',
                    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/1200px-React_Logo_SVG.svg.png',
                    precio: 100,
                },
                {
                    id: 2,
                    nombre: 'Producto 2 de Categoria 1',
                    descripción: 'Descripción del producto 2 de Categoria 1',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 150,
                },
            ],
            'Categoria 2': [
                {
                    id: 3,
                    nombre: 'Producto 1 de Categoria 2',
                    descripción: 'Descripción del producto 1 de Categoria 2',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 200,
                },
                {
                    id: 4,
                    nombre: 'Producto 2 de Categoria 2',
                    descripción: 'Descripción del producto 2 de Categoria 2',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 250,
                },
            ],
            // Añadir más categorías y productos según sea necesario
        };

        // Simula la obtención de productos por categoría
        setProductos(productosEstaticos[nombreCategoria] || []);
    }, [nombreCategoria]);

    return (
        <div className="container">
            <h1>Categoría: {nombreCategoria}</h1>
            <p></p>
            <div className="row">
                {productos.map((producto) => (
                    <div key={producto.id} className="col-4">
                        <ProductCard producto={producto} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListCategory;
