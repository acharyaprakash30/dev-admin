import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { IoIosArrowForward } from 'react-icons/io';
import './MultiSelect.scss';

const MultiSelectCategory = (props) => {
  const [inputText, setInputText] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [showAllCat, setShowAllCat] = useState(false);
  let allCategories = props.categories;
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [currentSubCategory, setSubCurrentCategory] = useState(-1);
  const [currentChildCategory, setChildCurrentCategory] = useState(-1);

  // const addCategories = () => {
  //   setCategories(true);
  // }

  useEffect(() => {
    if (props.defaultValue) {
      if (props.categories) {
        for (let category of props.categories) {
          if (category.id === props.defaultValue) {
            setCategoryId(props.defaultValue);
            setInputText(category.name);
          }
          if (category.id !== props.defaultValue && category.children) {
            for (let child of category.children) {
              if (child.id === props.defaultValue) {
                setCategoryId(props.defaultValue);
                setInputText(`${category.name} -> ${child.name}`);
              }
            }
          }
        }
      }
    }
  }, [props.categories]);

  // const showSubCategory = (e, categoryId, data, parentData, mainData, index, liTIndex, liMIndex, liBIndex) => {
  //   e.preventDefault();
  //   if (index == 0) {
  //     let allArr = [data];
  //     setList(allArr);
  //     let allIndex = [liTIndex];
  //     setActive(allIndex);
  //   } else if (index == 1) {
  //     let allArr = [parentData, data];
  //     setList(allArr);
  //     let allIndex = [liTIndex, liMIndex];
  //     setActive(allIndex);
  //   }
  //   else {
  //     let allArr = [parentData, mainData, data];
  //     setList(allArr);
  //     let allIndex = [liTIndex, liMIndex, liBIndex];
  //     setActive(allIndex);
  //   }
  //   setCategoryId(categoryId);
  // }

  // const createSubCategory = (e, subCats) => {
  //   e.preventDefault();

  // }

  // const fixedSubCategories = (e, subCats) => {
  //   e.preventDefault();

  // }

  // const SubCategory = (props) => {
  //   return (
  //     <div className="sub-categories-wrapper">
  //       <ul className="main-categories">
  //               {allCategories.map((cat, ind) =>
  //                 <li className={active[0] == ind ? "active-class" : ""}>
  //                   <a href="#" onMouseEnter={(e) => { if (cat.children && cat.children.length) { console.log("openning subcat") } }} onClick={(e) => { if (cat.children && cat.children.length) { addSubCategories(e, cat.children, "show-subCat") } }} className={cat.children && cat.children.length ? "" : "noSub"}> {cat.name} {cat.children && cat.children.length ? <IoIosArrowForward /> : null} </a>
  //                   {cat.children && cat.children.length ? (
  //                     <div>
  //                       {subCategories}
  //                     </div>
  //                   ) : null}
  //                 </li>
  //               )}
  //             </ul>
  //     </div>
  //   );
  // }
  // const addSubCategories = (e, subCats, ind, subCatUI) => {
  //   e.preventDefault();
  //   setSubCategories(<SubCategory />);

  //   // subCategories = (
  //   //   <div className={"sub-categories-wrapper "+ subCatUI}>
  //   //     <ul>
  //   //       {subCats.map((subCat, index) => (
  //   //         <li className={active[1] == index ? "active-class" : ""}>
  //   //           <a href="#" onClick={(e) => showSubCategory(e, subCat.id, subCat.name, subCat.name, "", 1, ind, index, 0)}>{subCat.name} <IoIosArrowForward /></a>
  //   //           {/* <div className="child-categories-wrapper">
  //   //             <ul>
  //   //               {
  //   //                 subCat.childCategory && subCat.children.map((subCat, sIndex) => (
  //   //                   <li className={active[2] == sIndex ? "active-class" : ""}>
  //   //                     <a onClick={(e) => showSubCategory(e, subCat.id, subCat.name, subCat.name, subCat.name, 2, ind, index, sIndex)}>
  //   //                       {subCat.name}
  //   //                     </a>
  //   //                   </li>
  //   //                 ))
  //   //               }
  //   //             </ul>
  //   //           </div> */}
  //   //         </li>
  //   //       ))}
  //   //     </ul>
  //   //   </div>
  //   // );
  // }

  const getListValue = (listValue) => {
    return '';
  };

  const categoryClicked = (e, props) => {
    e.preventDefault();
    let category = props.category;
    if (category.children) {
      setCurrentCategory(category.id);
    } else {
      setShowAllCat(false);
      setCategoryId(category.id);
    }
    setInputText(category.name);
  };

  const subCategoryClicked = (e, props) => {
    e.preventDefault();

    let category = props.category;
    let subCategory = props.subCategory;

    if (subCategory.children) {
      setSubCurrentCategory(subCategory.id);
    } else {
      setShowAllCat(false);
      setCategoryId(subCategory.id);
    }

    setInputText(category.name + ' -> ' + subCategory.name);
  };

  const childCategoryClicked = (e, props) => {
    e.preventDefault();
    let category = props.category;
    let subCategory = props.subCategory;
    let childCategory = props.childCategory;

    if (childCategory.children) {
      setChildCurrentCategory(childCategory.id);
      setShowAllCat(false);
    } else {
      setShowAllCat(false);
      setCategoryId(childCategory.id);
    }

    setInputText(
      category.name + ' -> ' + subCategory.name + ' -> ' + childCategory.name,
    );
  };

  return (
    <FormGroup className="row categories">
      <Label className="col-sm-3 col-form-label">Categories</Label>
      <Col sm="9">
        <Input
          type="text"
          className="form-control digits multi-level-category__input"
          placeholder="Please Select a Category"
          onClick={() => setShowAllCat(true)}
          value={inputText}
          onFocus={() => setShowAllCat(true)}
        />
        <Input
          name={props.name}
          value={categoryId}
          innerRef={props.register({ required: true })}
          type="hidden"
        />{' '}
        {/**innerRef={register({ required: true})} */}
        {allCategories && (
          <div onBlur={() => setShowAllCat(false)}>
            <div
              className={
                'multi-level-category__wrapper ' +
                (showAllCat ? 'makeVisible' : '')
              }
            >
              <ul className="main-categories-custom">
                {allCategories.map((cat) => (
                  <li
                    className={
                      currentCategory === cat.id && cat.children
                        ? 'activeCat'
                        : ''
                    }
                    key={cat.name}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        categoryClicked(e, { category: cat });
                      }}
                      onMouseEnter={() => {
                        setCurrentCategory(cat.id);
                      }}
                      className={
                        cat.children && cat.children.length ? '' : 'noSub'
                      }
                    >
                      {cat.name ? cat.name : ' - '}
                      {cat.children && cat.children.length ? (
                        <IoIosArrowForward />
                      ) : null}
                    </a>
                    {cat.children && cat.children.length ? (
                      /**Sub Category*/
                      <div
                        className={
                          'sub-categories-wrapper ' +
                          (cat.id == currentCategory ? 'show' : 'hide')
                        }
                      >
                        <ul>
                          {cat.children.map((subCat) => (
                            <li
                              className={
                                currentSubCategory === subCat.id &&
                                subCat.children
                                  ? 'activeCat'
                                  : ''
                              }
                              key={subCat.name}
                            >
                              <a
                                href="#"
                                onClick={(e) => {
                                  subCategoryClicked(e, {
                                    category: cat,
                                    subCategory: subCat,
                                  });
                                }}
                                onMouseEnter={() => {
                                  setSubCurrentCategory(subCat.id);
                                }}
                                className={
                                  subCat.children && subCat.children.length
                                    ? ''
                                    : 'noSub'
                                }
                              >
                                {subCat.name ? subCat.name : ' - '}
                                {subCat.children && subCat.children.length ? (
                                  <IoIosArrowForward />
                                ) : null}
                              </a>
                              {/**Child Category*/}
                              {subCat.children && subCat.children.length ? (
                                <div
                                  className={
                                    'child-categories-wrapper' +
                                    (subCat.id == currentSubCategory
                                      ? 'show'
                                      : 'hide')
                                  }
                                >
                                  <ul>
                                    {subCat.childCategory &&
                                      subCat.children.map((childCat) => (
                                        <li
                                          className={
                                            currentChildCategory ===
                                              childCat.id && childCat.children
                                              ? 'activeCat'
                                              : ''
                                          }
                                          key={childCat.name}
                                        >
                                          <a
                                            onClick={(e) => {
                                              childCategoryClicked(e, {
                                                category: cat,
                                                subCategory: subCat,
                                                childCategory: childCat,
                                              });
                                            }}
                                            onMouseEnter={() => {
                                              setChildCurrentCategory(
                                                childCat.id,
                                              );
                                            }}
                                            className={
                                              childCat.children &&
                                              childCat.children.length
                                                ? ''
                                                : 'noSub'
                                            }
                                          >
                                            {childCat.name
                                              ? childCat.name
                                              : ' - '}
                                          </a>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              ) : null}
                              {/**Child Category Ends*/}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {/**Sub Category Ends*/}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Col>
    </FormGroup>
  );
};

export default MultiSelectCategory;
