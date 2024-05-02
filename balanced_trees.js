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
        let currentTree = this.root
        let prev = null

        while(currentTree.left || currentTree.right){
          prev = currentTree

          if(value > currentTree.data){
            currentTree = currentTree.right
          }
          if(value < currentTree.data){
            currentTree = currentTree.left
          }

          if(currentTree.data == value){
            if(currentTree.left && !currentTree.right){
              if(prev.data > value) prev.left = currentTree.left
              if (prev.data < value) prev.right = currentTree.left

              return
            }
            if(prev.data > value) prev.left = currentTree.right
            if (prev.data < value) prev.right = currentTree.right

            let replacementNode = currentTree.right;
            let replacementParent = currentTree;
            while (replacementNode.left) {
                replacementParent = replacementNode;
                replacementNode = replacementNode.left;
            }
            currentTree.data = replacementNode.data;
            if (replacementParent.left === replacementNode) {
                replacementParent.left = replacementNode.right;
            } else {
                replacementParent.right = replacementNode.right;
            }

            return 
          }
        }

      },
      find(value){
        let current = this.root
        let prev = null

        while(current){
          prev = current

          if(value > current.data){
            current = current.right
          }
          else{
            current = current.left
          }
        }

        return prev.data || 'No such node'
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

myTree.insertNode(0.1)  

myTree.removeNode(2)

prettyPrint(myTree.root)
console.log(myTree.find(14))