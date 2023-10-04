export const getCategoryTree = (id, categoryList) => {
  let tree = [];
  let parentId = id;
  function getId () {
    for (let category of categoryList) {
      if (category.id === parentId) {
        tree.unshift(category.id);
        parentId = category.parentId;
        if (parentId !== 0) {
          getId()
        }
      }
    }
  }
     getId();
  return tree;
};
