const { ESLint } = require('eslint');

/**
 * removes files that are mentionde in .eslintigonre
 * @param {string[]} files staged files names
 */
const getFilesToLint = async (files) => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(files.map(file => eslint.isPathIgnored(file)));
  return files.filter((_, index) => !isIgnored[index]);
}

module.exports = {
  'src/**/*.(js|ts)': async (filenames) => {
    const filesToLint= await getFilesToLint(filenames);
    return [
      `eslint ${filesToLint.join(' ')} --rule "{no-console: 2, no-alert: 2, no-debugger: 2}"`,
      `prettier ${filenames.join(' ')} -write`,
      'git add',
    ];
  },
};
