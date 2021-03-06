import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForComponent('col-pick', 'ColPickComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function() {
  expect(2);

  var component = this.subject();
  equal(component._state, 'preRender');

  this.append();
  equal(component._state, 'inDOM');
});

test('clicking within opens the popup', function() {
  var component = this.subject();

  this.append();

  var popup = component.popup();

  ok(!popup.is(':visible'), 'expected popup NOT to be visible');

  Ember.run(component.$(), 'trigger', 'click');

  ok(popup.is(':visible'), 'expected popup to be visible');
});

test('destroying no longer leaks the popup', function() {
  var component = this.subject();

  this.append();

  var popup = component.popup();

  Ember.run(component, 'destroy');

  equal(Ember.$(popup.selector).length, 0);
});

function style(selector, scope) {
  return Ember.$.trim(Ember.$(selector, scope).attr('style'));
}

test("two way binding with colpick", function() {
  var component = this.subject();

  this.append();

  var popup = component.popup();

  Ember.run(component, 'set', 'value', '000000');

  equal(style('.colpick_new_color', popup), 'background-color: rgb(0, 0, 0);', 'a');
  equal(style('.colpick_current_color', popup), 'background-color: rgb(0, 0, 0);', 'b');

  Ember.run(component, 'set', 'value', 'FFFFFF');

  equal(style('.colpick_new_color', popup), 'background-color: rgb(255, 255, 255);');
  equal(style('.colpick_current_color', popup), 'background-color: rgb(255, 255, 255);');
});
