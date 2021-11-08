const { Node } = require('erela.js');

module.exports = class NodeReconnect {
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
        `[NODERECONNECT] The ${node.options.identifier} node has reconnected.`
      );
    } catch (error) {
      console.log(`[NODERECONNECT] ${error.message}.`);
    }
  }
};
