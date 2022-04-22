module.exports = {
  'src/**/*.(js|jsx|ts|tsx)': async (filenames) => {
    return [
      `prettier ${filenames.join(' ')} -write`,
      'git add',
    ];
  },
};
