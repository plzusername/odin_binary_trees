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
      },
      levelOrder(callBack){
        const nodes = [this.root]
        const output = [this.root]
        while(nodes.length != 0){
          const currentNode = nodes[0]

          const leftNode = currentNode.left
          const rightNode = currentNode.right

          if(leftNode) nodes.push(leftNode)
          if(rightNode) nodes.push(rightNode)

          if(leftNode) output.push(leftNode)
          if(rightNode) output.push(rightNode)

          callBack(currentNode.data)

          nodes.shift()
          
        }

        return output.map(node => node.data)

      },
      inOrder(root = this.root, callBack = null, list = []){
        if (root === null) {
            return;
        }

        // First recur on left subtree
        this.inOrder(root.left, callBack, list);
       
        // Now deal with the node

        if(callBack) callBack(root.data)

        else{
          list.push(root.data)
        }
        
       
        // Then recur on right subtree
        this.inOrder(root.right, callBack, list);

        return list
      },
      preOrder(root = this.root, callBack = null, list = []){
        if (root === null) {
          return;
      }

      if(callBack) callBack(root.data)

      else{
        list.push(root.data)
      }

      // First recur on left subtree
      this.preOrder(root.left, callBack, list);
     
      // Now deal with the node      
     
      // Then recur on right subtree
      this.preOrder(root.right, callBack, list);

      return list

      },
      postOrder(root = this.root, callBack = null, list = []){
        if (root === null) {
          return;
      }
      // First recur on left subtree
      this.postOrder(root.left, callBack, list);
     
      // Now deal with the node      
     
      // Then recur on right subtree
      this.postOrder(root.right, callBack, list);

      if(callBack) callBack(root.data)

      else{
        list.push(root.data)
      }

      return list

      },
      height(node){
        if(node == null) return 0

        return Math.max(this.height(node.left), this.height(node.right)) + 1
      },
      depth(node, root = this.root, depth){
        if(root == null) return -1
        if(root.data == node.data) return depth

        const leftNode = this.depth(node, root.left, depth + 1)
        const rightNode = this.depth(node, root.right, depth + 1)

        if(leftNode == -1 && rightNode != -1) return rightNode

        return leftNode 
      },
      isBalanced(root){
        if(root == null) return true

        const leftNode = this.height(root.left)
        const rightNode = this.height(root.right)

        return Math.abs(leftNode - rightNode)  <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right)

      },
      reBalance(){
        this.implementTree(this.inOrder())
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

let randomNumbersArray = [
  12,
  32, 54, 76, 98, 21, 43, 65, 87, 9, 31,
  53, 75, 97, 19, 41, 63, 85, 7, 29, 51,
  73, 95, 17, 39, 61, 83, 5, 27, 49, 71
];

myTree.implementTree(randomNumbersArray)

for (let i = 0; i < 20; i++) {
  myTree.insertNode(101 + i)
  
}


myTree.reBalance()

prettyPrint(myTree.root)

console.log(myTree.isBalanced(myTree.root))
console.log(myTree.inOrder())
console.log(myTree.preOrder())
console.log(myTree.postOrder())