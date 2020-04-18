/*

Used to track Ember > React migration
https://docs.google.com/spreadsheets/d/1QSu6yPcsvLLTrWaIvx3xU5fm_82bqZQi664z0_8-HGY/edit#gid=1990906744

Usage (React):

git log --shortstat --since "2019-01-01" --until "2019-12-31" --ignore-all-space --no-merges \
./apps \
':!*.svg' ':!*.jpg' ':!*.png' ':!*\/schema/*' ':!*gqlTypes.d.ts' \
| grep -e "files\? changed" -e "Author:" | paste -d " "  - - | node ./src/scripts/gitLogParser

Usage (Ember):

(same but with...)
./client-app ./component-library ./console-app ./public-app ./static ./model-library ./style-guide \

Watch out for strange commits with 1000s of files that are subsequently reverted.

*/

const excludedAuthors = ['Renovate Bot'];

let data = '';

const stdin = process.openStdin();
stdin.on('data', function(chunk) {
  data += chunk;
});
stdin.on('end', function() {
  parseTotals(data);
});

// Author: John Doe <jdoe@zenefits.com>  1 file changed, 3 insertions(+), 3 deletions(-)
const regexes = {
  author: /Author: ([^<]+)/,
  files: /(\d+) files? changed/g,
  insertions: /(\d+) insertion/g,
  deletions: /(\d+) deletion/g,
};

const totals = {
  files: 0,
  insertions: 0,
  deletions: 0,
};

function getAuthor(str) {
  const matches = str.match(regexes.author);
  if (matches) {
    return matches[1].trim();
  }
  throw new Error(`no author found: ${str}`);
}

function getCount(str, regex) {
  const matches = str.match(regex);
  if (matches) {
    return parseInt(matches[0], 10);
  }
  return 0;
}

const authorMap = {};

function parseTotals(input) {
  input.split('\n').forEach(line => {
    if (!line) {
      return;
    }
    const author = getAuthor(line);
    if (excludedAuthors.includes(author)) {
      return;
    }

    if (!authorMap[author]) {
      authorMap[author] = { files: 0, insertions: 0, deletions: 0 };
    }

    const files = getCount(line, regexes.files);
    const insertions = getCount(line, regexes.insertions);
    const deletions = getCount(line, regexes.deletions);

    authorMap[author].files += files;
    authorMap[author].insertions += insertions;
    authorMap[author].deletions += deletions;

    totals.files += files;
    totals.insertions += insertions;
    totals.deletions += deletions;
  });
  Object.keys(authorMap).forEach(entry => {
    console.log([entry, authorMap[entry].files, authorMap[entry].insertions, authorMap[entry].deletions].join(','));
  });
  console.log('total,', Object.values(totals).join(','));
}
