#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Utility categorization mapping
const CATEGORIES = {
  'Array': [
    'append', 'at', 'chunkify', 'columnify', 'compact', 'deleteAt', 'filter', 'find',
    'findIndex', 'findLast', 'findLastIndex', 'firstItem', 'flatten', 'groupBy',
    'hasEqualItems', 'hasRepeatedItems', 'includes', 'includesItems', 'indexOf',
    'join', 'lastIndexOf', 'lastItem', 'length', 'map', 'maxItem', 'minItem',
    'partition', 'prepend', 'reduce', 'reduceRight', 'reject', 'reverse', 'slice',
    'sort', 'unique'
  ],
  'String': [
    'capitalize', 'endsWith', 'join', 'length', 'replace', 'split', 'startsWith',
    'toLowerCase', 'toString', 'toUpperCase'
  ],
  'Object': [
    'keys', 'mapObject', 'omit', 'path', 'pick', 'prop', 'values'
  ],
  'Number': [
    'add', 'clamp', 'divide', 'multiply'
  ],
  'Function': [
    'complement', 'constant', 'debounce', 'flow', 'identity', 'noop', 'pipe',
    'protect', 'throttle'
  ],
  'Type Guard': [
    'is'
  ],
  'Assertion': [
    'assert', 'deepEqual', 'equal'
  ],
  'Logic': [
    'every', 'none', 'some'
  ],
  'Utility': [
    'castArray', 'clone', 'deepClone', 'defaultTo', 'lruCache', 'parsePosition',
    'subscription'
  ]
};

function generateUtilitiesMarkdown() {
  const categories = Object.entries(CATEGORIES).map(([name, utilities]) => ({
    name,
    count: utilities.length,
    utilities: utilities.sort()
  })).sort((a, b) => b.count - a.count);

  let markdown = '| Category | Count | Examples |\n';
  markdown += '|----------|-------|----------|\n';

  categories.forEach(({ name, count, utilities }) => {
    const examples = utilities.slice(0, 3).join(', ');
    const more = count > 3 ? ` +${count - 3} more` : '';
    markdown += `| ${name} | ${count} | \`${examples}\`${more} |\n`;
  });

  return markdown;
}

function updateReadme() {
  const readmePath = path.join(__dirname, '..', 'README.md');
  const readme = fs.readFileSync(readmePath, 'utf-8');

  const table = generateUtilitiesMarkdown();
  const placeholder = /### Utilities Overview[\s\S]*?(?=\n### |\n## |\Z)/;
  const replacement = `### Utilities Overview

**79+ utilities** organized by category:

${table}`;

  const updated = readme.replace(placeholder, replacement.trim());

  if (updated !== readme) {
    fs.writeFileSync(readmePath, updated);
    console.log('✓ README.md updated with utilities table');
  } else {
    console.log('✓ Utilities table already up-to-date');
  }
}

if (require.main === module) {
  updateReadme();
}

module.exports = { generateUtilitiesMarkdown };
