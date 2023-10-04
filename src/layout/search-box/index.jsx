import React, { useRef } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const SearchBar = ({
  filterText = '-- Select Filter --',
  onChange,
  options,
  handleInput,
  setStatus,
  buttonLink,
  buttonText,
  placeholder,
  handleStatus = () => {},
}) => {
  const history = useHistory();
  const searchRef = useRef(null);

  const handleClose = () => {
    handleStatus(false);
    searchRef.current.value = '';
  };
  const handleSearch = () => handleStatus(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO:: Add delay here; debounce would be better idea
    handleStatus(true);
    searchRef.current.blur();
  };

  const restrictStatusFilterUrl = [
    '/dashboard/roles',
    '/dashboard/brands',
    '/dashboard/shops',
    '/dashboard/coupons',
    'dashboard/deals',
  ];
  const restrictDropdownSearchFilterUrl = [
    '/dashboard/brands',
    'dashboard/deals',
  ];

  return (
    <Row>
      {restrictDropdownSearchFilterUrl.includes(window.location.pathname) ? (
        <Col xl="3" sm="3" className="hidden">
          <div className={`product-sidebar`}>
            <div className="filter-section">
              <Card>
                <CardHeader>
                  <h6 className="mb-0 f-w-600">
                    <select
                      onChange={onChange}
                      className="w-100 border-0 bg-white"
                    >
                      <option value="">{filterText}</option>
                      {options?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </h6>
                </CardHeader>
              </Card>
            </div>
          </div>
        </Col>
      ) : (
        <Col xl="3" sm="3">
          <div className={`product-sidebar`}>
            <div className="filter-section">
              <Card>
                <CardHeader>
                  <h6 className="mb-0 f-w-600">
                    <select
                      onChange={onChange}
                      className="w-100 border-0 bg-white"
                    >
                      <option value="">{filterText}</option>
                      {options?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </h6>
                </CardHeader>
              </Card>
            </div>
          </div>
        </Col>
      )}
      <Col xl={buttonText ? '4' : '6'} sm={buttonText ? '4' : '6'}>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              className="form-control"
              type="text"
              bsSize="lg"
              placeholder={placeholder}
              onChange={handleInput}
              innerRef={searchRef}
            />
            <InputGroupAddon addonType="append">
              <Button
                type="button"
                className={setStatus ? 'btn-primary' : 'btn-danger'}
                outline={setStatus}
                onClick={setStatus ? handleClose : handleSearch}
              >
                {setStatus ? (
                  <i className="fa fa-close"></i>
                ) : (
                  <i className="fa fa-search"></i>
                )}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </Col>

      {restrictStatusFilterUrl.includes(window.location.pathname) ? (
        <Col xl="3" sm="3" className="text-right hidden">
          <div className="select2-drpdwn-product select-options ">
            <select className="form-control btn-square" name="select">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </Col>
      ) : (
        <Col xl="3" sm="3" className="text-right">
          <div className="select2-drpdwn-product select-options ">
            <select className="form-control btn-square" name="select">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </Col>
      )}
      {buttonText && (
        <Col>
          <Button
            xl="2"
            sm="2"
            className="mt-2 background--primary"
            onClick={() => history.push(`${buttonLink}`)}
          >
            {buttonText}
          </Button>
        </Col>
      )}
    </Row>
  );
};
export default React.memo(SearchBar);
