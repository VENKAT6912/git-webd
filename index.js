const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('word-counter')
  .description('CLI tool to count words in a file')
  .version('1.0.0');
program
  .command('words')
  .description('Count number of words in a file')
  .argument('<file>', 'file to count words from')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error('❌ Error:', err.message);
        return;
      }
      const wordCount = data.trim().split(/\s+/).filter(Boolean).length;
      console.log(`✅ There are ${wordCount} words in ${file}`);
    });
  });
program.parse();
