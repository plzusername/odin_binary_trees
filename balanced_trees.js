const Node = (data, left, right) => {
    return {
        data,
        left,
        right
    }
}

const Tree = () =>{
    return {
        root: null,
        makeTree(treeTemplate){
            if(treeTemplate.length == 0) return null

            if(treeTemplate.length == 1) return Node(treeTemplate[0], null, null)

            const arrayMidPoint = treeTemplate[Math.floor(treeTemplate.length / 2)]
            const leftArrayHalf = treeTemplate.slice(0, Math.floor(treeTemplate.length / 2))
            const rightArrayHalf = treeTemplate.slice(Math.floor(treeTemplate.length / 2) + 1, treeTemplate.length)

            const tree = Node(arrayMidPoint, this.makeTree(leftArrayHalf), this.makeTree(rightArrayHalf))

            return tree
        },
        implementTree(treeTemplate){
            const filteredTreeInput = treeTemplate.sort((a, b) => a - b).filter((item, index, self) => self.indexOf(item) == index)
            this.root = this.makeTree(filteredTreeInput)
        },
        insertNode(value){
          let currentTree = this.root
          let prev = null
          const newNode = Node(value, null, null)
          
          while(currentTree != null){
            prev = currentTree
            if(value > currentTree.data){
              currentTree = currentTree.right
            }
            else{
              currentTree = currentTree.left
            }
          }
          if(value < prev.data ){
            prev.left = newNode
          }
          else{
            prev.right = newNode
          }
        },
        removeNode(value){

        }
    }
}

const myTree = Tree()

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

myTree.implementTree([1,2])

for (let i = 0; i < 10; i++) {
  myTree.insertNode(10 + i)  
}

prettyPrint(myTree.root)