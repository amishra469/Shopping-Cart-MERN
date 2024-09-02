import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddToCart from '../Cart/AddToCart';

const HomeContainer = styled.div`
    padding: 20px;
    background-color: ${props => props.theme.background};
    font-family: 'Poppins', sans-serif;
`;

const ProductGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
`;

const Card = styled.div`
    background: ${props => props.theme.name === 'dark' ? '#444' : '#f9f9f9'};
    border: none;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 20rem;
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    color: ${props => props.theme.color};

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
`;

const CardImg = styled.img`
    width: 100%;
    height: 180px;
    object-fit: cover;
`;

const CardBody = styled.div`
    padding: 20px;
`;

const CardTitle = styled.h5`
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: ${props => props.theme.name === 'dark' ? '#ffcc00' : '#333'};  /* Yellow for dark theme, dark gray for light theme */
    font-weight: 600;
`;

const CardText = styled.p`
    color: ${props => props.theme.name === 'dark' ? '#bbb' : '#555'};
    margin-bottom: 15px;
    font-size: 0.95rem;
    line-height: 1.6;
`;


const Home = () => {
    const [productList, setProductList] = useState([]);

    const fetchProductList = async () => {
        try {
            const response = await fetch('http://localhost:8080/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setProductList(result.products);

        } catch (error) {
            console.log(error);
            setProductList([]);
        }
    };

    useEffect(() => {
        fetchProductList();
    }, []);

    return (
        <HomeContainer>
            <ProductGrid>
                {productList.map((item, index) => (
                    <Card key={item.title + index}>
                        <CardImg src={item.imageUrl || "https://via.placeholder.com/150"} alt={item.title} />
                        <CardBody>
                            <CardTitle>{item.title}</CardTitle>
                            <CardText>{item.description}</CardText>
                            <CardText>Rs {item.price}</CardText>
                            <AddToCart id={item.id} />
                        </CardBody>
                    </Card>
                ))}
            </ProductGrid>
        </HomeContainer>
    );
};

export default Home;
