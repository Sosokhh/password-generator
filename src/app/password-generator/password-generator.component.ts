 import {Component} from '@angular/core';
import {NotificationService} from "../shared/notification.service";

export class PasswordCharacters {
  uppercase: boolean = true;
  lowercase: boolean = true;
  numbers: boolean = true;
  symbols: boolean = true;
}

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss']
})
export class PasswordGeneratorComponent {
  characters: PasswordCharacters = new PasswordCharacters();
  result: string = '';
  length: number = 20;
  randomFunc: { [key: string]: () => string } = {
    lowercase: this.getRandomLower.bind(this),
    uppercase: this.getRandomUpper.bind(this),
    numbers: this.getRandomNumber.bind(this),
    symbols: this.getRandomSymbol.bind(this)
  };

  constructor(private notificationService: NotificationService) {}


  generatePassword(characters: PasswordCharacters, length: number) {
    let generatedPassword = '';
    const typesCount = Number(characters.lowercase) + Number(characters.uppercase) + Number(characters.numbers) + Number(characters.symbols);
    const typesArr = [
      {lowercase: characters.lowercase},
      {uppercase: characters.uppercase},
      {numbers: characters.numbers},
      {symbols: characters.symbols}
    ]
      .filter(item => Object.values(item)[0]);
    if (typesCount === 0) {
      this.notificationService.showToast('error', 'Please select at least one option');
      return;
    }

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        generatedPassword += this.randomFunc[funcName]();
      })
    }
    this.result = generatedPassword.slice(0, length);
    this.notificationService.showToast('success', 'Password generated successfully');
  }


  getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }


  eraseResult() {
    this.result = '';
    this.notificationService.showToast('success', 'Password erased')
  }
}
