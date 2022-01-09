import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import ItemLoader from './ItemLoader';


const ItemListContainer = () => {

        const [products, setProducts] = useState([])
        const [loading, setLoading] = useState(true)
        const {id} = useParams()
        const name = "Pirulo"

        useEffect(() => {
            const url = id ? `https://fakestoreapi.com/products/category/${id}` : "https://fakestoreapi.com/products/";
            const getCollection = fetch (url);

            getCollection
            .then(res=>res.json())
            .then((products) => {
                setLoading(false);
                setProducts(products);
            })
            .catch((err)=> {
                console.error(err)
            });
        }, [id]);

        return (
            <>
            <p className="greeting">¡Bienvenido {name}!</p>
            <h2>Los más vendidos:</h2>
            <div id="projects">
                {loading ? <ItemLoader/> : 
                ( products.map((product) => (
                        <div>
                            <ItemList key={products.id} product={product}/>
                        </div>
                    ))
                )}
            </div>
            </>
        ) 
} 

export default ItemListContainer