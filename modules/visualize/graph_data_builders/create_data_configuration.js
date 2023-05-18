import { buildAreaChartData } from "./area_chart_data_builder.js";
import { buildBubbleChartData } from "./bubble_chart_data_builder.js";

export function createConfiguration(type, rawData, fields, options) {
    config = {
      type: type,
      options: options
    }
    switch (this.type) {
      case 'area':
        config.data = buildAreaChartData(rawData, fields);
        break;
      case 'bar':
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