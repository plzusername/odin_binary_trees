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
            this.root = this.makeTree(treeTemplate)
        }
    }
}

const myTree = Tree()

myTree.implementTree([1,2,3,4,5,6,7])

console.log(myTree.root)