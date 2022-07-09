import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service radio;

  @action
  sendMessage() {
    this.radio.send({
      type: 'info',
      text: 'This is a normal message',
    });
  }

  @action
  sendWarning() {
    this.radio.send({
      type: 'warning',
      text: 'This is a warning message',
    });
  }

  @action
  sendError() {
    this.radio.send({
      type: 'error',
      text: 'This is a error message',
    });
  }
}
