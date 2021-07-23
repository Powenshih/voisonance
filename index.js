let prompts = [
  "_____.",
  "_____?",
  "_____!",
  "_____, ___.",
  "___",
  "My voice",
  "___...",
  "___!",
  "_____ sounds like?",
  "_____",
  "_____ ___ _____"
];

let promptFloats = [];
let wW, wH;
let mic, vol;

function setup() {
  wW = windowWidth;
  wH = windowHeight;
  createCanvas(wW, wH);

  for (let i = 0; i < prompts.length; i++) {
    promptFloats[i] = new promptFloat(prompts, i);
  }
  
  // the mic is not used here but this is just to initiate the audio context
  // and for users to allow the microphone.
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  sceneIntro();
}

function mouseReleased() {
  userStartAudio(); // https://p5js.org/reference/#/p5/userStartAudio
  window.open("sketch.html", "_self");
}

function sceneIntro() {
  background(25);

  for (let i = 0; i < promptFloats.length; i++) {
    promptFloats[i].float();
  }

  fill(238,255,65);
  textAlign(CENTER, CENTER);
  textSize(55);
  text(
    "VOISONANCE",
    wW / 4,
    wH / 4 - 40,
    wW / 2,
    wH / 2
  );
  textSize(20);
  text("Po-Wen Shih | Thesis | IMA Lowres 2021", wW / 4, wH / 4, wW / 2, wH / 2);
  textSize(15);
  // text(
  //   "- click to enable recording -",
  //   wW / 4,
  //   wH / 2-60,
  //   wW / 2,
  //   wH / 2
  // );
      text(
    "Click to allow voice recording",
    wW / 4,
    wH / 2,
    wW / 2,
    wH / 2
  );
     text(
    "< Your voice-sound will live in this sound experience temporarily >",
    wW / 4,
    wH / 2+30,
    wW / 2,
    wH / 2
  );
}

class promptFloat {
  constructor(prompt, idx) {
    this.pos = createVector(random(30, wW - 30), random(wH));
    this.vel = createVector(0, random(0.5, 2.5));
    this.acc = createVector();
    this.prompt = prompt;
    this.idx = idx;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    if (this.pos.y > wH) {
      this.pos.y = random(0, -wH);
    }
  }
  display() {
    noStroke();
    fill(255, map(this.pos.y, 0, wH, wH * 0.25, 0));
    textFont("Montserrat");
    textSize(20);
    textAlign(CENTER, CENTER);
    text(this.prompt[this.idx], this.pos.x, this.pos.y);
  }

  float() {
    this.update();
    this.display();
  }
}

function windowResized() {
  resizeCanvas(wW, wH);
  for (let i = 0; i < promptFloats.length; i++) {
    promptFloats[i].pos = createVector(random(30, width - 30), random(height));
  }
}

/* global p5 ml5 alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult */
