def createTree(array: [list]): 
    tree = {} 
    for item in array: 
        currTree = tree 
  
        for key in item[::1]: 
            if key not in currTree: 
                currTree[key] = {} 
            currTree = currTree[key] 

    return tree 