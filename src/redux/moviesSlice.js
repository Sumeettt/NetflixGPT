import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        trailerVideo: null,
        isTrailerVideoVolumeMuted: true,
        nowPlayingMovies: null,
        topRatedMovies: null,
        popularMovies: null,
        upComingMovies: null
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        toggleTrailerVideoVolume: (state, action) => {
            state.isTrailerVideoVolumeMuted = !state.isTrailerVideoVolumeMuted
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addUpComingMovies: (state, action) => {
            state.upComingMovies = action.payload;
        }
    }
});

export const {addNowPlayingMovies, addTrailerVideo, toggleTrailerVideoVolume, addTopRatedMovies, addPopularMovies, addUpComingMovies} = moviesSlice.actions;

export default moviesSlice.reducer;