const { createSlice } = require("@reduxjs/toolkit");

export const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle",
    depth: 1,
  },
  reducers: {
    setDepth: (state, action) => {
      state.depth = action.payload;
    },
  },
});

export const { setDepth } = appSlice.actions;
export default appSlice.reducer;
