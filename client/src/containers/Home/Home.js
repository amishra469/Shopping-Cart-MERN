import React from 'react'

const Home = () => {
    const productList = [
        {
            title: "Book1",
            imz: "",
            desc: "Nice Book"
        },
        {
            title: "Book2",
            imz: "",
            desc: "Nice Book"
        },
        {
            title: "Book3",
            imz: "",
            desc: "Nice Book"
        },
        {
            title: "Book4",
            imz: "",
            desc: "Nice Book"
        }
    ];
    return (
        <div>
            <h1>My Product</h1>
            <div style={{ display: 'flex', flexFlow: "row", flexWrap: "wrap", gap: '20px' }}>
                {
                    productList.map(item => {
                        return (
                            <div className="card" style={{ width: "18rem" }}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.desc}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home
