export function generateWaitingHtml(message) {
   return `<div style="width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #f0f0f0;
    border-radius: 10px;">
   <img style="width: 64px" src="./assets/404621.png">
   <div style="height: 50px"></div>
   <div style="margin-left: 24px;
   margin-right: 24px;
   font-size: 20px;
   text-align: center; color: rgb(78, 78, 78);">${message}</div>
</div>`
}

export function generateErrorHtml(message) {
    return `<div style="width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #f0f0f0;
    border-radius: 10px;">
    <img style="width: 64px" src="./assets/1463173.png">
    <div style="height: 40px"></div>
    <div style="margin-left: 24px;
    margin-right: 24px;
    font-size: 20px;
    text-align: center;
    color: #f25a6e;">Error!</div>
    <div style="margin-left: 24px;
    margin-right: 24px;
    font-size: 20px;
    text-align: center;
    color: #f25a6e;">${message}</div>
 </div>`
 }