import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RadioService extends Service {
    @tracked messages = [];

    @action
    initRadio({ el, duration }) {
        this.el = el;
        this.duration = duration;
    }

    @action
    send(message) {
        message.play = Date.now();
        message.duration = this.duration;

        message.closeTimeout = setTimeout(this.removeMessage, message.duration, message);
        this.messages = [message, ...this.messages];
    }

    @action
    removeMessage(message) {
        this.messages = this.messages.filter(item => item !== message);
    }

    @action
    messageHidePause(message) {
        if (message.closeTimeout) clearTimeout(message.closeTimeout);
        message.pause = Date.now();
        message.duration = message.duration - (message.pause - message.play);
    }

    @action
    messageHideResume(message) {
        message.play = Date.now();
        message.closeTimeout = setTimeout(this.removeMessage, message.duration, message);
    }
}
