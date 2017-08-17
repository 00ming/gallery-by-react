require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom'
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
// 获取区间内的随机值
function getRangeRandom (low,heigt) {
  return Math.ceil(Math.random() * (heigt - low) + low)
}

class AppComponent extends React.Component {
    
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
       },
       imgsArrangeArr: [
         {
            // pos: {
            //   left: '0',
            //   top: '0'
            // }
         }
        ]

    };

    // 重新布局所有图片
    // @param centerIndex 指定哪个图片居中

    rearrange (centerIndex) {
      var imgsArrangeArr = this.state.imgsArrangeArr,
          centerPos = this.state.centerPos,
          hPosRange = this.state.hPosRange,
          vPosRange = this.state.vPosRange,
          hPosRangeleftSecX = hPosRange.leftSecX,
          hPosRangerightSecX = hPosRange.rightSecX,
          hposRangeY = hPosRange.y,
          vPosRangeX = vPosRange.x,
          vPosRangeTopY = vPosRange.topY,

          imgsArrangeTopArr = [],//存放上方图片的信息
          topImgNum = Math.ceil(Math.random() * 2), //取一个或者不取
          topImgSpliceIndex = 0,
          imgsArrageCenterArr = imgsArrangeArr.splice(centerIndex,1);//中心图片信息
          

          // console.log(this.state)
          // 先居中
          imgsArrageCenterArr[0].pos = centerPos;
          // 上侧状态信息
          topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum))
          imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

          // 布局上侧的图片
          imgsArrangeTopArr.forEach(function (value,index) {
            imgsArrangeTopArr[index].pos = {
              top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
              left: getRangeRandom(vPosRangeX[0],vPosRangeX[1])
            }
          })
          // 布局左右侧图片

    };





    // 组件加载完成后，为每张图片计算其位置的范围
    componentDidMount() { 
      // 获取舞台大小 
      
      var stageDom = this.refs.stage,
          stageW = stageDom.scrollWidth,
          stageH = stageDom.scrollHeight,
          halfStageW = Math.ceil(stageW / 2),
          halfStageH = Math.ceil(stageH / 2 );

      // 获取imageFigure的大小
      var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
          imgW = imgFigureDOM.scrollWidth,
          imgH = imgFigureDOM.scrollHeight,
          halfImgW = Math.ceil(imgW / 2),
          halfImgH = Math.ceil(imgH / 2);
          
      // 计算中心图片的位置
      this.state.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
      }
       // 计算左右侧区域图片位置的取值的范围
      this.state.hPosRange.leftSecX[0] = -halfImgW;
      this.state.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
      this.state.hPosRange.rightSecX[0] = halfStageW - halfImgW;
      this.state.hPosRange.rightSecX[1] = stageW - halfImgW;
      this.state.hPosRange.y[0] = -halfImgH;
      this.state.hPosRange.y[1] = stageH - halfImgH
      // 计算上侧区域图片位置的取值的范围
      this.state.vPosRange.topY[0] = -halfImgH;
      this.state.vPosRange.topY[1] = halfStageH - halfImgH * 3;
      this.state.vPosRange.x[0] = halfImgW;

      
      this.rearrange(0)
    };

  render() { 
     var controllerUnits = [],
        imgFigures = [];
    // 下面这个foreach莫名其妙报错
    imagesdatas.forEach(function (value,index) {
      imgFigures.push(<ImgFigure data={value} key={index} ref={'imgFigure' + index}/>);
      if ( !this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        }
      }
    }.bind(this));
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
