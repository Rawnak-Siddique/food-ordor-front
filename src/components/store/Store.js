import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../axios/apiClient'
import Items from '../items/Items'
import "./Store.css"

const Store = () => {
    const { name, id } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
      getData();
    }, []);
    const getData = async () => {
        try {
            const result = await apiClient.get(`/get-item/${id}`);
            console.log(result.data);
            setData(result.data);
        } catch (error) {
            console.log(error.messages);
        }
    };
    return (
        <div className="store" >
            <div className="store_Header">
                <h1>{name}</h1>
            </div>
            <div className="store_Items">
                {data.map((food) => {
                    return(
                        <div key={food.id}>
                            <Items id={food.id} img={food.img} name={food.title} price={food.price} description={food.description} list={food.ingredients} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Store
