import { observable, computed, autorun, action } from 'mobx';

export class AppState {
  @observable count = 0;
  @observable name = 'jocky'
  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }
  @action add() {
    this.count += 1
  }
  @action changeName(event) {
    this.name = event
  }
}

const appState = new AppState();

autorun(() => {
  console.log(appState.msg);
})

export default appState;
