const Eris = require("eris");
const BotData = require("../PrivateData/BotData.json");
var bot = new Eris(BotData.OtamuBot);
var game;


bot.on("ready", function () {
    console.log("Ready!");
});


bot.on("messageCreate", function (msg) {
    if (msg.content.charAt(0) === "!") {
        var command = new CCommand(msg.content);
        if (command.token[0]=="game"){
            game = new CGame();
            bot.createMessage(msg.channel.id, game.createGameBoard(game.arrangement));
        }else if(command.token[0]=="set"){
            var x= Number(command.token[1])-1;
            var y= Number(command.token[2])-1;
            var c= Number(command.token[3]);          
            game.arrangement[y*8+x]=c;
            bot.createMessage(msg.channel.id, game.createGameBoard(game.arrangement));            
        }else if(command.token[0]=="crime"){
            bot.createMessage(msg.channel.id, "https://cdn.pixabay.com/photo/2017/10/09/08/38/chestnut-2832781_960_720.png");                        
        }
    }
});
bot.connect();



class CGame {
    constructor() {
        this.characterMap = this.getCharacterMap();
        this.arrangement = this.createArrangement();
    }

    createArrangement() {
        var Arrangement = new Array(64);
        Arrangement[3*8+3]=0;
        Arrangement[3*8+4]=1;
        Arrangement[4*8+3]=1;
        Arrangement[4*8+4]=0;
        
        return Arrangement
    }

    createGameBoard(Arrangement) {
        var str = "";
        for (var ih = 0; ih < 8; ih++) {
            for (var iw = 0; iw < 8; iw++) {
                var i = ih * 8 + iw;
                str = str + this.characterMap.get(Arrangement[i]);
            }
            str = str + "\n"
        }
        return str;
    }

    getCharacterMap() {
        var map = new Map();
        map.set(undefined, ":large_blue_diamond:  ")
        map.set(0, ":black_circle: ")
        map.set(1, ":white_circle: ")
        return map;
    }
}

class CCommand {
    constructor(str) {
        this.commandStr = str;
        this.token = this.getCommandArray();
    }
    getCommandArray() {
        var str = this.commandStr;
        var strArray = str.split(" ");
        strArray[0] = strArray[0].slice(1);
        return strArray;
    }
}