import React, { useContext, useEffect, useState } from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import "/node_modules/bootstrap/dist/js/bootstrap.bundle"
import { NavLink, Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from "react-redux";

//Styled components:
const MenuItem = styled.div`
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  margin-bottom:0px;
  color: black;
`;


const Navbar = () => {
  let user = localStorage.getItem('user');
  const navigate = useNavigate();

  const qty = useSelector(state => state.cart.quantity);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#"><h3>SHOPLINE.</h3></a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mt-2 p-2" id="navbar" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" style={{ "backgroundColor": "ghostwhite" }}>

          <ul className="navbar-nav nav ms-auto">

            <li className="nav-item my-auto">
              <NavLink
                to="/" onClick={() => navigate("/")}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "pending"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item my-auto">
              <NavLink
                to="/contact" onClick={() => navigate("/contact")}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "pending"
                }
              >
                Contact
              </NavLink>
            </li>

            {user ?
              <>
                <li className="nav-item my-auto">
                  <NavLink
                    to="/orders" onClick={() => navigate("/orders")}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : "pending"
                    }
                  >
                    My Orders
                  </NavLink>
                </li>

                <li className="nav-item">
                  <Link className="nav-link"><button type="button" onClick={logout} className="btn btn-outline-danger">Logout</button>
                  </Link>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup"><button type="button" className="btn btn-outline-secondary">Sign Up</button>
                  </Link>
                </li>

                <li class="nav-item">
                  <Link className="nav-link" to="/login"><button type="button" className="btn btn-outline-danger">Login</button>
                  </Link>
                </li>
              </>
            }

            <li className="nav-item mt-3">
              <Link to="/cart">
                <MenuItem>
                  <Badge badgeContent={qty} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </MenuItem>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

