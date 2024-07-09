export default function TSynth() {
    return (
        <>
            <h2> What is TSynth?</h2>
            <p>
                <strong>TSynth</strong> is a digital synthesizer I developed for
                the web. It offers all the features you'd expect from a modern
                synth, including two oscillators, a fully controllable LFO, an
                envelope, and a filter. You can connect it to MIDI devices,
                record and download your sessions, and choose from multiple
                themes.
            </p>
            <img src="/tsynthgif.gif"></img>
            <h2>How was it built?</h2>

            <p>
                <strong>TSynth</strong> was built using React, with{" "}
                <a href="https://github.com/pmndrs/zustand">Zustand</a> handling
                state management. For the synthesizer, I utilized JavaScript
                Audio Worklets, providing complete control over the oscillator.
            </p>
        </>
    );
}
