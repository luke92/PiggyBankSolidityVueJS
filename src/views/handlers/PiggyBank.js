import Vue from 'vue';
import PiggyBankInstance from '@/../build/contracts/PiggyBank.json';

export default class PiggyBank {
  constructor() {
    this.internalAddress = '0xcfeb869f69431e42cdb54a4f4f105c19c080a601';
    this.instance = Vue.web3.eth.Contract(PiggyBankInstance.abi, this.address);
  }

  get address() {
    return this.internalAddress;
  }

  get eventualOwner() {
    return new Promise((resolve, reject) => {
      this.instance.methods.owner()
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  deposit(amount) {
    return new Promise((resolve, reject) => {
      const value = Vue.web3.utils.toWei(amount);
      const signature = this.instance.methods.deposit();
      Vue.web3.eth.getAccounts()
        .then(([from]) => Promise.all([
          from,
          signature.estimateGas({ from, value }),
        ]))
        .then(([from, gas]) => signature.send({ from, gas, value }))
        .then(resolve)
        .catch(reject);
    });
  }

  withdraw() {
    return new Promise((resolve, reject) => {
      const signature = this.instance.methods.withdraw();
      Vue.web3.eth.getAccounts()
        .then(([from]) => Promise.all([
          from,
          signature.estimateGas({ from }),
        ]))
        .then(([from, gas]) => signature.send({ from, gas }))
        .then(resolve)
        .catch(reject);
    });
  }
}
