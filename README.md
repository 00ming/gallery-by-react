# gallery-by-react
one photo gallery project based on react<br>
#根据慕课网 “React实战-打造画廊应用” 课程完成

clone 下来先安装依赖然后直接 npm start 就能运行
参考了很多别人的东西<br>
也有自己的写法<br>
第一次用react写项目,虽然有课程教学依然是蛮多坑的 样式方面也很多不熟悉不清楚的地方<br>
react版本不同写法也有一丢丢区别例如新建组件<br>
<code>war xxx =react.createClass 跟 class xxx extends React.Component
要有
constructor(props) {<br>
    super(props);<br>
    this.handleClick = this.handleClick.bind(this);<br>
  }</br>
  才能读 this.props里面的数据
  <code><br>
  还有很多莫名其妙的坑
