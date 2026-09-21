/* The graphite displacement filter that gives the sketch its hand-drawn
   wobble. Referenced by .pencil-grain in globals.css, so it must be present
   in the document for the sketch to look like pencil rather than vector. */

export function PencilFilterDefs() {
  return (
    <svg className="hidden" aria-hidden="true">
      <filter id="pencil-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="1.8"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
