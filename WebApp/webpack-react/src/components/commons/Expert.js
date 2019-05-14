import React from "react";

export default class Expert extends React.Component {
  // render
  render() {
    const {name,description,img,link} = this.props.expert;
    return (
        <div className="col">
          <div className="card text-secondary">
            <div className="card-body">
              <img src={img} alt="" className="img-fluid rounded-circle w-50 mb-3"/>
              <h3>{name}</h3>
              <p>{description}</p>
              <hr/>
              <div className="d-flex justify-content-center">
                <div className="p-4">
                  <a className="btn-floating btn-tw mx-1" href={link}>
                    <i className="fab fa-github fa-2x"> </i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
