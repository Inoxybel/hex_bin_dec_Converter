export default class Converter {
    /* Functions to convert a data type to another */

    /* Decimal to Binary */
    decToBin(dec){
        let bin = '';

        if(dec == 0)
        {
            return "0000";
        }
        while(dec > 0)
        {
            if(dec % 2 == 0)
                bin += '0';
            else
                bin += '1';

            if(dec / 2 > 1)
                dec = parseInt((dec / 2), 10);
            else
                dec -= 1;
        }
        if(bin < 4){
            for(let i = bin.length; i < 4; i++){
                bin = bin+'0';
            }
        }

        return bin.split("").reverse().join("");
    }

    /* Binary to Decimal */
    binToDec(bin){
        let binLength = bin.length-1;
        let tmp = binLength;
        let dec = 0;
        
        for(let i = 0; i <= binLength; i++){
            if(bin[i] == '1')
                dec += 2 ** tmp;

            tmp--;            
        }

        return dec;
    }

    /* Binaty to Hexadecimal */
    binToHex(bin){
        while(bin.length % 4 != 0)
        {
            bin = "0"+bin;
        }

        let binList = bin.match(/.{1,4}/g);
        let hexCharacters = '0123456789ABCDEF';
        let hex = '';

        for(let i = 0; i < binList.length; i++)
        {
            hex += hexCharacters[this.binToDec(binList[i])];
        }

        return hex;
    }

    /* Hexadecimal to Binary */
    hexToBin(hex){
        let hexLength = hex.length;
        let bin = '';
        let hexCharacters = '0123456789ABCDEF';

        for(let i = 0; i < hexLength; i++)
        {
            bin += this.decToBin(hexCharacters.indexOf(hex[i],0));
        }

        return bin;
    }

}