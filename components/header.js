import { Component } from 'react';
import css from '../styles/header.module.css';

class Header extends Component {
    render() {
        return <header>
            <div className={css.head}>
                <h3>SIMULADOR CDB PÓS FIXADO</h3>
            </div>
        </header>;
    }
}

export default Header;
