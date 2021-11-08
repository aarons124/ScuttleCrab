function _humanizePermisson(perm) {
  perm = perm.replace(/[A-Z]/g, (x) => ` ${x}`);
  if (perm.split(' ').join('').includes('VAD'))
    perm = perm.replace(new RegExp('V A D', 'i'), 'Voice Activity Detection');
  perm = perm.replace(/Voice /i, '');
  if (perm.split(' ').join('').includes('TTS'))
    perm = perm.replace(new RegExp('T T S', 'i'), 'Text-To-Speech');
  perm = perm[0].toUpperCase() + perm.slice(1).toLowerCase();

  return perm;
}

module.exports = _humanizePermisson;
