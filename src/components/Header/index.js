import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import logo from "../../assets/logo.svg";

import { Container, Cart } from "./styles";

function Header(props) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span> {props.cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);