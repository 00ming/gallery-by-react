require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
let json = require("../data/datas.json");
// let json = require("./2.json");
// console.log(json)
var imagesdatas = (function getImagesURL (arr) {
	for (let i = 0;i < arr.length; i ++){
		var singleImage = arr[i];
		singleImage.imageURL = "../images/"+singleImage.fileName	
		arr[i] = singleImage
	}
	return arr
})(json)
// console.log(imagesdatas[1])

class ImgFigure extends React.Component {
  render () {
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )

  }
}


class AppComponent extends React.Component {
    Constant: {
        centerPos: {
          left:0,
          right:0
        },
        hPosRange:{ //水平方向的取值范围
          leftSecX: [0,0],
          rightSecX: [0,0],
          y: [0,0]
        },
        vPosRange:{ //垂直方向的取值范围
          x: [0,0],
          topY: [0,0]
        }

    };
    state = {
      centerPos: {
          left:0,
          right:0
      },
      hPosRange:{ //水平方向的取值范围
          leftSecX: [0,0],
          rightSecX: [0,0],
          y: [0,0]
        },
        vPosRange:{ //垂直方向的取值范围
          x: [0,0],
          topY: [0,0]
        }
    };




    // // 组件加载完成后，为每张图片计算其位置的范围
    // componentDidMount() { 
    //   // 获取舞台大小 
      
    //   var stageDom = this.refs.stage,
    //       stageW = stageDom.scrollWidth,
    //       stageH = stageDom.scrollHeight,
    //       halfStageW = Math.ceil(stageW / 2),
    //       halfStageH = Math.ceil(stageH / 2 );

    //   // 获取imageFigure的大小
    //   var imgFigureDOM = this.refs.imgFigure0,
    //       imgW = imgFigureDOM.scrollWidth,
    //       imgH = imgFigureDOM.scrollHeight,
    //       halfImgW = Math.ceil(imgW / 2),
    //       halfImgH = Math.ceil(imgH / 2);
          
    //   // 计算中心图片的位置
    //   this.Constant.centerPos = {
    //     left: halfStageW - halfImgW,
    //     top: halfStageH - halfImgH
    //   }
    //    // 计算左右侧区域图片位置的取值的范围
    //   this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    //   this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    //   this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW;
    //   this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    //   this.Constant.hPosRange.y[0] = -halfImgH;
    //   this.Constant.hPosRange.y[1] = stageH - halfImgH
    //   // 计算上侧区域图片位置的取值的范围
    //   this.Constant.vPosRange.top[0] = -halfImgH;
    //   this.Constant.vPosRange.top[1] = halfStageH - halfImgH * 3;
    //   this.Constant.vPosRange.x[0] = halfImgW
    // };

  render() {
    console.log(this.state.centerPos);
    

     var controllerUnits = [],
        imgFigures = [];
    // 下面这个foreach莫名其妙报错
    imagesdatas.forEach(function (value,index) {
      imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index}/>);
    })
    return (
    	<section className="stage" ref="stage">
    	  <section className="image-sec">
          {imgFigures}
        </section>
    	   <nav className="controller-nav">
          {controllerUnits}
         </nav>
      </section>
    );
  }
}


AppComponent.defaultProps = {
};

export default AppComponent;
