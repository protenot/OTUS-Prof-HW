const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
//const { argv } = require("process");
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
    if (stats.isDirectory()) {
      directoriesQuantity++;
    } else {
      filesQuantity++;
    }
    result += prefix;

    result += isLast ? "└── " : "├── ";
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

console.log(process.argv[4]);
const directory = process.argv[process.argv.length - 1];

const depthValue = yargs.argv.depth || -1;
if (directory) {
  const treeResult = nodeTree(directory, depthValue, "", true);
  const result = treeResult.result;
  const filesQuantity = treeResult.files;
  const directoriesQuantity = treeResult.directories;

  console.log(result.trim());
  console.log(`${directoriesQuantity} directories, ${filesQuantity} files`);
} else {
  console.log("No directory path.");
}
