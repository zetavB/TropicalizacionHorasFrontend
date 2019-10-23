import { ReviewerActions, ReviewerActionTypes } from './reviewer.actions';
import {Page} from '../../../../models/Page';
import {ReviewerModel} from '../../../../models/entities/reviewer.model';

export const reviewerFeatureKey = 'reviewers';

export interface ReviewerState {
  reviewersList: {
    reviewersPage: Page<ReviewerModel>,
    loadingReviewers: boolean,
    errorLoadingReviewers: boolean
  };
  reviewerProfile: {
    selectedReviewer: ReviewerModel,
  };
  editReviewer: {
    loading: boolean,
    error: boolean
  };
  addReviewer: {
    loading: boolean,
    error: boolean
  };
  deleteReviewer: {
    loading: boolean,
    error: boolean
  };
}

export const initialState: ReviewerState = {
  reviewersList: {
    reviewersPage: {
      size: 5,
      number: 0,
      content: [],
      totalElements: 0,
      totalPages: 0
    },
    loadingReviewers: false,
    errorLoadingReviewers: false
  },
  reviewerProfile: {
    selectedReviewer: null,
  },
  editReviewer: {
    loading: false,
    error: false
  },
  addReviewer: {
    loading: false,
    error: false
  },
  deleteReviewer: {
    loading: false,
    error: false
  }
};

export function reducer(state = initialState, action: ReviewerActions): ReviewerState {
  switch (action.type) {
    case ReviewerActionTypes.LoadReviewers:
      return {
        ...state,
        reviewersList: {
          ...state.reviewersList,
          loadingReviewers: true
        }
      };
    case ReviewerActionTypes.LoadReviewersS:
      return {
        ...state,
        reviewersList: {
          ...state.reviewersList,
          loadingReviewers: false,
          reviewersPage: action.reviewers
        }
      };
    case ReviewerActionTypes.LoadReviewersF:
      return {
        ...state,
        reviewersList: {
          ...state.reviewersList,
          loadingReviewers: false,
          errorLoadingReviewers: true
        }
      };
    case ReviewerActionTypes.ChangeReviewersPage:
      return {
        ...state,
        reviewersList: {
          ...state.reviewersList,
          reviewersPage: {
            ...state.reviewersList.reviewersPage,
            number: action.newNumber,
            size: action.newSize
          }
        }
      };
    case ReviewerActionTypes.SelectReviewer:
      return {
        ...state,
        reviewerProfile: {
          ...state.reviewerProfile,
          selectedReviewer: state.reviewersList.reviewersPage.content.find(reviewer => reviewer.usuario.correo === action.email)
        }
      };
    case ReviewerActionTypes.AddReviewer:
      return {
        ...state,
        addReviewer: {
          ...state.addReviewer,
          loading: true
        },
      };
    case ReviewerActionTypes.AddReviewerS:
      return {
        ...state,
        addReviewer: {
          loading: false,
          error: false
        },
        reviewersList: {
          ...state.reviewersList,
          reviewersPage: {
            ...state.reviewersList.reviewersPage,
            content: [...state.reviewersList.reviewersPage.content, action.reviewer]
          }
        },
        reviewerProfile: {
          ...state.reviewerProfile,
          selectedReviewer: action.reviewer
        }
      };
    case ReviewerActionTypes.AddReviewerF:
      return {
        ...state,
        addReviewer: {
          loading: false,
          error: true
        }
      };
    case ReviewerActionTypes.EditReviewer:
      return {
        ...state,
        editReviewer: {
          ...state.editReviewer,
          loading: true
        }
      };
    case ReviewerActionTypes.EditReviewerS:
      return {
        ...state,
        editReviewer: {
          loading: false,
          error: false
        },
        reviewerProfile: {
          ...state.reviewerProfile,
          selectedReviewer: action.newReviewer
        },
        reviewersList: {
          ...state.reviewersList,
          reviewersPage: {
            ...state.reviewersList.reviewersPage,
            content: [...state.reviewersList.reviewersPage.content
              .filter(s => s.usuario.correo !== action.newReviewer.usuario.correo),
              action.newReviewer
            ]
          }
        }
      };
    case ReviewerActionTypes.EditReviewerF:
      return {
        ...state,
        editReviewer: {
          loading: false,
          error: true
        }
      };
    case ReviewerActionTypes.DeleteReviewer:
      return {
        ...state,
        deleteReviewer: {
          ...state.deleteReviewer,
          loading: true
        }
      };
    case ReviewerActionTypes.DeleteReviewerS:
      return {
        ...state,
        deleteReviewer: {
          loading: false,
          error: false
        },
        reviewersList: {
          ...state.reviewersList,
          reviewersPage: {
            ...state.reviewersList.reviewersPage,
            content: [...state.reviewersList.reviewersPage.content.filter(s => s.usuario.correo !== action.email)]
          }
        }
      };
    case ReviewerActionTypes.DeleteReviewerF:
      return {
        ...state,
        deleteReviewer: {
          loading: false,
          error: true
        }
      };
    default:
      return state;
  }
}
