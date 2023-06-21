import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ChatButtonOid extends OidUI {

  connectedCallback(){
    super.connectedCallback()
    this._connect('itf:chat','chat',this)
    this._connect('itf:oid',this.componentid,this)
  }
  async connectionReady(cInterface,id,component){
    super.connectionReady(cInterface,id,component)
    console.log("connected to chat!")
    console.log(`itf = ${cInterface} id = ${id} component = ${component.id}`)
    if(cInterface=='itf:chat' && id=='chat' && component.id==`chat`){
      // console.log("trying to connect to component!")
      await this._invoke('itf:chat','connect',{value:parseInt(this.componentid)})
      console.log("trying to connect to component!")
    }
  }
  async _copyAndExplain(){
    // let data = await this._invoke('itf:oid','get',{property:'table'}) 
    // console.log(`data=${data}`)
    let text = await this._invoke('itf:chat','prompt', {value:parseInt(this.componentid)});
    console.log(`text: ${text.value}`)
    navigator.clipboard.writeText(text.value).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    alert("Prompt copied to clipboard!")
    }, function(err) {
    console.error('Async: Could not copy text: ', err);
    });
    window.open('https://chat.openai.com/', '_blank').focus();
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