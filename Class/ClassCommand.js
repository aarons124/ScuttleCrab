class ScuttleCommandClass {
  constructor(
    client,
    {
      commandName = null,
      commandAliases = [],
      commandDescription = null,
      commandUsage = null,
      commandUsageExample = null,
      commandCategory = null,
      commandCooldown = 0,
      commandPermissionsBot = [],
      commandPermissionsUser = [],
      onlyNsfwChat = false,
      argsReq = false,
      voteReq = false,
      onlyDevs = false,
      isEnable = true,
    }
  ) {
    this.client = client;
    this._information = {
      commandName,
      commandAliases,
      commandDescription,
      commandUsage,
      commandUsageExample,
      commandCategory,
      commandCooldown,
    };
    this._configuration = {
      commandPermissionsBot,
      commandPermissionsUser,
      onlyNsfwChat,
      argsReq,
      voteReq,
      onlyDevs,
      isEnable,
    };
  }
}

module.exports = ScuttleCommandClass;
