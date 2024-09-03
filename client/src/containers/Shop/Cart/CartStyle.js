import styled from 'styled-components';

export const CartContainer = styled.div`
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    background-color: ${props => props.theme.background};
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background-color: ${props => props.theme.name === 'dark' ? '#333' : '#fff'};
    border: 1px solid ${props => props.theme.name === 'dark' ? '#555' : '#ddd'};
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const CartItemImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
`;

export const CartItemDetails = styled.div`
    flex: 1;
    margin-left: 20px;
`;

export const CartItemTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 5px;
    color: ${props => props.theme.name === 'dark' ? '#ffcc00' : '#333'};  // Adjust color for dark theme
`;

export const CartItemPrice = styled.div`
    font-size: 1rem;
    color: ${props => props.theme.name === 'dark' ? '#ccc' : '#666'};  // Adjust color for dark theme
`;

export const CartItemRight = styled.div`
    display: flex;
    align-items: center;
`;

export const QtyButton = styled.button`
    width: 30px;
    height: 30px;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 5px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:focus {
        outline: none;
    }
`;

export const CartItemQuantity = styled.span`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => props.theme.name === 'dark' ? '#fff' : '#333'};  // Adjust color for dark theme
`;

export const CartTotal = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 15px;
    background-color: ${props => props.theme.name === 'dark' ? '#333' : '#fff'};
    border: 1px solid ${props => props.theme.name === 'dark' ? '#555' : '#ddd'};
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const CartTotalAmount = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.theme.name === 'dark' ? '#fff' : '#333'};  // Adjust color for dark theme
`;

export const ProceedButton = styled.button`
    padding: 10px 20px;
    font-size: 1.2rem;
    color: #fff;
    background-color: #28a745;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #218838;
    }

    &:focus {
        outline: none;
    }
`;

export const CartEmpty = styled.div`
    text-align: center;
    margin-top: 50px;
    padding: 40px;
    border: 2px dashed ${props => props.theme.name === 'dark' ? '#444' : '#ccc'};
    background-color: ${props => props.theme.name === 'dark' ? '#2c2c2c' : '#fdfdfd'};
    border-radius: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
`;

export const CartEmptyTitle = styled.h2`
    font-size: 28px;
    color: ${props => props.theme.color};
    margin-bottom: 15px;
`;

export const CartEmptyText = styled.p`
    font-size: 18px;
    color: ${props => props.theme.name === 'dark' ? '#bbb' : '#666'};
`;

export const StartShoppingButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:focus {
        outline: none;
    }
`;
