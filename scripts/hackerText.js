const fs = require('fs');

class hackerText{

    constructor(width,height){
        this.width = width;
        this.height = height;
        this.lineCounter = 0;
        this.text = new Array(height);
        for(let i = 0; i < height; i++){
            this.text[i] = new Array(width);
        }
        fs.readFile('sampleText.txt', 'utf-8', (err, data) => {
            if (err) throw err;

            // Converting Raw Buffer to text
            // data using tostring function.
            this.sampleText = (data.split(/\r?\n*s\r?\n/)).split("\n");
        })
    }

    Start(startString) {
        let start2DArr = this.stringTo2DCharArr(startString);
        this.lineCounter += start2DArr.length;
        for (let i = 0; i < start2DArr.length; i++) {
            for (let j = 0; j < start2DArr[0].length; j++) {
                this.text[i][j] = start2DArr[i][j];
            }
        }
    }

    shiftUp(){
        //shifts all text one line upwards
        for(let i = 0; i < this.height - 1; i++){
            for(let j = 0; i < this.width; j++){
                this.text[i][j] = this.text[i+1][j];
            }
        }
    }

    stringToCharArr(string){
        return Array.from(string);
    }

    //!!!!!!! check cuz might not work
    stringTo2DCharArr(string){
        string.toString().split(" ");
        return (string.toString().split(/\r?\n/)).map(this.stringToCharArr);
    }

    Update(){
        //leave new line between old code and new code
        if(this.lineCounter >= this.height) {
            this.shiftUp();
        } else {
            this.lineCounter++;
        }

        let hack = this.stringTo2DCharArr(this.sampleText[Math.random()*this.sampleText.length]);
        for (let i = 0; i < hack.length; i++) {
            //leave new line between old code and new code
            if(this.lineCounter >= this.height - 1) {
                this.shiftUp();
            } else {
                this.lineCounter++;
            }

            for (let j = 0; j < Math.min(this.width, hack[i].width); j++) {
                this.text[Math.min(this.lineCounter,this.height-1)][j] = hack[i][j];
            }
            if(hack[i].length > this.width){
                //leave new line between old code and new code
                if(this.lineCounter >= this.height) {
                    this.shiftUp();
                } else {
                    this.lineCounter++;
                }
                for (let j = 0; j < hack.width - this.width, hack[i].width; j++) {
                    this.text[Math.min(this.lineCounter,this.height-1)][j] = hack[i][this.width + j];
                }
            }
        }
    }

    GetText(){
        return this.text;
    }

}