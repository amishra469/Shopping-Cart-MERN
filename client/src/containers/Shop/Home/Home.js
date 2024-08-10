import React from 'react';
import './Home.css'; // Import the CSS file

const Home = () => {
    const productList = [
        {
            title: "Book1",
            img: "", // Fixed typo from 'imz' to 'img'
            desc: "Nice Book"
        },
        {
            title: "Book2",
            img: "", // Fixed typo from 'imz' to 'img'
            desc: "Nice Book"
        },
        {
            title: "Book3",
            img: "", // Fixed typo from 'imz' to 'img'
            desc: "Nice Book"
        },
        {
            title: "Book4",
            img: "", // Fixed typo from 'imz' to 'img'
            desc: "Nice Book"
        }
    ];

    return (
        <div className="home-container">
            <div className="product-grid">
                {productList.map((item, index) => (
                    <div key={item.title + index} className="card">
                        <img src={item.img || "https://via.placeholder.com/150"} className="card-img" alt={item.title} />
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.desc}</p>
                            <button className="btn-add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
