// dimensions.ts
import { Dimensions } from 'react-native';

// define all the dimensions used in the app
class SDims {
    screenHeight: number;
    screenWidth: number;
    D1px: number;
    D2px: number;
    D5px: number;
    D10px: number;
    D12px: number;
    D20px: number;
    D30px: number;
    D40px: number;
    D50px: number;
    D60px: number;
    D70px: number;
    D80px: number;
    D90px: number;
    D100px: number;
    D200px: number;

    Height5p: number;
    Height10p: number;
    Height20p: number; HeightTopSection: number;
    Height30p: number;
    Height40p: number;
    Height47p: number;
    Height48p: number;
    Height49p: number;
    Height50p: number;
    Height60p: number;
    Height70p: number; HeightCentralSection: number;
    Height80p: number;
    Height90p: number;
    Height100p: number;
    Height1_3f: number;
    Height2_3f: number;
    Height1_4f: number;
    Height3_4f: number;
    Height1_8f: number;
    
    Width2dot5p: number;
    Width5p: number;
    Width10p: number;
    Width20p: number;
    Width30p: number;
    Width40p: number;
    Width50p: number;
    Width60p: number;
    Width70p: number;
    Width80p: number;
    Width90p: number;
    Width100p: number;
    Width1_3f: number;
    Width2_3f: number;
    Width1_4f: number;
    Width3_4f: number;

    // initialise all dimensions
    constructor() {
        this.screenHeight = Dimensions.get('window').height;
        this.screenWidth = Dimensions.get('window').width;

        // initialise all properties

        // new
        this.D1px = this.screenWidth / 1440;
        this.D2px = this.screenWidth / 720;
        this.D5px = this.screenWidth / 288;
        this.D10px = this.screenWidth / 144;
        this.D12px = this.screenWidth / 96;
        this.D20px = this.screenWidth / 72;
        this.D30px = this.screenWidth / 48;
        this.D40px = this.screenWidth / 36;
        this.D50px = this.screenWidth / 28.8;
        this.D60px = this.screenWidth / 24;
        this.D70px = this.screenWidth / 20.57;
        this.D80px = this.screenWidth / 18;
        this.D90px = this.screenWidth / 16;
        this.D100px = this.screenWidth / 14.4;
        this.D200px = this.screenWidth / 7.2;

        // old
        this.Height5p = this.screenHeight * 0.05;
        this.Height10p = this.screenHeight * 0.1;
        this.Height20p = this.screenHeight * 0.2; this.HeightTopSection = this.screenHeight * 0.2;
        this.Height30p = this.screenHeight * 0.3;
        this.Height40p = this.screenHeight * 0.4;
        this.Height47p = this.screenHeight * 0.47;
        this.Height48p = this.screenHeight * 0.48;
        this.Height49p = this.screenHeight * 0.49;
        this.Height50p = this.screenHeight * 0.5;
        this.Height60p = this.screenHeight * 0.6;
        this.Height70p = this.screenHeight * 0.7; this.HeightCentralSection = this.screenHeight * 0.7;
        this.Height80p = this.screenHeight * 0.8;
        this.Height90p = this.screenHeight * 0.9;
        this.Height100p = this.screenHeight * 1;
        this.Height1_3f = this.screenHeight / 3;
        this.Height2_3f = (this.screenHeight / 3) * 2;
        this.Height1_4f = this.screenHeight / 4;
        this.Height3_4f = (this.screenHeight / 4) * 3;
        this.Height1_8f = this.screenHeight / 8;

        this.Width2dot5p = this.screenWidth * 0.025;
        this.Width5p = this.screenWidth * 0.05;
        this.Width10p = this.screenWidth * 0.1;
        this.Width20p = this.screenWidth * 0.2;
        this.Width30p = this.screenWidth * 0.3;
        this.Width40p = this.screenWidth * 0.4;
        this.Width50p = this.screenWidth * 0.5;
        this.Width60p = this.screenWidth * 0.6;
        this.Width70p = this.screenWidth * 0.7;
        this.Width80p = this.screenWidth * 0.8;
        this.Width90p = this.screenWidth * 0.9;
        this.Width100p = this.screenWidth * 1;
        this.Width1_3f = this.screenWidth / 3;
        this.Width2_3f = (this.screenWidth / 3) * 2;
        this.Width1_4f = this.screenWidth / 4;
        this.Width3_4f = (this.screenWidth / 4) * 3;
    }
}

// Creating a singleton instance
const instance = new SDims();

// Exporting the singleton instance
export default instance;