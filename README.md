# ember-radio

Simple notification service for emberjs (no styling, no extra libs).


## Compatibility

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


## Installation

```
ember install ember-radio
```


## Usage

First of all add component to your template (application.hbs).

```
<RadioSpeaker @duration={{5000}} as |Radio|>

...some markup...

{{#each Radio.messages as |message|}}
    <Radio.Message @message={{message}} />
{{/each}}

...some markup...

</RadioSpeaker>
```

Radio - is an object with `<Message />` component and `messages` list array.

You can push messages to the service with:

```
import { inject as service } from '@ember/service';

export default class SomeComponent extends Component {
    @service radio;

    @action
    someAction() {
        this.radio.send({
            type: 'info',
            text: 'You are my hero!'
        });
    }
    ...

```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
