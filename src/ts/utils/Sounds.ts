class Sounds {
    motorAudioContext: AudioContext
    osc: {
        motor: OscillatorNode
    }
    
    allowSounds: boolean = true

    playing: boolean = false
    started: boolean = false;
    
    constructor() {
        this.motorAudioContext = new AudioContext();
        this.osc = {
            motor: this.motorAudioContext.createOscillator()
        }

        this.osc.motor.type = "triangle";
        this.osc.motor.frequency.value = 0;
        this.osc.motor.connect(this.motorAudioContext.destination);

    }

    startAll() {
        if (this.started) return;
        
        this.osc.motor.start();

        this.playing = true;
        this.started = true;
    }

    setOscFrequency(oscName: keyof Sounds["osc"], frequency: number) {
        if (this.allowSounds)
            this.osc[oscName].frequency.value = frequency;
        else
            this.osc[oscName].frequency.value = 0;
    }
}
export default new Sounds();