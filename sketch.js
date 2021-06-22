let prompts = [
    "NO. I don't like my voice because it doesn't sound like me.",
    "Hothagellothago! Whothagat othagis yothagour nothagame?",
    "If I speak slower, much slower, my tone sounds lower than usual.",
    "Everyday I exercise my voice just like I stretch my body.",
    "Over the years my voice changes and I appreciate the way as I am getting older",
    "My voice sounds amazing because it changes from time to time.",
    "The words I spoke to myself comfort me, encourage me and hurt me.",
    "Welcome to VOISONANCE. Say something, show what your voice can do.",
    "My voice is important because it tells story about who I am and where I am from.",
    "My voice reveals my emotion in an interesting and unexpected way.",
    "I always think that my voice is a part of my body and my identity.",
    "There is something unique about my voice that reminds me about my mom.",
    "Well. Although my voice sounds strange to me but it still belongs to me.",
    "I always feel that my voice betrays me when I need it the most."
  ];
  
  let promptFloats = [];
  
  let g1, g2, wW, wH;
  
  let mic, fft, filter, vol;
  let state = 0;
  
  let speedSpeed = 0.1;
  let volumeSpeed = 0.1;
  let panningSpeed = 0.1;
  
  let voices = []; // An array to store recorded loops
  
  let voice, recorder;
  // let changeVoice, recorder2;
  
  let c1 = 255;
  let c2 = 255;
  let c3 = 255;
  
  let volume, speed, panning;
  
  let sDirection, vDirection, pDirection;
  
  let startTime = 8000; // ten second transition to next scene
  
  let pastTime;
  
  function setup() {
    wW = windowWidth;
    wH = windowHeight;
    createCanvas(wW, wH);
    // background(220);
  
    for (let i = 0; i < prompts.length; i++) {
      promptFloats[i] = new promptFloat(prompts, i);
    }
  
    mic = new p5.AudioIn();
    mic.start();
  
    voice = new p5.SoundFile();
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);
  
    fft = new p5.FFT(0.5, 256);
    fft.setInput(mic);
  
    volume = 1;
    speed = 1;
    panning = 0;
    sDirection = 1;
    vDirection = 1;
    pDirection = 1;
  }
  
  function draw() {
    vol = mic.getLevel();
  
    if (state === 0 && vol <= 0.05) {
      sceneIntro();
    }
  
    if (state === 0 && vol > 0.05) {
      console.log("Voice volume trigger", vol);
      console.log("Now voice recording");
      recordSound();
  
      state++;
      console.log("current time", millis());
      pastTime = millis();
      console.log("enttring recording page", millis());
    }
  
    // let startTime = pastTime + millis();
  
    if (state === 1) {
      sceneRecording(); // recording
  
      if (millis() > pastTime + startTime) {
        recordStop();
        state++;
        pastTime = millis();
        console.log("entering transition page", millis());
      }
    }
    if (state === 2) {
      sceneReady();
      // recordStop();
  
      if (millis() > pastTime + startTime) {
        recordLoop();
        state++;
        pastTime = millis();
        console.log("entering listening page", millis());
      }
    }
    if (state === 3) {
      scenePlay(); // circles
    }
  }
  
  function sceneIntro() {
    background(25);
  
    for (let i = 0; i < promptFloats.length; i++) {
      promptFloats[i].float();
    }
  
    fill(238, 255, 65);
    textAlign(CENTER, CENTER);
    textSize(34.5);
    text("PLEASE SAY A LONG SENTENCE", wW / 4, wH / 4 - 25, wW / 2, wH / 2);
    textSize(20);
    text(
      "You are welcome to say anything or a prompt if you like to",
      wW / 4,
      wH / 4,
      wW / 2,
      wH / 2
    );
    textSize(20);
    text(
      "Speak to start recording voiced sound when you are ready",
      wW / 4,
      wH / 2,
      wW / 2,
      wH / 2
    );
  }
  
  function recordSound() {
    voices.push(voice);
    console.log("voices", voices);
    // console.log(voicedSound);
    recorder.record(voice);
  }
  
  function sceneRecording() {
    g1 = color(63, 191, 191);
    g2 = color(0, 0, 150);
  
    for (let y = 0; y < wH; y++) {
      let g = map(y, 0, wH, 0, 1);
      let newG = lerpColor(g1, g2, g);
      stroke(newG);
      line(0, y, wW, y);
    }
  
    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(255);
    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, 0, width);
      let y = map(waveform[i], -1, 1, 0, height);
      vertex(x, y);
    }
    endShape();
  
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("FINISH YOUR LONG SENTENCE", wW / 4, wH / 4, wW / 2, wH / 2);
    fill(255);
    textSize(20);
    text("(this could be done in countdown...)", wW / 4, wH / 2, wW / 2, wH / 2);
  }
  
  function recordStop() {
    recorder.stop();
  }
  
  function sceneReady() {
    background(25);
    fill(238, 255, 65);
    textAlign(CENTER, CENTER);
    text("In this space", wW / 4, 0, wW / 2, wH / 2);
    textSize(30);
    text(
      "OPENNESS AND IMAGINATION ARE MORE IMPORTANT THAN JUDGEMENT",
      width / 2,
      height / 2
    );
    textSize(20);
    text("(this could be done in countdown...)", wW / 4, wH / 2, wW / 2, wH / 2);
  }
  
  function recordLoop() {
    voice.loop();
    voice.disconnect();
    voice.connect(filter);
  }
  
  function scenePlay() {
    g1 = color(150);
    g2 = color(0);
  
    for (let y = 0; y < wH; y++) {
      let g = map(y, 0, wH, 0, 1);
      let newG = lerpColor(g1, g2, g);
      stroke(newG);
      line(0, y, wW, y);
    }
  
    // let h = map(vol, 0, 1, wH / 2, 0);
  
    noStroke();
  
    let v = map(volume, 0, 0.8, 0, 255); // left volume
    // let v1 = int(map(volume, 0.01, 1, 1, 10), 1, 10);
  
    let s1 = map(speed, -1, 1.5, 760, 160); // middle speed
    let s2 = map(speed, -1, 1.5, -380, 442.5); // middle speed
  
    // let p = map(panning, -1, 1, 50, 300); // right panning
    // let p2 = int(map(panning, -1, 1, -5, 5), -5, 5);
    let pW = map(panning, -1, 1, 0, wW);
    // let pH = int(map(panning, -1, 1, 0, wH), 0, wH);
  
    // let s1 = int(map(speed, -1, 1.5, -2, 10), -2, 10);
  
    // c =255;
    // fill(255, 255, 255,s);
    // ellipse(pW, wH/2, v);
  
    // let ss = map(speed, -1, 1.5, -1, 1.5); // middle speed
    // pW+=ss;
  
    let r = 238;
    let g = 255;
    let b = 65;
  
    if (speed <= 0.15) {
      r = 255;
      b = 255;
    }
  
    fill(r, g, b, v);
    ellipse(pW, wH / 2, s1, s2);
  
    //   if (pW > width - v || pW < v) {
    //   ss = -ss;
    // }
    //   if (p4 > wH - v || p3 < v) {
    //     s = -s;
    //   }
  
    // ellipse(x, y, r*2, r*2);
    // x += xspeed;
    // y += yspeed;
    // if (x > width - r || x < r) {
    //   xspeed = -xspeed;
    // }
    // if (y > height - r || y < r) {
    //   yspeed = -yspeed;
    // }
  
    sound();
  
    fill(255);
    textSize(20);
    text(
      "(thinking about a count down to finish a 90 seconds sound experience)",
      wW / 4,
      wH / 2,
      wW / 2,
      wH / 2
    );
  }
  
  function sound() {
    if (volume < 0) {
      vDirection = 1;
    } else if (volume > 0.8) {
      vDirection = -1;
    }
  
    if (volume < 0.8) {
      volumeSpeed = vDirection * 0.001;
    } else if (volume > 0) {
      volumeSpeed = vDirection * 0.001;
    }
  
    volume += volumeSpeed;
    voice.amp(volume);
    // console.log("volume", volume);
  
    // 6/18 adam's suggestion
    // change the direction when you exceed the bounds
  
    if (speed < -1) {
      sDirection = 1;
    } else if (speed > 1.5) {
      sDirection = -1;
    }
  
    //for each interval multiply desired speedSpeed * direction
    if (speed < 0) {
      speedSpeed = sDirection * 0.001;
    } else if (speed < 0.9) {
      speedSpeed = sDirection * 0.005;
    } else if (speed < 1.1) {
      speedSpeed = sDirection * 0.0001;
    } else {
      speedSpeed = sDirection * 0.005;
    }
  
    speed += speedSpeed;
    voice.rate(speed);
    console.log("speed", speed);
  
    if (panning < -1.0) {
      pDirection = 1;
    } else if (panning > 1.0) {
      pDirection = -1;
    }
  
    if (panning < 1.0) {
      panningSpeed = pDirection * 0.001;
    } else if (panning > -1.0) {
      panningSpeed = pDirection * 0.001;
    }
  
    panning += panningSpeed;
    voice.pan(panning);
    console.log("panning", panning);
  }
  
  class promptFloat {
    constructor(prompt, idx) {
      this.pos = createVector(random(30, wW - 30), random(wH));
      this.vel = createVector(0, random(0.2, 2.5));
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
      textFont("AVENIR");
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
  