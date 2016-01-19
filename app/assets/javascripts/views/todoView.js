var TodoView = Marionette.ItemView.extend({
  tagName: 'div',

  className: 'item container',

  template: _.template('<li class="todo-item"><input type="checkbox" /><span><%= content %></span></li>'),

  intialize: function(options) {
    this.model = options.model;
    this.bindTo(this.model, "change", this.render, this);
    this.render();
  },

  events: {
    'click input[type="checkbox"]': 'toggleState',
    'click li.todo-item': 'showEditBox',
    'keyup .edit-box': 'validateInput',
    'click .cancel': 'cancelEdit',
    'click .save': 'saveEdit'
  },

  toggleState: function(e) {
    $(e.target).next().toggleClass('complete');
  },

  showEditBox: function(e) {
    // hacky way to handle span click events
    if ($(e.target).is('span')) {
      e.target = $(e.target).parent();
      return this.showEditBox(e);
    }

    var $parent  = $(e.target),
        $span    = $parent.find('span'),
        spanVal  = $span.text(),
        $editBox = $('<input class="edit-box" type="text" name="content" /><button class="save">Save</button><button class="cancel">Cancel</button>');

    $span.remove();
    $parent.append($editBox);
    $parent.find('.edit-box').val(spanVal);
  },

  validateInput: function(e) {
    var $val = $(e.target).val();
    
    if (e.which !== 13 || $val.length === 0) {
      return;
    }

    this.updateTodoContent($val);
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