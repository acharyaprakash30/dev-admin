const entities = ['ProgressModal'];

const action = {
  SET_PROGRESS_NAME: `${entities} SET_PROGRESS_NAME`,
  SET_PROGRESS_PERCENTAGE: `${entities} SET_PROGRESS_PERCENTAGE`,
  SET_PROGRESSION_COMPLETE: `${entities} SET_PROGRESSION_COMPLETE`,
  SET_SHOW_MODAL: `${entities} SET_SHOW_MODAL`,

  setProgressName: (payload) => ({
    type: action.SET_PROGRESS_NAME,
    payload,
  }),

  setPercentage: (percentage, status) => ({
    type: action.SET_PROGRESS_PERCENTAGE,
    percentage,
    status,
  }),

  setProgressionCompletion: () => ({
    type: action.SET_PROGRESSION_COMPLETE,
  }),

  setShowModal: (payload) => ({
    type: action.SET_SHOW_MODAL,
    payload,
  }),
};

export default action;
