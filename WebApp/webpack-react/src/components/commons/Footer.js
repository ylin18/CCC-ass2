import React from "react";

export default class Footer extends React.Component {
  // render
  render() {
    return (
      <footer className="bg-dark page-footer font-small special-color-dark pt-4">
        <div className="container">
          <ul className="list-unstyled list-inline text-center">
            <li className="list-inline-item">
              <a className="btn-floating btn-tw mx-1" href="https://github.com/DefangS/CCC-ass2">
                <i className="fab fa-github fa-3x"> </i>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-copyright text-center py-3">
        © Supported by COMP90024 Team 37
        </div>

      </footer>
    );
  }
}
