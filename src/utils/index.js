import { createBrowserHistory } from "history";
import APP_CONFIG from '../config/app';


export const history = createBrowserHistory();

export const fileURLReader = (url) => {
  if (url?.includes('https:')) {
    return url;
  }
  if (url?.includes(APP_CONFIG.httpAssetURL)) {
    return url;
  }
  if (!url?.includes('asset/upload') && !url?.includes('/product')) {
    return `${APP_CONFIG.assetURLcategory}${url}`;
  }
  if (url?.includes('asset/upload')) {
    return `${APP_CONFIG.assetURL}${url}`
  }
  if (url?.includes('/product')) {
    return `${APP_CONFIG.assetURL}${url}`
  }
  else {
    return 'assets/images/noImg.png'
  }

}
export const parentCatListFormatter = (list) => {
  let parentCatList = [];
  list.map((item) => {
    if (item?.children?.length) {
      parentCatList.push({ value: item?.id, label: item?.name })
      item.children.map((child1) => {
        if (child1?.children?.length) {
          parentCatList.push({ label: child1.name, value: child1.id })
          child1.children.map((child2) => {
            if (child2?.children?.length) {
              parentCatList.push({ label: child2.name, value: child2.id })
              child2.children.map((child3) => {
                if (child3?.children?.length) {
                  parentCatList.push({ label: child3.name, value: child3.id })
                  child3.children.map((child4) => {
                    if (child4?.children?.length) {
                      parentCatList.push({ label: child4.name, value: child4.id })
                      child4.children.map((child5) => {
                        if (child5?.children?.length) {
                          parentCatList.push({ label: child5.name, value: child5.id })
                        }
                        else {
                          return
                        }
                      })
                    }
                    else {
                      return
                    }
                  })
                }
                else {
                  return null
                }
              })
            }
            else {
              return null
            }
          })
        }
        else {
          return null
        }
      })
    }
    else {
      return null
    }
  })

  return parentCatList
}

export const allCategoryList = (list) => {
  let allCategoryList = [];
  list.map((main) => {
    if (main?.children?.length) {
      allCategoryList.push({ value: main.id, label: main.name })
      main.children.map((child1) => {
        if (child1?.children?.length) {
          allCategoryList.push({ value: child1.id, label: child1.name })
          child1.children.map((child2) => {
            if (child2?.children?.length) {
              allCategoryList.push({ value: child2.id, label: child2.name })
              child2.children.map((child3) => {
                if (child3?.children?.length) {
                  allCategoryList.push({ value: child3.id, label: child3.name })
                  child3.children.map((child4) => {
                    allCategoryList.push({ label: child4.name, value: child4.id })
                  })
                }
                else {
                  allCategoryList.push({ label: child3.name, value: child3.id })
                }
              })
            }
            else {
              allCategoryList.push({ label: child2.name, value: child2.id })
            }
          })
        }
        else {
          allCategoryList.push({ label: child1.name, value: child1.id })
        }
      })
    }
    else {
      allCategoryList.push({ label: main.name, value: main.id });
    }
  })
  return allCategoryList
}

export const getCategoryTree = (id, categoryList) => {
  let tree = [];
  let parentId = id;
  function getId() {
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

export const getVariantList = (data) => {
  return data.map((variant) => ({
    adminProductId: +variant.adminProductId,
    id: variant.id,
    name: variant.name,
    price: variant.price,
    properties: variant.properties,
    sku: variant.sku,
    stock: variant.stock,
    images: variant.images
  })
  )
}