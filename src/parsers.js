import yaml from 'js-yaml';

const getParserFile = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`Format: '${format}' is't correct!`);
  }
};

export default getParserFile;
