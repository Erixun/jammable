import React from "react";
import './Track.css';

export class Track extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isRemoval: false }
    this.renderAction = this.renderAction.bind(this)
  }

  renderAction() {
    this.setState({ isRemoval: !this.state.isRemoval })
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>
            {this.props.name}
          </h3>
          <p>
            {this.props.artist} | {this.props.album}
          </p>
        </div>
        <button className="Track-action" onClick={this.renderAction}>
          {this.state.isRemoval ? '-' : '+'}
        </button>
      </div>
    )
  }
}