import React, { Component } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default class EditVariantOptions extends Component {
  state = {
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  };

  showInput = () =>
    this.setState({ inputVisible: true }, () => this.input.focus());

  handleInputChange = (e) => this.setState({ inputValue: e.target.value });

  handleInputConfirm = () => {
    const { inputValue } = this.state;

    let newTags = this.props.options;

    if (inputValue && this.props.options.indexOf(inputValue) === -1) {
      // input value doesnot exist in array
      newTags = [...this.props.options, inputValue]; //add value
    }
    this.props.addInputTag(newTags);
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  handleEditInputChange = (e) =>
    this.setState({ editInputValue: e.target.value });

  handleEditInputConfirm = () => {
    let newTags = [...this.props.options];

    this.setState(({ editInputIndex, editInputValue }) => {
      newTags[editInputIndex] = editInputValue;

      this.props.editInputTag(newTags);

      return {
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  saveInputRef = (input) => (this.input = input);

  saveEditInputRef = (input) => (this.editInput = input);

  render() {
    const {
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;
    return (
      <>
        {this.props.options.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="middle"
                className="tag-input"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag p-2"
              key={tag}
              closable={true}
              onClose={() => this.props.handleClose(tag)}
            >
              <span>{isLongTag ? `${tag.slice(0, 20)}...` : tag}</span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="middle"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus p-2 btn" onClick={this.showInput}>
            <PlusOutlined /> Add New
          </Tag>
        )}
      </>
    );
  }
}
