import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ChatButtonOid extends OidUI {

  connectedCallback(){
    super.connectedCallback()
    this._connect('itf:chat','chat',this)
  }
  async _copyAndExplain(){
   
    let text = await this._invoke('itf:chat','prompt', {value:parseInt(this.componentid)});
    console.log(text)
  //   navigator.clipboard.writeText(text).then(function() {
  //   console.log('Async: Copying to clipboard was successful!');
  //   alert("Prompt copied to clipboard!")
  //   }, function(err) {
  //   console.error('Async: Could not copy text: ', err);
  //   });
  //   window.open('https://chat.openai.com/', '_blank').focus();
  }
}

Oid.component(
{
  id: 'chat-button',
  element: 'chat-button-oid',
  properties: {
    componentid:{}
  },
  receive: {explain: '_copyAndExplain'},
  template: html`    <button-oid label="Copy Prompt and open ChatGPT"
  publish="click~chat/explain">
</button-oid>`,
  implementation: ChatButtonOid
})