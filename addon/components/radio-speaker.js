import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class RadioSpeakerComponent extends Component {
  @service radio;

  @action
  initRadio(el) {
    this.radio.initRadio({
      el,
      duration: this.args.duration,
    });
  }

  @action
  handleMouseIn(message) {
    this.radio.messageHidePause(message);
  }

  @action
  handleMouseOut(message) {
    this.radio.messageHideResume(message);
  }

  @action
  handleClick(message, e) {
    e.preventDefault();
    this.radio.removeMessage(message);
  }
}
