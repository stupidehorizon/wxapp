import * as common from './config-common';
import * as development from './config-development';
import * as production from './config-production';

const CONFIG = {
  "app-debug": true,
};

let config = {};
if (CONFIG['app-debug']) {
  config = development;
} else {
  config = production;
}

for(const key in common) {
  config[key] = common[key];
}

export { config };