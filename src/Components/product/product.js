import React from 'react';
import './product.less';
class Product extends React.PureComponent {
  render() {
    let { obj } = this.props;
    return (
      <li>
        <img src={obj.image} alt="" />
        <p className="title">{obj.store_name}</p>
        <p className="price">${obj.price}</p>
        <p className="scholl">
          <span>{obj.slogan}</span>
        </p>
      </li>
    );
  }
}
export default Product;
