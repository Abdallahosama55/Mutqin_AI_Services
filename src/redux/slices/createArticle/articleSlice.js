import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newArticleId: "",
  keywords: [],
  title: "",
  subTitles: [],
  allSubTitlesSelected: "INIT", // INIT || SELECTED || NOT_SELECTED
  // ordredSubTitles: [],
  article: "",
  articleCompleted: false,
  showHistory: false,
  language: "",
  topic: "",
  tone_of_voice: "",
  subTitlesInserted: {},
};

const articleSlice = createSlice({
  initialState,
  name: "newArticle",
  reducers: {
    toggleAllSubTitlesSelected(state, { payload }) {
      state.allSubTitlesSelected = payload;
    },
    setSubTitlesInserted(state, { payload: { mainSubTxt, inserted, reset } }) {
      if (reset) state.subTitlesInserted = {};
      else {
        const prev = state.subTitlesInserted[mainSubTxt];
        const newInsertSub = [
          ...(prev ? prev : []),
          ...(inserted ? inserted : []),
        ];
        // Repeated removal
        state.subTitlesInserted[mainSubTxt] = [...new Set(newInsertSub)];
      }
    },
    ////////////////////////////////////////////<tone_of_voice////////////////
    setToneOfVoice(state, { payload }) {
      state.tone_of_voice = payload;
    },
    setArticleCompleted(state, { payload }) {
      state.articleCompleted = payload;
    },

    ///////////////////////////////////////////<Topic>/////////////////////////
    setTopic(state, { payload }) {
      state.topic = payload;
    },

    ///////////////////////////////////////<Article>/////////////////////////
    setArticleId: (state, { payload }) => {
      state.newArticleId = payload;
    },
    setArticle: (state, { payload }) => {
      state.article = payload;
    },

    ////////////////////////////////////<Keywords>/////////////////////////////
    addKeyword: (state, { payload }) => {
      state.keywords.push(payload);
    },
    delKeyword: (state, { payload }) => {
      state.keywords = state.keywords.filter((k) => k !== payload);
    },
    replaceKeywords: (state, { payload }) => {
      state.keywords = payload;
    },

    ////////////////////////////////<Title>/////////////////////////
    setTitle: (state, { payload }) => {
      state.title = payload;
    },

    //////////////////////////////<Sub titles>///////////////////////////////////
    setSubTitles: (state, { payload }) => {
      state.subTitles = payload;
    },
    addSubTitle: (
      state,
      { payload: { mainSubTxt, subTxt, subHeading, place, maxLength } }
    ) => {
      if (!state.subTitles.length)
        state.subTitles = Array.from({ length: maxLength }).fill(null);
      const prev = state.subTitles[place]?.[mainSubTxt];
      state.subTitles[place] = {
        [mainSubTxt]: [
          ...(prev ? prev : []),
          { value: subTxt, type: subHeading },
        ],
      };
    },
    addSubTitleInPlace: (state, { payload: { mainSubTxt, place, index } }) => {
      state.subTitles[place][mainSubTxt] = [
        ...state.subTitles[place][mainSubTxt].slice(0, index),
        {
          value: "",
          type: "h4",
        },
        ...state.subTitles[place][mainSubTxt].slice(index),
      ];
    },
    changeSubTitle: (
      state,
      { payload: { mainSubTxt, newValue, place, index } }
    ) => {
      state.subTitles[place][mainSubTxt][index].value = newValue;
    },
    changeMainSubTitle: (
      state,
      { payload: { mainSubTxt, newValue, place } }
    ) => {
      state.subTitles[place][newValue] = state.subTitles[place][mainSubTxt];
      delete state.subTitles[place][mainSubTxt];
    },
    updateSubTitleType: (
      state,
      { payload: { mainSubTxt, subHeading, place, subTxt } }
    ) => {
      const found = state.subTitles[place][mainSubTxt].find(
        (subObj) => subObj.value === subTxt
      );
      found && (found.type = subHeading);
    },
    updateSubTitleOrder: (state, { payload: { mainSubTxt, newPlace } }) => {
      const oldPlace = state.subTitles.findIndex(
        (subObj) => subObj?.[mainSubTxt]
      );
      if (oldPlace === newPlace) return; // Don't make any change
      if (state.subTitles[newPlace]) {
        // swap
        let temp = state.subTitles[newPlace];
        state.subTitles[newPlace] = state.subTitles[oldPlace];
        state.subTitles[oldPlace] = temp;
      } else {
        state.subTitles[newPlace] = state.subTitles[oldPlace];
        state.subTitles[oldPlace] = null;
      }
    },
    delSubTitle: (state, { payload: { mainSubTxt, place, subTxt } }) => {
      const subTitlesObj = state.subTitles[place][mainSubTxt];
      state.subTitles[place][mainSubTxt] = subTitlesObj.filter(
        (subObj) => subObj.value !== subTxt
      );
      if (!state.subTitles[place][mainSubTxt].length)
        state.subTitles[place] = null;
    },
    delMainSubTitle: (state, { payload: { place } }) => {
      state.subTitles[place] = null;
    },

    //////////////////////////////////////////<History>///////////////////////
    toggleShowHistory: (state, { payload }) => {
      state.showHistory = payload;
    },
    setLanguage: (state, { payload }) => {
      state.language = payload;
    },
  },
});

export default articleSlice.reducer;
export const {
  addKeyword,
  delKeyword,
  replaceKeywords,
  setTitle,
  addSubTitle,
  delSubTitle,
  setSubject,
  setSubTitles,
  addSubTitleInPlace,
  changeSubTitle,
  updateSubTitleType,
  setArticle,
  setArticleId,
  toggleShowHistory,
  setLanguage,
  updateSubTitleOrder,
  changeMainSubTitle,
  delMainSubTitle,
  setTopic,
  setToneOfVoice,
  setArticleCompleted,
  setSubTitlesInserted,
  toggleAllSubTitlesSelected,
} = articleSlice.actions;
