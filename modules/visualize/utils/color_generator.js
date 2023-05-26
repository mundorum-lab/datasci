const colorScale = d3.interpolateInferno;

const colorRangeInfo = {
  colorStart: 0.2,
  colorEnd: 1,
  useEndAsStart: false,
}; 

function calculatePoint(i, intervalSize) {
  var { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
  return (useEndAsStart
    ? (colorEnd - (i * intervalSize))
    : (colorStart + (i * intervalSize)));
}

/* Must use an interpolated color scale, which has a range of [0, 1] */
export function interpolateColors(dataLength) {
  var { colorStart, colorEnd } = colorRangeInfo;
  var colorRange = colorEnd - colorStart;
  var intervalSize = colorRange / dataLength;
  var i, colorPoint;
  var colorArray = [];

  for (i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize);
    colorArray.push(colorScale(colorPoint));
  }

  return colorArray;
}  