const fs = require('fs');
const data = JSON.parse(fs.readFileSync('rb_full_list.json', 'utf8'));
const backgrounds = data.items.filter(item => 
  item.name.toLowerCase().includes('background') || 
  item.description.toLowerCase().includes('background') ||
  item.name.toLowerCase().includes('noise') ||
  item.name.toLowerCase().includes('waves') ||
  item.name.toLowerCase().includes('grid')
);
console.log(JSON.stringify(backgrounds, null, 2));
