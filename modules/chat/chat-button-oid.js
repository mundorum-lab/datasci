import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ChatButtonOid extends OidUI {
  copyAndExplain(){
    var text = this.prompt;
    navigator.clipboard.writeText(text).then(function() {
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
    prompt: {default : 'teste do prompt'},
  },
  receive: {explain: 'copyAndExplain'},
  implementation: ChatButtonOid
})