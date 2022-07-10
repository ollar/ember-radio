import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { run, schedule } from '@ember/runloop';

const types = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

const texts = {
  INFO: 'This is a info message',
  WARNING: 'This is a warning message',
  ERROR: 'This is a error message',
};

module('Integration | Component | radio-speaker', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<RadioSpeaker />`);

    assert.ok(this.element, 'smoke test');
  });

  test('sending messages works', async function (assert) {
    assert.expect(6);
    const radioService = this.owner.lookup('service:radio');

    await render(hbs`
      <RadioSpeaker as |Radio|>
        {{#each Radio.messages as |message|}}
          <Radio.Message @message={{message}} />
        {{/each}}
      </RadioSpeaker>
    `);

    Object.keys(types).map((type) => {
      run(() => {
        radioService.send({
          type: types[type],
          text: texts[type],
        });
      });

      const message = this.element.querySelector(
        `[data-test-message].${types[type]}`
      );
      assert.ok(message, 'message appeared');
      assert.ok(
        message.textContent.trim().match(texts[type]),
        `message ${types[type]} text shown`
      );
    });
  });

  test('message close works', async function (assert) {
    assert.expect(1);
    const radioService = this.owner.lookup('service:radio');

    await render(hbs`
      <RadioSpeaker as |Radio|>
        {{#each Radio.messages as |message|}}
          <Radio.Message @message={{message}} />
        {{/each}}
      </RadioSpeaker>
    `);

    run(() => {
      radioService.send({
        type: types.INFO,
        text: texts.INFO,
      });
    });

    let message = this.element.querySelector('[data-test-message]');
    const close = message.querySelector('[data-test-message-close]');

    await close.click();

    schedule('afterRender', async () => {
      message = this.element.querySelector('[data-test-message]');
      assert.notOk(message, 'message disappeared');
    });
  });
});
