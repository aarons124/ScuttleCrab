module.exports = class Raw {
  constructor(client) {
    this.client = client;
  }
  async run(d) {
    const client = this.client;
    client._manager.updateVoiceState(d);
  }
};
