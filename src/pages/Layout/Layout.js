import React, { Component } from 'react';
import styles from './Layout.css';

import NavigationBar from './../../components/NavigationBar/NavigationBar';
class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <div className={styles.Content}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Layout
