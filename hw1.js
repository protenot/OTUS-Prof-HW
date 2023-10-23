const tree = {
  name: 1,

  items: [
    {
      name: 2,
      items: [{ name: 3 }, { name: 4 }],
    },
    {
      name: 5,
      items: [{ name: 6 }],
    },
  ],
};
function createTree(tree, prefix = "", isLast = true, isRoot = false) {
  if (!isRoot) {
    console.log(prefix + (isLast ? "└── " : "├── ") + tree.name);
  } else {
    console.log(tree.name);
  }

  if (Array.isArray(tree.items)) {
    const lengthArray = tree.items.length;

    for (let i = 0; i < lengthArray; i++) {
      const childPrefix = prefix + (isLast ? " " : "│ ");
      const isLastChild = i === lengthArray - 1;
      createTree(tree.items[i], childPrefix, isLastChild);
    }
  }
}

createTree(tree, "", true, true);
