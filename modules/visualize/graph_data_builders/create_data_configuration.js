import { buildAreaChartData } from "./area_chart_data_builder.js";
import { buildBubbleChartData } from "./bubble_chart_data_builder.js";
import { buildBarChartData } from "./bar_chart_data_builder.js";

export function createConfiguration(type, rawData, fields, options) {
    let config = {
      type: type,
      options: options
    }
    fields = JSON.parse(fields)
    switch (type) {
      case 'area':
        config.type = 'line'
        config.data = buildAreaChartData(rawData, fields);
        break;
      case 'bar':
        config.type = 'bar'
        config.data = buildBarChartData(rawData, fields);
        break;
      case 'bubble':
        config.data = buildBubbleChartData(rawData, fields);
        break;
      case 'doughnut':
        break;
      case 'pie':
        break;
      case 'line':
        break;
      case 'polar':
        break;
      case 'radar':
        break;
      case 'scatter':
        break;
      default:
        break;
    }
    return config
  }