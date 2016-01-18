var TodoView = Marionette.ItemView.extend({
  tagName: 'li',
  class: 'todo-item',
  template: _.template('<input type="checkbox" /><span><%= content %></span>'),
  intialize: function(options) {
    this.model = options.model;
    this.render();
  },
  events: {
    'click input[type="checkbox"]': 'toggleState',
    'click span': 'showEditBox',
    'keyup .edit-box': 'validateInput',
    'click .cancel': 'cancelEdit',
    'click .save': 'saveEdit'
  },
  toggleState: function(e) {
    $(e.target).next().toggleClass('complete');
  },
  showEditBox: function(e) {
    var $currentVal = $(e.target).text();
    var $parent = $(e.target).parent();

    $(e.target).remove();
    
    var $editBox = $('<input class="edit-box" type="text" name="content" /><button class="cancel">Cancel</button><button class="save">Save</button>');
    $parent.append($editBox);

    $parent.find('.edit-box').val($currentVal);
  },
  validateInput: function(e) {
    if (e.which !== 13) {
      return;
    }

    var $val = $(e.target).val();

    if ($val.length === 0) {
      return;
    }

    updateTodoContent($val);
  },
  updateTodoContent: function(value) {
    this.model.set('content', value);
    this.model.sync('update', this.model);
  },
  cancelEdit: function(e) {
    this.model.fetch();
    this.render();
  },
  saveEdit: function(e) {
    $val = $(e.target).parent().find('input.edit-box').val();
    if ($val.length === 0) {
      return;
    }
    this.updateTodoContent($val);
    this.render();
  }
});