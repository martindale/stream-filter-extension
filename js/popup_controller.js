/** 
 * Popup Controller that places stats from the current session in.
 */
PopupController = function() {
  this.bkg = chrome.extension.getBackgroundPage().controller;
  window.addEventListener('load', this.onLoad.bind(this), false);
};
PopupController.prototype.onLoad = function() {
  var filterSessions = this.bkg.getSessionFilters();
  var filterDOM = document.querySelector('#filter-results > tbody');
  filterDOM.innerHTML = '';
  
  var found = false;
  for (var key in filterSessions) {
    if (filterSessions.hasOwnProperty(key)) {
      var item =  filterSessions[key];
      var tr = document.createElement('tr');
      var isInclusion = item.filter.indexOf('+') == 0;
      tr.innerHTML = '<td>' +  item.user_name + '</td>' + 
          '<td class="' + (isInclusion ? 'inclusion' : 'exclusion')+ '">' + item.filter.substring(1) + '</td>' + 
          '<td><a href="' + item.url + '" onclick="controller.openLink(this);">link</a></td>' +
          '<td>' + item.time + '</td>';
      filterDOM.appendChild(tr);
      found = true;
    }
  }
  
  if (!found) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="4" style="text-align: center;">No filtered results. <br />You might have to refresh your Stream.</td>';
    filterDOM.appendChild(tr);
  }
};
PopupController.prototype.openLink = function(e){
  window.open(e.href);
};
PopupController.prototype.openOptions = function(e) {
  window.open(chrome.extension.getURL('options.html'));
};
PopupController.prototype.markAsRead = function(e) {
  this.bkg.markAsRead();
  this.onLoad();
};

var controller = new PopupController();