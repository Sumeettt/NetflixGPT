import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        trailerVideo: null,
        isTrailerVideoVolumeMuted: true,
        nowPlayingMovies: null,
        trendingMovies: null,
        topRatedMovies: null,
        popularMovies: null,
        trendingTVShows: null,
        upComingMovies: null,
        videoPlayerVideo: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTrendingTVShows: (state, action) => {
            state.trendingTVShows = action.payload;
        },
        addUpComingMovies: (state, action) => {
            state.upComingMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        toggleTrailerVideoVolume: (state, action) => {
            state.isTrailerVideoVolumeMuted = !state.isTrailerVideoVolumeMuted;
        },
        addVideoPlayerVideo: (state, action) => {
            state.videoPlayerVideo = action.payload;
        },
        removeVideoPlayerVideo: (state, action) => {
            state.videoPlayerVideo = null;
        }
    }
});

export const {addNowPlayingMovies, addTrendingMovies, addTopRatedMovies, addPopularMovies,addTrendingTVShows, addUpComingMovies, addTrailerVideo, toggleTrailerVideoVolume, addVideoPlayerVideo, removeVideoPlayerVideo} = moviesSlice.actions;

export default moviesSlice.reducer;