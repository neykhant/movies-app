import React from 'react';

const Like = (props) => {

    const { liked, onClick } = props;

    let classes = 'fa-heart fa';
    classes += liked ? 's' : 'r';

    return ( 
        <i className={classes} onClick={onClick}></i>
     );
}
 
export default Like;