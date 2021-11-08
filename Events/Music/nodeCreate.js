const { Node } = require('erela.js');

module.exports = class NodeCreate {
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
        `[NODECREATE] The ${node.options.identifier} node has been successfully created.`
      );
    } catch (error) {
      console.error(`[NODECREATE] ${error.message}.`);
    }
  }
};
