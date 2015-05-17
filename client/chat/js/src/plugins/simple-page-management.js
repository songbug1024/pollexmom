/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/17
 */
var $ = require('jquery');
var allPages = {};

function changePage(options) {
  options = options || {};

  var id = options.id;
  var viewCreator = options.viewCreator;
  var existedPage = $('#' + id);
  var view;
  var containerEl = $('body');
  var page = allPages[id];

  allPages[id] = page = page || {};
  page.cache = options.cache;
  page.removeWhenHide = options.removeWhenHide;
  page.refresh = options.refresh;
  page.hideNavbar = options.hideNavbar || false;

  containerEl.attr('data-page', id);
  if (!existedPage || existedPage.length <= 0) {
    view = viewCreator(options.viewCreatorOptions);
    containerEl.append(view.el);
    existedPage = view.$el;

    if (page.cache) {
      page.view = view;
    }

  } else {
    if (page.refresh && page.cache) {
      page.view.trigger('refresh');
    }
  }

  var activePageEl = $('body .active[data-role="page"]');
  var activePageId = activePageEl.attr('id');
  var activePage = allPages[activePageId];

  existedPage.fadeIn(350, function () {
    existedPage.addClass('active');
  });

  activePageEl.fadeOut(350, function () {
    activePageEl.removeClass('active');

    if (activePage.removeWhenHide) activePageEl.remove();
  });
}

exports.changePage = changePage;