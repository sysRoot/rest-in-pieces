import React from 'react';
import ReactDOM from 'react-dom';
import { customElement, inject, bindable, noView } from 'aurelia-framework';

import SynapseApp from '../react-components/synapse-app';

@noView()
@inject(Element)
@bindable('data')
@customElement('synapse-app')
export class ReactElement {
  reactComponent = {};

  constructor(element) {
    this.element = element;
  }

  render() {
    this.reactComponent = ReactDOM.render(
      <SynapseApp />,
      this.element
    );
  }

  bind() {
    this.render();
  }

  unbind() {
    ReactDOM.unmountComponentAtNode(this.element);
  }

  /**
   * Data Changed
   *
   * An automatic callback function when our "data"
   * bindable value changes. We need to rebind the React
   * element to get the new data from the ViewModel.
   *
   * @param {any} newVal The updated data
   * @returns {void}
   *
   */
  dataChanged(newVal) {
    this.bind();
  }
}
