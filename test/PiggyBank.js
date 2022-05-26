const PiggyBank = artifacts.require('PiggyBank');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

contract('PiggyBank', (accounts) => {
  const [
    owner,
    alice,
  ] = accounts;
  describe('Deployment', () => {
    it('should get a piggy bank deployed by the owner', () => {
      return PiggyBank.deployed()
        .then((instance) => {
          piggyBank = instance;
          return instance.owner();
        })
        .then((registeredOwner) => {
          expect(registeredOwner).to.eq(owner);
        });
    });
  });
  describe('Operation', () => {
    it('should allow anyone to supply ether', () => {
      return piggyBank.deposit({ value: web3.utils.toWei('1') })
        .then((result) => {
          expect(result.tx).to.match(/0x[a-fA-F0-9]{64}/);
          return piggyBank.deposit({ from: alice, value: web3.utils.toWei('3') });
        })
        .then((result) => {
          expect(result.tx).to.match(/0x[a-fA-F0-9]{64}/);
        });
    });
    it('should allow the owner to withdraw their money', () => {
      return piggyBank.withdraw()
        .then((result) => {
          expect(result.tx).to.match(/0x[a-fA-F0-9]{64}/);
          return web3.eth.getBalance(owner);
        })
        .then(web3.utils.fromWei)
        .then(parseFloat)
        .then((balance) => {
          expect(balance).to.greaterThan(100);
        });
    });
    it('should avoid anyone trying to withdraw money from the piggy bank', () => {
      return expect(piggyBank.withdraw({ from: alice }))
        .to.be.eventually.rejectedWith('You are not the rightful owner');
    });
  });
});
