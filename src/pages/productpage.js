import ProductPage from '../components/ProductPage';
import React, { useState, useEffect } from 'react';
import { getProduct } from '.';

export const ProductPageController = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getProduct();
                setProduct(result.product);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const token = window.localStorage.getItem('accessToken')
            const username = window.localStorage.getItem('username')
            const response = await fetch('http://127.0.0.1:8000/get-user-details/', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'user': username,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.data)

            } else {
                // Handle error response, e.g., display an error message
                //const { error } = await response.json();
                // Handle the error response
            }
        };

        getUser();
    }, []);

    return (
        <div>
            {product ? (
                <ProductPage data={product} user={user} />
            ) : (<p>Loading...</p>)}
        </div>
    )
}

export default ProductPageController;