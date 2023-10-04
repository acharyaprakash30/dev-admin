import React from 'react';
import { Col, Input, Label } from 'reactstrap';

export default ({ register, formattedCategory, defaultValues }) => {
  //Generate Category Dropdown from the category list with children
  function optionGenerator() {
    const finalItems = [];
    let counter = 0;
    function run(item) {
      let prefix = '--'.repeat(counter);
      for (let i = 0; i < item.length; i++) {
        //Add items to the final array list
        finalItems.push(
          <option key={`${item[i].id}-${i}-${item[i].name}`} value={item[i].id}>
            {prefix}
            {prefix.length ? '> ' : ''}
            {item[i].name}
          </option>,
        );

        //Check if the children exists on array
        if (item[i].children && item[i].children.length) {
          counter++;
          run(item[i].children);
        } else {
          counter = 0;
        }
      }
    }
    //Run the generator;
    run(formattedCategory);
    return finalItems;
  }

  return (
    <div className="row">
      <Label className="col-sm-2 col-form-label">Parent Category</Label>
      <Col sm="8">
        <Input
          type="select"
          innerRef={register()}
          name="parentId"
          value={
            defaultValues && defaultValues.parentId
              ? defaultValues['parentId']
              : undefined
          }
        >
          <option value={null}>Select a category </option>
          {optionGenerator().map((value) => value)}
        </Input>
      </Col>
    </div>
  );
};
