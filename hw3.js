const fs = require("fs");
const path = require("path");
const { argv } = require("process");
function nodeTree(dir, depth, prefix = "", isLast = true) {
  const items = fs.readdirSync(dir);

  let result = "";
  let filesQuantity = 0;
  let directoriesQuantity = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    const isDirectory = stats.isDirectory();
    isDirectory ? directoriesQuantity++ : filesQuantity++;
     result += prefix;
    /*isLast ? (result += "└── ") : (result += "├── "); */
    result +=  isLast ? '└── ': '├── ';
    result += item + "\n";

    if (isDirectory && (depth === -1 || depth > 0)) {
      const isLastItem = i === items.length - 1;
      const nodeTreeResult = nodeTree(
        itemPath,
        depth - 1,
        prefix + (isLastItem ? "   " : "│   "),
        isLastItem,
      );
      const childResult = nodeTreeResult.result;
      const childFiles = nodeTreeResult.files;
      const childDirectories = nodeTreeResult.directories;
      result += childResult;
      filesQuantity += childFiles;
      directoriesQuantity += childDirectories;
    }
  }
  return { result, files: filesQuantity, directories: directoriesQuantity };
}
console.log(process.argv[2]);
const directory = process.argv[2];
const depthFlagIndex = process.argv.indexOf("-d");
const depthValue =
  depthFlagIndex !== -1 ? parseInt(process.argv[depthFlagIndex + 1]) : -1;

const treeResult = nodeTree(directory, depthValue, "", true);
const result = treeResult.result;
const filesQuantity = treeResult.files;
const directoriesQuantity = treeResult.directories;

console.log(result.trim());
console.log(`${directoriesQuantity} directories, ${filesQuantity} files`);
