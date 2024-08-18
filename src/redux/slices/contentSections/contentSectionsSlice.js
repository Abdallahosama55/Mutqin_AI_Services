import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../../../assets/placeholder-data/ContentSections/cards";
import { ALL_CATEGORIES } from "@/Util/ContentSections/constants";

const initialState = {
  scrolled: false,
  favEn: false,
  currCategory: ALL_CATEGORIES,
  favCards: new Array(categories.length).fill(false),
  favLoading: [],
  search: "",
  searchResult:"",
};

const contentSectionsSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    scroll(currentState) {
      currentState.scrolled = !currentState.scrolled;
    },
    closeScroll(currentState) {
      currentState.scrolled = false;
    },
    favToggel(currentState) {
      currentState.favEn = !currentState.favEn;
    },
    setCategory(currentState, actions) {
      currentState.currCategory = actions.payload.category;
    },
    favCardToggel(currentState, actions) {
      currentState.favCards[actions.payload.id] =
        !currentState.favCards[actions.payload.id];
    },
    setSearch(currentState, actions) {
      currentState.search = actions.payload.text;
    }, 
     setSearchResult(currentState, actions) {
      currentState.searchResult = actions.payload.text;
    },
    setFavLoad(currentState, actions) {
      if (actions.payload.action === "add") {
        currentState.favLoading.push(actions.payload.template_id);
      } else if (actions.payload.action === "remove") {
        currentState.favLoading = currentState.favLoading.filter(
          (template_id) => template_id !== actions.payload.template_id
        );
      }
    },
  },
});

export const {
  scroll,
  favToggel,
  setCategory,
  favCardToggel,
  closeScroll,
  setSearch,
  setSearchResult,
  setFavLoad,
} = contentSectionsSlice.actions;

export default contentSectionsSlice.reducer;
