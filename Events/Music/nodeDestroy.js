const { Node } = require('erela.js');

module.exports = class NodeDestroy {
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
        `[NODEDESTROY] The ${node.options.identifier} node has been destroyed`
      );
    } catch (error) {
      console.error(`[NODEDESTROY] ${error.message}.`);
    }
  }
};
