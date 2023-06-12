export function getRandomColors(quantity){
    let colors = []
    let i;
    for(i=0; i<quantity; i++){
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        colors.push('#' + randomColor)
    }
    return colors
}