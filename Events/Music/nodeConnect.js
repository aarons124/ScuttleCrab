const { Node } = require('erela.js');

module.exports = class NodeConnect {
  constructor(client) {
    this.client = client;
  }
  /**
   *
   * @param {Node} node
   */
  async run(node) {
    /**
     * @type {import('../../Class/ClassClient')}
     */
    const client = this.client;

    try {
      console.log(
        `[NODECONNECT] The node ${node.options.identifier} has successfully connected.`
      );
    } catch (error) {
      console.error(`[NODECONNECT] ${error.message}.`);
    }
  }
};
