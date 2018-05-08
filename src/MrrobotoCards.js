import React from "react"
// import MrrobotoCards from './MrrobotoCards'
class MrrobotoCards extends React.Component {

  render(){
    console.log(this.props.judgeGame.mrrobotoimages);
    let cards = []
    let leftstyle = 20
    this.props.judgeGame.mrrobotoimages.forEach((card,index) => {
        cards.push(<div className="MrrobotoCards" key={index}>
          <img src={card} alt={"MrrobotoCards"} style={{position: "absolute", left: leftstyle + "%", width: 200, height: 200}}/>
        </div>)
        leftstyle = leftstyle + 12
      }
    )

    return(
      <div>
        <h2>Mr Roboto deck</h2>
        <div className="CardContainer" style={{width: 100 + "%", height: 200 + "px"}}>
          {cards}
        </div>
      </div>
    )
  }


} //class

export default MrrobotoCards

// <div className="CardContainer" style={{width: 100 + "%", height: 200 + "px"}}>
//   {cards}
// </div>
