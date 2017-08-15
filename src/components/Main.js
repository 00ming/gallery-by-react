require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
let json = require("../data/datas.json");
// let json = require("./2.json");
console.log(json)
var imagesdatas = (function getImagesURL (arr) {
	for (let i = 0;i < arr.length; i ++){
		var singleImage = arr[i];
		singleImage.imageURL = "../images/"+singleImage.fileName	
		arr[i] = singleImage
	}
	return arr
})(json)
console.log(json[1])
class AppComponent extends React.Component {
  render() {
    return (
    	<section className="stage">
    	<section className="image-sec"></section>
    	<nav className="controller-nav"></nav>
        </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
