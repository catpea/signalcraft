 
Attributes change over time: SVG animate can change SVG attributes over time, for instance, changing color, position, rotation and more.
<svg width="100%" height="100%" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50%" cy="50%" r="30" fill="red">
    <animate attributeName="fill" values="red;green;blue;red" dur="2s" repeatCount="indefinite" />
  </circle>
</svg>
This will change the circle's color over 2 seconds from red to green to blue and then repeats.

Animating along a path: This is somewhat similar to the "ant trail" animation, but instead of simply moving dashes along a line, we can make an entire SVG element follow a path.
<svg width="800px" height="600px" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 Q 95 10 180 80" stroke="black" fill="transparent" id="motionPath"/>

  <circle r="5" fill="black">
    <animateMotion dur="2s" repeatCount="indefinite">
      <mpath href="#motionPath"/>
    </animateMotion>
  </circle>
</svg>
In this animation, the circle element moves smoothly along the path defined by the "motionPath" element.

Animate Transformations: You can animate transformations like scale, rotation, translate and skew.
<svg xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="100" height="100">
       <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="2s" repeatCount="indefinite"/>
    </rect>
</svg>
This will create a rotating square.

Animated line drawing: This is a neat trick where you can make it appear as if the SVG line is being drawn live.
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <path d="M10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent" stroke-width="2" stroke-dasharray="0 0 0 1000">
    <animate attributeName="stroke-dasharray" values="0,0,1000,0; 1000,0,0,0" dur="5s" repeatCount="indefinite"/>
  </path>
</svg>
This trick uses the animated change of stroke-dasharray to create the effect that the line is drawn over time.

These kind of animations can enrich and interactively engage content on the web, making it more appealing to the users.
