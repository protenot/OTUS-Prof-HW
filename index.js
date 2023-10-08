const tree = {
    "name": 1,

    "items": 
    [{
      "name": 2,
        "items":
         [{ "name": 3 },
          { "name": 4 }]
    }, 
    {
       "name": 5,
        "items": 
        [{ "name": 6 }]
    }]
    }
    function createTree(tree, prefix = '') {
        console.log(prefix + tree.name);
     
        if (Array.isArray(tree.items)) {
          const lengthArray = tree.items.length;
         
          for (let i = 0; i < lengthArray; i++) {
            
            const childPrefix = prefix + (i === len - 1 ? '└── ' : '├── ');
            createTree(tree.items[i], childPrefix);
          }
        }
      }
      createTree(tree)
