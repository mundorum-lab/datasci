import { html, css, Oid, OidUI } from '/lib/oidlib-dev.js'

export class SomeoneOid extends OidUI {
  _onClick () {
    this._notify('click', {value: this.name})
  }
}

Oid.component(
{
  id: 'ex:someone',
  element: 'someone-oid',
  properties: {
    name: {default: 'nobody'}
  },
  styles: css`
  .mybutton {
    border: 1px solid rgb(30 30 30);
    border-radius: 0.375rem;
    margin: 0.5rem;
    background-color: white;
    color: rgb(30 30 30);
    padding: 1rem 0.5rem;
  }
  .mybutton:hover {
    border: 2px solid black;
    color: black;
    font-weight: bolder;
    cursor: pointer;
  }`,
  template: html`<button class="mybutton" @click>I am {{this.name}}</button>`,
  implementation: SomeoneOid
})