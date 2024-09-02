import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AddToCart from '../Cart/AddToCart';

const ProductListContainer = styled.div`
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const DetailsButton = styled.button`
    padding: 12px 24px;
    font-size: 1rem;
    color: #ffffff;
    background-color: ${props => props.theme.buttonBackground}; /* Button background based on theme */
    border: 2px solid transparent; /* Ensure no outline border initially */
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        background-color: ${props => props.theme.buttonHoverBackground}; /* Button hover background based on theme */
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }

    &:focus {
        outline: ${props => props.theme.name === 'light' ? 'none' : 'auto'}; /* Remove outline only for light theme */
        border: ${props => props.theme.name === 'light' ? 'none' : `2px solid ${props.theme.linkActiveColor}`}; /* Custom focus border for non-light themes */
    }

    &:active {
        background-color: ${props => props.theme.buttonHoverBackground}; /* Button active background based on theme */
        transform: translateY(1px);
    }
`;

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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

        fetchProductList();
    }, []);

    const getItemDetails = (item) => {
        navigate(`/productdetails?id=${item.id}`);
    };

    return (
        <ProductListContainer>
            <ProductGrid>
                {productList.map((item, index) => (
                    <Card key={item.title + index}>
                        <CardImg src={item.imageUrl || "https://via.placeholder.com/150"} alt={item.title} />
                        <CardBody>
                            <CardTitle>{item.title}</CardTitle>
                            <CardText>{item.description}</CardText>
                            <CardText>Rs {item.price}</CardText>
                            <ButtonContainer>
                                <DetailsButton onClick={() => getItemDetails(item)}>Details</DetailsButton>
                                <AddToCart id={item.id} />
                            </ButtonContainer>
                        </CardBody>
                    </Card>
                ))}
            </ProductGrid>
        </ProductListContainer>
    );
};

export default ProductList;
