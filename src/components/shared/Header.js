import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Icon } from 'react-fa';

const Header = function() {
    return (
        <div className="header">
            <h1 className="logo"><Link to="/">Readable</Link></h1>
            <Button className="button button--submit"><Link to="/post-create"><Icon name="plus-circle" />Add new post</Link></Button>
        </div>
    );
}

export default Header;
