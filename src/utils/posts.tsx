import { create } from "zustand";
import TrackRack from "../content/TrackRack";
import TSynth from "../content/TSynth";
import PianoRoll from "../content/PianoRoll";
import SymmetryArt from "../content/SymmetryArt";
import WebEQ from "../content/WebEQ";
import SoundSeer from "../content/SoundSeer";

export type PostSlug = keyof typeof posts;
export type Post = {
    title: string;
    image: string;
    description: string;
    content: JSX.Element;
    github?: string;
    website?: string;
};

type PostStore = {
    post: PostSlug;
    setPost: (post: PostSlug) => void;
};

export const usePostStore = create<PostStore>((set) => ({
    post: "trackrack",
    setPost: (post) => {
        // const url = new URL(window.location.href);
        // url.searchParams.set("post", post);
        // window.location.replace(url.toString());

        set(() => {
            return { post };
        });
    },
}));

export const usePost = () => usePostStore((state) => posts[state.post]);

export const posts = {
    trackrack: {
        title: "TrackRack",
        image: "/trackrack.png",
        description:
            "A digital workspace for real-time music collaboration, sharing, and editing of song elements.",
        content: <TrackRack />,
        github: "https://github.com/theobourgeois/TrackRack",
    },
    tsynth: {
        title: "TSynth",
        image: "/tsynth.png",
        description:
            "A digital workspace for real-time music collaboration, sharing, and editing of song elements.",
        content: <TSynth />,
        website: "https://tsynth.theobourgeois.com/",
        github: "https://github.com/theobourgeois/TSynth",
    },
    pianoroll: {
        title: "PianoRoll",
        image: "/pianoroll.png",
        description:
            "A digital workspace for real-time music collaboration, sharing, and editing of song elements.",
        content: <PianoRoll />,
        github: "https://github.com/theobourgeois/PianoRoll",
        website: "https://pianoroll.netlify.app/",
    },
    symmetryart: {
        title: "SymmetryArt",
        image: "/symmetryart.png",
        description:
            "A digital workspace for real-time music collaboration, sharing, and editing of song elements.",
        content: <SymmetryArt />,
        github: "https://github.com/theobourgeois/SymmetryArt",
        website: "https://symmetry-art.netlify.app/",
    },
    webeq: {
        title: "WebEQ",
        image: "/webeq.png",
        description:
            "A digital workspace for real-time music collaboration, sharing, and editing of song elements.",
        content: <WebEQ />,
        github: "https://github.com/theobourgeois/WebEq",
        website: "https://web-eq.netlify.app/",
    },
    soundseer: {
        title: "SoundSeer",
        image: "/soundseer.png",
        description:
            "A digital workspace for real-time music collaboration, sharing, and editing of song elements.",
        content: <SoundSeer />,
        github: "https://github.com/theobourgeois/SoundSeer",
        website: "https://soundseer.netlify.app/",
    },
};
