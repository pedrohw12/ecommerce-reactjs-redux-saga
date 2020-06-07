import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MdAddShoppingCart } from "react-icons/md";
import { formatPrice } from "../../util/format";
import api from "../../services/api";

import * as CartActions from "../../store/modules/cart/actions";

import tenis from "../../assets/tenis.jpg";

import { ProductList } from "./styles";

function Home(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("products").then((response) => {
      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
    });
  }, []);

  function handleAddProduct(id) {
    props.dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={tenis} alt={product.title} />
          <strong> {product.title} </strong>
          <span> {product.priceFormatted} </span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{" "}
              {props.amount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

export default connect(mapStateToProps)(Home);
