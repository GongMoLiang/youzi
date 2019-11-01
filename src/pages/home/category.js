/*
 * title: '商城分类'
 */
import React from 'react';
import './category.less';
import axios from 'axios';

class Category extends React.PureComponent {
  state = {
    categorylist: [],
    id: 0,
  };
  getcategorylist() {
    axios.post('https://api.youzixy.com/ebapi/store_api/get_product_category').then(response => {
      let reslult = response.data;
      this.setState({
        categorylist: reslult.data,
      });
    });
  }
  handlecategory(index) {
    let top = this.refs.right.children[index].children[0].offsetTop;
    this.refs.right.style.top = -top + 'px';
    this.setState({
      id: index,
    });
  }
  render() {
    let { categorylist, id } = this.state;
    return (
      <div className="category">
        <h1>商城分类</h1>
        <div className="content">
          <ul className="left">
            <div>
              {categorylist.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={this.handlecategory.bind(this, index)}
                    className={id === index ? 'active' : ''}
                  >
                    {item.cate_name}
                  </li>
                );
              })}
            </div>
          </ul>
          <ul className="right" ref="right">
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
