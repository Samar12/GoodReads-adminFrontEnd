import React from "react";
import { Tab, Tabs, Row, Col } from "react-bootstrap";
import { CategoriesList } from "./../Categories/list";
import { MyContext } from "./../../../App";
import { AuthorList } from "../Authors/list";

const uuidv4 = require("uuid/v4");

export default class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MyContext.Consumer>
        {value => (
          <Row className="pt-2 ">
            <Col>
              <nav className="wrapper tab tab-wrapper">
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  onSelect={this.handleSelect}
                  className="pt-3 pl-3 pr-2 d-flex justify-content-center">
                  <Tab key={uuidv4()} eventKey="Categories" title="Categories" className=" tab-panelp-3 m-3">
                    <CategoriesList addCat={value.addCategory} searchCat={value.searchCategory} />
                  </Tab>
                  <Tab eventKey={2} title="Author">
                    <AuthorList />
                  </Tab>
                </Tabs>
              </nav>
            </Col>
          </Row>
        )}
      </MyContext.Consumer>
    );
  }
}
