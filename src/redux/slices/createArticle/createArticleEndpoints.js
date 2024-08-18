import mutqinApi from "../../api/mutqinApi";

const endpoints = {
  // Create Article
  keywords: "spacetly_articleGenerator/generate-keywords/",
  titles: "spacetly_articleGenerator/generate_Titles/",
  subTitles: "spacetly_articleGenerator/generate_SubTitles/",
  article: "spacetly_articleGenerator/generate_Articles/",
  generateId: "spacetly_articleGenerator/article-id/",
  allArticles: "spacetly_articleGenerator/get_all_articles/",
  search: "spacetly_articleGenerator/get_all_articles/",
  getArticleById: "spacetly_articleGenerator/get_article_detail/",
  additionalSubTitles:
    "spacetly_articleGenerator/generate_secondary_SubTitles/",
  stepInfo: "spacetly_articleGenerator/ArticleStepView/",

  //Refomulation
  allRephares: "text-rephrase/texts/",
  searchRephares: "text-rephrase/texts/",
  getRepharesById: "https://backend.mutqinai.com/api/v1/text-rephrase/texts/",
};

const createArticleEndpoints = mutqinApi.injectEndpoints({
  endpoints: (builder) => ({
    //Create Article
    keywords: builder.query({
      query: (body) => ({
        url: endpoints.keywords,
        body,
        method: "POST",
      }),
    }),
    titles: builder.query({
      query: (body) => ({
        url: endpoints.titles,
        body,
        method: "POST",
      }),
    }),
    subTitles: builder.query({
      query: (body) => ({
        url: endpoints.subTitles,
        body,
        method: "POST",
      }),
    }),
    additionalSubTitles: builder.query({
      query: (body) => ({
        url: endpoints.additionalSubTitles,
        body,
        method: "POST",
      }),
    }),
    article: builder.query({
      query: ({ id, body }) => ({
        url: `${endpoints.article}${id}/`,
        body,
        method: "POST",
      }),
    }),
    getStepInfo: builder.query({
      query: (id) => `${endpoints.stepInfo}${id}/`,
    }),
    setStepInfo: builder.mutation({
      query: ({ id, body }) => ({
        url: `${endpoints.stepInfo}${id}/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["articles"],
    }),
    generateId: builder.query({
      query: () => ({ url: endpoints.generateId, method: "POST" }),
    }),
    allArticles: builder.query({
      query: () => endpoints.allArticles,
      providesTags: ["articles"],
    }),
    search: builder.query({
      query: (query) => `${endpoints.search}?search=${query}`,
    }),
    getArticleById: builder.query({
      query: (id) => `${endpoints.getArticleById}${id}/`,
    }),

    //Reformulation
    allRephares: builder.query({
      query: () => endpoints.allRephares,
      providesTags: ["rephares"],
    }),
    searchRephares: builder.query({
      query: (query) => `${endpoints.searchRephares}?search=${query}`,
    }),
    getRepharesById: builder.query({
      query: (id) => `${endpoints.getRepharesById}${id}/`,
    }),
  }),
});

export const {
  //Create Article
  useLazyKeywordsQuery,
  useLazyTitlesQuery,
  useLazySubTitlesQuery,
  useLazyArticleQuery,
  // useLazyGetPhaseQuery,
  // useLazySetPhaseQuery,
  useLazyGenerateIdQuery,
  useLazyAllArticlesQuery,
  useLazySearchQuery,
  useLazyGetArticleByIdQuery,
  useLazyAdditionalSubTitlesQuery,
  useLazyGetStepInfoQuery,
  useSetStepInfoMutation,

  //Reformulation
  useLazyAllRepharesQuery,
  useLazySearchRepharesQuery,
  useLazyGetRepharesByIdQuery,
} = createArticleEndpoints;
