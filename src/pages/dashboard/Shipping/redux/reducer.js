import actions from './actions';

const initialState = {
  message: '',
  provinces: {
    province: [],
    loading: false,
  },
  districts: {
    district: [],
    loading: false,
  },
  municipalities: {
    municipality: [],
    loading: false,
    municipalityCount: null,
  },
  areas: {
    area: [],
    loading: false,
    areastoChange: [],
    areaCount: null,
  },
};

const ShippingReducer = (state = initialState, action) => {
  switch (action.type) {
    //province start
    case actions.GET_PROVINCE_REQ:
      return {
        ...state,
        provinces: {
          loading: true,
        },
      };
    case actions.GET_PROVINCE_SUC:
      return {
        ...state,
        provinces: {
          ...state.provinces,
          loading: false,
          province: [...action.data],
        },
      };
    case actions.GET_PROVINCE_FAIL:
      return {
        ...state,
        provinces: {
          ...state.provinces,
          loading: false,
          message: action.data,
        },
      };

    case actions.EDIT_PROVINCE_REQ:
      return {
        ...state,
        provinces: {
          ...state.provinces,
          loading: true,
        },
      };
    case actions.EDIT_PROVINCE_SUC:
      return {
        ...state,
        provinces: {
          ...state.provinces,
          loading: false,
          province: state.provinces.province.map((item) => {
            if (item.id === action.id) return { ...item, status: !item.status };
            else return item;
          }),
        },
      };
    case actions.EDIT_PROVINCE_FAIL:
      return {
        ...state,
        provinces: {
          ...state.provinces,
          loading: false,
          message: action.payload,
        },
      };

    //province ends

    //district starts
    case actions.GET_DISTRICT_REQ:
      return {
        ...state,
        districts: {
          ...state.districts,
          loading: true,
        },
      };
    case actions.GET_DISTRICT_SUC:
      return {
        ...state,
        districts: {
          ...state.districts,
          loading: false,
          district: [...action.data],
        },
      };
    case actions.GET_DISTRICT_FAIL:
      return {
        ...state,
        districts: {
          ...state.districts,
          loading: false,
          message: action.payload,
        },
      };

    case actions.EDIT_DISTRICT_REQ:
      return {
        ...state,
        districts: {
          ...state.districts,
          loading: true,
        },
      };
    case actions.EDIT_DISTRICT_SUC:
      return {
        ...state,
        districts: {
          ...state.districts,
          district: state.districts.district.map((item) => {
            if (item.id === action.id) return { ...item, status: !item.status };
            else return item;
          }),
          loading: false,
        },
      };
    case actions.EDIT_DISTRICT_FAIL:
      return {
        ...state,
        districts: {
          ...state.districts,
          loading: false,
          message: action.payload,
        },
      };
    // district ends

    //municipality  starts
    case actions.GET_MUNICIPALITY_REQ:
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          loading: true,
        },
      };
    case actions.GET_MUNICIPALITY_SUC:
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          loading: false,
          municipality: action.data,
          municipalityCount: action.count,
        },
      };
    case actions.GET_MUNICIPALITY_FAIL:
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          loading: false,
          message: action.payload,
        },
      };

    case actions.EDIT_MUNICIPALITY_REQ:
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          loading: true,
        },
      };
    case actions.EDIT_MUNICIPALITY_SUC:
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          loading: false,
          municipality: state.municipalities.municipality.map((item) => {
            if (item.id === action.id) return { ...item, status: !item.status };
            else return item;
          }),
        },
      };
    case actions.EDIT_MUNICIPALITY_FAIL:
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          loading: false,
        },
      };

    case actions.DEL_MUNICIPALITY_REQ:
      return {
        ...state,
        areas: {
          ...state.municipalities,
          loading: true,
        },
      };
    case actions.DEL_MUNICIPALITY_SUC:
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          loading: false,
          municipality: state.municipalities.municipality.filter((item) => {
            if (item?.id === action.id) return false;
            else return true;
          }),
        },
      };
    case actions.DEL_MUNICIPALITY_FAIL:
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          loading: false,
        },
      };

    case actions.ADD_MUNICIPALITY_REQ:
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          loading: true,
        },
      };
    case actions.ADD_MUNICIPALITY_SUC:
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          loading: false,
          municipality: [...state.municipalities.municipality, action.data],
          success: true,
        },
      };
    case actions.ADD_MUNICIPALITY_FAIL:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: false,
          success: false,
        },
      };
    // municipality ends

    //areas starts
    case actions.GET_AREAS_REQ:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: true,
        },
      };
    case actions.GET_AREAS_SUC:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: false,
          area: action.data,
          areaCount: action.count,
        },
      };
    case actions.GET_AREAS_FAIL:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: false,
          message: action.payload,
        },
      };

    case actions.EDIT_AREAS_REQ:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: true,
        },
      };
    case actions.EDIT_AREAS_SUC:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: false,
          area: state.areas.area.map((item) => {
            if (item.id === action.id) return { ...item, status: !item.status };
            else return item;
          }),
        },
      };
    case actions.EDIT_AREAS_FAIL:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: false,
        },
      };

    //delete area start
    case actions.DEL_AREA_REQ:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: true,
        },
      };
    case actions.DEL_AREA_SUC:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: false,
          area: state.areas.area.filter((item) => {
            if (item?.id === action.id) return false;
            else return true;
          }),
        },
      };
    case actions.DEL_AREA_FAIL:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: false,
        },
      };
    //del area end

    //add area
    case actions.ADD_AREA_REQ:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: true,
        },
      };
    case actions.ADD_AREA_SUC:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: false,
          area: [...state.areas.area, action.data],
          success: true,
        },
      };
    case actions.ADD_AREA_FAIL:
      return {
        ...state,
        areas: {
          ...state.areas,
          loading: false,
          success: false,
        },
      };
    //area add ends

    //  edit area start
    case actions.EDIT_AREADATA:
      let array = [...state.areas.area];
      // array = array.map((item) => ({ ...item })); //to make object immutalbe
      if (action?.typo === 'name') array[action.id].name = action?.data;
      if (action?.typo === 'status') array[action.id].status = action?.data;
      if (action?.typo === 'price')
        array[action.id].delivery_price = +action?.data;
      return {
        ...state,
        areas: {
          ...state.areas,
          areastoChange: [...array],
        },
      };

    // edit area end

    default:
      return {
        ...state,
      };
  }
};

export default ShippingReducer;
