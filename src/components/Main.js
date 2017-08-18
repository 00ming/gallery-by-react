require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom'
let yeomanImage = require('../images/yeoman.png');
let json = require("../data/datas.json");


var imagesdatas = (function getImagesURL (arr) {
	for (let i = 0;i < arr.length; i ++){
		var singleImage = arr[i];
		singleImage.imageURL = "../images/"+singleImage.fileName	
		arr[i] = singleImage
	}
	return arr
})(json)


class ImgFigure extends React.Component {
  
  // 加了这个函数才能读取this.props
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick (e) {
    // this.props.inverse();
    e.stopPropagation();
    e.preventDefault();
    console.log(this.props.arrange.isCenter)
    if(this.props.arrange.isCenter) {
      this.props.inverse()
    } else {
      this.props.center()
    }
    
     

  };

  render () {
    // console.log(this.props)

    var styleObj = {};
     var imgFigureClassName = 'img-figure';

    // 如果props属性中制定了这张图片的位置，则使用
    if (this.props.arrange) {
      styleObj = this.props.arrange.pos;
    
      imgFigureClassName +=  this.props.arrange.isInverse ? ' is-inverse' : '';
      if(this.props.arrange.isCenter) {
        styleObj.zIndex = 100;
      }

    
    }
    if (this.props.arrange) {      
        styleObj['transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
    }
 
    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>
              {this.props.data.title}
            </p>
          </div>
        </figcaption>
      </figure>
    )
  }
}
// 获取区间内的随机值
function getRangeRandom (low,heigt) {
  return Math.ceil(Math.random() * (heigt - low) + low)
}
//获取0-30度
function get30DegRandom () {
  return((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30))
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
         // {
         //    pos: {
         //      left: '0',
         //      top: '0'
         //    },
         //     rotate:0 旋转角度
         //     isInverse:false
         // }
        ]

    };
    // 翻转图片
    // @param index 输入当前配执行inverse操作的图片对应在数组的index
    // @return {Function} 闭包函数 里面return一个真正被执行的函数
    inverse (index) {
      return function () {
        var imgsArrangeArr = this.state.imgsArrangeArr;
        

        
        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
        
        this.setState({
          imgsArrangeArr:imgsArrangeArr
        });
        
      }.bind(this);

    }



    // 重新布局所有图片
    // @param centerIndex 指定哪个图片居中

    rearrange (centerIndex) {
      // console.log(this.state.imgsArrangeArr)
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
     
          // 先居中// 居中的不用转
          imgsArrageCenterArr[0] = {
            pos:centerPos,
            rotate:0,
            isCenter:true,
            isInverse:false
          }
          
          imgsArrageCenterArr[0].rotate = 0;

           // console.log(this.state.imgsArrangeArr)


          // 上侧状态信息
          topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum -1))
          
          imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum - 1);

          
          // 布局上侧的图片
          imgsArrangeTopArr.forEach(function (value,index) {
            imgsArrangeTopArr[index] = {
              pos :{
                top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
                left: getRangeRandom(vPosRangeX[0],vPosRangeX[1])
              },
              rotate:get30DegRandom(),
              isCenter:false,
              isInverse:false

            }
 
          })
          // 布局左右侧图片
          for (var i = 0,j = imgsArrangeArr.length,k = j / 2;i < j; i++) {
            var hPosRangeLORX = null;

            //一半在左一半在右
            if (i < k) {
              hPosRangeLORX = hPosRangeleftSecX;
            } else {
              hPosRangeLORX = hPosRangerightSecX;
            }

            imgsArrangeArr[i] = {
              pos: {
                top: getRangeRandom(hposRangeY[0],hposRangeY[1]),
              left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
              },
              rotate: get30DegRandom(),
              isCenter:false,
              isInverse:false
              
            }
          }
          if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
          }
          imgsArrangeArr.splice(centerIndex,0,imgsArrageCenterArr[0]);
          
          this.setState({
            imgsArrangeArr: imgsArrangeArr
          })
    };

    // 利用arrange函数，居中对应的index的图片
    // @param index，需要被居中的图片对应的index值
    // @return {Function}

    center (index) {
      return function () {
        this.rearrange (index);
      }.bind(this)
    }



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
      this.state.hPosRange.rightSecX[0] = halfStageW + halfImgW;
      this.state.hPosRange.rightSecX[1] = stageW - halfImgW;
      this.state.hPosRange.y[0] = -halfImgH;
      this.state.hPosRange.y[1] = stageH - halfImgH
      // 计算上侧区域图片位置的取值的范围
      this.state.vPosRange.topY[0] = -halfImgH;
      this.state.vPosRange.topY[1] = halfStageH - halfImgH * 3;
      this.state.vPosRange.x[0] = halfStageW - imgW;
      this.state.vPosRange.x[1] = halfImgW;

      // console.log(this.state.imgsArrangeArr)      
      this.rearrange(0)
    };

  render() { 
     var controllerUnits = [],
        imgFigures = [];
     imagesdatas.forEach(function (value,index) {
        imgFigures.push(<ImgFigure data={value} key={index} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);
        if ( !this.state.imgsArrangeArr[index]) {
          this.state.imgsArrangeArr[index] = {
            pos: {
              left: 0,
              top: 0
            },
            rotate :0,
            isInverse: false,
            isCenter: false
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
