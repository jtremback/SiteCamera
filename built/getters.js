'use strict';

exports.selectedSite = [['sites', 'selected'], ['sites', 'list'], function (selected, list) {
  return list[selected];
}];

exports.sites = [['sites', 'list']];