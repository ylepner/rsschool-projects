import html from './index.html';
import './style.css';
import { Component } from '../component';

export default class Settings extends Component {
  constructor(params) {
    super();
    this.onSaveSettings = params.onSaveSettings;
    this.timerInputValue = params.timerInputValue;
    this.volumeInputValue = params.volumeInputValue;
  }

  getTemplate() {
    return html;
  }

  readValue(checkboxSelector, inputSelector) {
    const checkbox = this.element.querySelector(checkboxSelector);
    if (!checkbox.checked) {
      return null;
    }
    return Number(this.element.querySelector(inputSelector).value);
  }

  writeValue(checkboxSelector, inputSelector, value, textSelector) {
    const checkbox = this.element.querySelector(checkboxSelector);
    const input = this.element.querySelector(inputSelector);
    if (value == null) {
      checkbox.checked = false;
      input.disabled = true;
      input.value = 10;
    } else {
      checkbox.checked = true;
      input.disabled = false;
      input.value = value;
    }
    if (textSelector) {
      this.element.querySelector(textSelector).innerText = input.value;
    }
  }

  renderInternal(element) {
    this.element = element;
    this.writeValue('.volume-checked', '.volume-input', this.volumeInputValue);
    this.writeValue('.timer-checked', '.timer-input', this.timerInputValue, '.timer-control-text');
    element.querySelector('.save-btn').onclick = () => {
      this.onSaveSettings(this.readValue('.timer-checked', '.timer-input'), this.readValue('.volume-checked', '.volume-input'));
    };
    const timerInput = element.querySelector('.timer-input');
    timerInput.addEventListener('input', () => {
      element.querySelector('.timer-control-text').innerText = timerInput.value;
    });
    element.querySelector('.timer-checked').addEventListener('change', function () {
      if (!this.checked) {
        element.querySelector('.timer-control-text').value = 0;
        element.querySelector('.timer-input').disabled = true;
        element.querySelector('.timer-input').classList.add('disabled');
      } else {
        element.querySelector('.timer-input').disabled = false;
        element.querySelector('.timer-input').classList.remove('disabled');
      }
    });
    const audio = element.querySelector('audio');
    const volumeInput = element.querySelector('.volume-input');
    element.querySelector('.volume-checked').addEventListener('change', function () {
      if (this.checked) {
        audio.play();
        volumeInput.disabled = false;
        volumeInput.classList.remove('disabled');
      } else {
        audio.pause();
        volumeInput.disabled = true;
        volumeInput.classList.add('disabled');
      }
    });
    volumeInput.addEventListener('input', function () {
      const value = this.value;
      audio.volume = value / 100;
      if (audio.volume > 0) {
        audio.muted = false;
      } else {
        audio.muted = true;
      }
    });
  }
}


