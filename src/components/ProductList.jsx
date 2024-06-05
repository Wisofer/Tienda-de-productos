import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

const ProductList = () => {
    const [productos, setProductos] = React.useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'productos'));
                const productos = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProductos(productos);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container">
            <Link to="/producto/create">
                <button type='button' className='btn btn-primary btnCrear'>Crear</button>
                <p></p>
            </Link>
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

export default ProductList;