import { VideoItem } from './types';

// Using Blender Foundation Open Movies.
// These are Creative Commons and guaranteed to allow embedding everywhere.
export const INITIAL_DATA: VideoItem[] = [
  {
    id: 1,
    imageUrl: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg", 
    youtubeId: "aqz-KE-bpKQ", // Big Buck Bunny
    startAt: 0,
    title: "Big Buck Bunny"
  },
  {
    id: 2,
    imageUrl: "https://img.youtube.com/vi/WhWc3b3KhnY/maxresdefault.jpg", 
    youtubeId: "WhWc3b3KhnY", // Spring
    startAt: 0,
    title: "Spring"
  },
  {
    id: 3,
    imageUrl: "https://img.youtube.com/vi/SkVqJ1SGeL0/maxresdefault.jpg",
    youtubeId: "SkVqJ1SGeL0", // Caminandes 3: Llamigos
    startAt: 0,
    title: "Caminandes 3"
  },
  {
    id: 4,
    imageUrl: "https://img.youtube.com/vi/mN0zPOpADL4/maxresdefault.jpg", 
    youtubeId: "mN0zPOpADL4", // Agent 327: Operation Barbershop
    startAt: 0,
    title: "Agent 327"
  },
  {
    id: 5,
    imageUrl: "https://img.youtube.com/vi/hom951lLS-c/maxresdefault.jpg",
    youtubeId: "hom951lLS-c", // Sintel
    startAt: 0,
    title: "Sintel"
  }
];

export const YOUTUBE_OPTS = {
  height: '100%',
  width: '100%',
  playerVars: {
    autoplay: 1,
    controls: 0,
    modestbranding: 1,
    rel: 0,
    showinfo: 0,
    iv_load_policy: 3,
    fs: 0,
  },
};