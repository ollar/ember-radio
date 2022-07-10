import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const message = {
  type: 'info',
  text: 'message text',
};

module('Unit | Service | radio', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let service = this.owner.lookup('service:radio');
    assert.ok(service, 'service exists');
  });

  test('message send works', function (assert) {
    let service = this.owner.lookup('service:radio');
    const messagesNumber = service.messages.length;

    service.send(message);

    const newMessagesNumber = service.messages.length;

    assert.strictEqual(
      newMessagesNumber,
      messagesNumber + 1,
      'message number increased'
    );
  });

  test('message remove works', function (assert) {
    let service = this.owner.lookup('service:radio');

    service.send(message);

    const messagesNumber = service.messages.length;

    service.removeMessage(message);

    const newMessagesNumber = service.messages.length;

    assert.strictEqual(
      newMessagesNumber,
      messagesNumber - 1,
      'message removed from list'
    );
  });
});
