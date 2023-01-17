import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const imagesAdapter = createEntityAdapter();
const initialState = imagesAdapter.getInitialState();

export const imagesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImages: builder.query({
      query: () => "/api/image",
      transformResponse: (responseData) => {
        const loadedResponse = responseData.map((image) => {
          image.id = image._id;
          return image;
        });

        return imagesAdapter.setAll(initialState, loadedResponse);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Img", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Img", id })),
          ];
        } else {
          return [{ type: "Img", id: "LIST" }];
        }
      },
    }),

    addNewImage: builder.mutation({
      query: (initialData) => ({
        url: "/api/image/upload",
        method: "POST",
        body: initialData,
      }),
      invalidatesTags: [{ type: "Img" }],
    }),
  }),
});

export const { useGetImagesQuery, useGetImageQuery, useAddNewImageMutation } =
  imagesSlice;

export const selectImagesResult = imagesSlice.endpoints.getImages.select();

const selectImagesData = createSelector(
  selectImagesResult,
  (imagesResult) => imagesResult.data
);

export const {
  selectAll: selectAllImages,
  selectById: selectImageById,
  selectIds: selectImagesIds,
} = imagesAdapter.getSelectors(
  (state) => selectImagesData(state) ?? initialState
);
