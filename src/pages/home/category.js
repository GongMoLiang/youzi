/*
 * title: '商城分类'
 */
import React from 'react';
import './category.less';
import axios from 'axios';

let height = (document.body.clientHeight - 100) / 37.5 + 'rem';

class Category extends React.PureComponent {
  state = {
    categorylist: [],
  };
  getcategorylist() {
    axios.post('https://api.youzixy.com/ebapi/store_api/get_product_category').then(response => {
      let reslult = response.data;
      this.setState({
        categorylist: reslult.data,
      });
    });
  }
  z;
  render() {
    let { categorylist } = this.state;
    return (
      <div className="category">
        <h1>商城分类</h1>
        <div className="content" style={{ height: height }}>
          <ul className="left">
            {categorylist.map(item => {
              return <li key={item.id}>{item.cate_name}</li>;
            })}
          </ul>
          <ul className="right">
            {categorylist.map(item => {
              return (
                <li key={item.id}>
                  <h2>{item.cate_name}</h2>
                  <dl className="product">
                    {item.child.map(arr => {
                      return (
                        <dd key={arr.id}>
                          <img src={arr.pic} alt="" />
                          <span>{arr.cate_name}</span>
                        </dd>
                      );
                    })}
                  </dl>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getcategorylist();
  }
}

export default Category;
