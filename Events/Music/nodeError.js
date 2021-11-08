module.exports = class NodeError {
  constructor(client) {
    this.client = client;
  }
  async run(node, error) {
    /**
     * @type {import('../../Class/ClassClient')}
     */
    const client = this.client;

    console.error(`[NODEERROR] ${error.message}.`);
  }
};
