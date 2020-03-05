import '@vaadin/vaadin-button';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-text-field';

import MyElement from "./MyElement";
import React from "react";

//import { x-search } from "./x-search";

class AboutPage extends React.Component {
  componentDidMount() {
    let people = [];
    this.refs.addButton.addEventListener('click', e => {
      people = [
        ...people,
        {
          firstName: this.refs.firstName.value,
          lastName: this.refs.lastName.value
        }
      ];
      this.refs.grid.items = people;
      this.refs.firstName.value = '';
      this.refs.lastName.value = '';
    });
  }
  render() {
    return (

      <div className="App">
        <my-component />
        <div className="form">
          <vaadin-text-field label="First Name" ref="firstName" />
          <vaadin-text-field label="Last Name" ref="lastName" />
          <vaadin-button ref="addButton"> Add </vaadin-button>
        </div>
        <vaadin-grid ref="grid">
          <vaadin-grid-column path="firstName" header="First name" />
          <vaadin-grid-column path="lastName" header="Last name" />
        </vaadin-grid>
      </div>
    );
  }
}


export default AboutPage;
