/*
MioSays Discord Bot v2.5.0
For use mainly with The Rice Fields
https://github.com/Dropkick500
MioSays shell program courtesy of Keptan
https://github.com/keptan/MioSays
*/
const exec = require("child_process").execSync;   //execSync used for interacting with the shell program
const fs = require('fs');
const Discord = require("discord.js");   //Base Discord API

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

const prefix = ("miosays ");
const prefix2 = ("mioquote");
const prefix3 = ("mioreply");   //Setting Prefixes
const prefix4 = ("miohelp");
const prefix5 = ("miofortune");
const prefix6 = ("mio8ball");
const prefix7 = ("check");
const prefix8 = ("wonderful");
const prefix9 = ("happy");

const ballOpts = ["It is certain", "It is decidedly so", "Without a doubt", "Yes, definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy, try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Dont count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very Doubtful"];

var currentDate = '[' + new Date().toUTCString() + ']';   //Sets Timestamp
var stLength = 0;
var precurrentChannel = "";    //Channel name variable initialization

client.on("ready", () => {
  console.log( currentDate + ' Bot Running.');
  client.user.setActivity("Janken With Yuuko. Type 'miohelp'");
});

//client.on("messageCreate", (message) => {
client.on("messageCreate", async message => {
  client.user.setActivity("Janken With Yuuko. Type 'miohelp'"); //Re-send status, which can disappear under certain circumstances
  if(message.guild == null) {   //Checks if DMs, since DMs have no guild
    currentChannel = message.author.tag; //if the message is contained within a DM designate author tag as filename
  }                                     //else designate server name as filename
  else{ 
    precurrentChannel = message.guild.name;    //precurrentChannel is the current server name unsanitized
    if (precurrentChannel.includes(" ")) {
      var currentChannel = precurrentChannel.replace(/ /g, "+");    // global regex function replaces all spaces with pluses
    }
    else {
      var currentChannel = precurrentChannel;   //If requirements are not met, no sanitization is needed and precurrentChannel is pushed to currentChannel
    }
  }
  var preCommand = message.content;
  var command = preCommand.substring(0, 10).toLowerCase(); //takes the prefix length and makes case insensitive

  if (command.startsWith(prefix)) {    //miosays
    var args = message.content.slice(prefix.length).trim().split(",").toString();   //Separates the message itself from the prefix and turns the array into a string
    stLength = args.length;
    if(message.guild == null){
      console.log ( currentDate + ' ' + message.author.tag + ': miosays: ' + args);
    }
    else{
      console.log ( currentDate + ' ' + message.author.tag + ': miosays: ' + args + " on server '" + message.guild.name + "'");
    }
    fs.writeFileSync('s.txt', args, function (err) {
      if (err) throw err;
      console.log('s.txt Written'); //Writes Arguments to a file
    });
    code = exec('cat s.txt | ./mioSays.sh generated/'+ currentChannel +'.png');   //Pushes argument to the bash script
    message.channel.send( {
      files: [
        "generated/"+ currentChannel +".png" 
      ]
    });
  };

  if (command.startsWith(prefix2)) {    //mioquote
    console.log ( currentDate + ' ' + message.author.tag + ': mioquote');
    code = exec('fortune mioquotes | ./mioSays.sh generated/fortune.png');
    message.channel.send( {
      files: [
        "generated/fortune.png"
      ]
    });
  };

  if (command.startsWith(prefix3)) {   //mioreply
    if (message.type == 19) {                   //Verifies that the message is replying to something
      var ref = await message.fetchReference(); //Finds message to which the command message refers
      var reply = ref.content;                  //Puts content into a var
      if(message.guild == null){
        console.log ( currentDate + ' ' + message.author.tag + ': mioreply: ' + reply);
      }
      else{
        console.log ( currentDate + ' ' + message.author.tag + ': mioreply: ' + reply + " On Server '" + message.guild.name + "'");
      }
      fs.writeFileSync('s.txt', reply, function (err) {
      if (err) throw err;
      console.log('s.txt Written');
      });
      code = exec('cat s.txt | ./mioSays.sh generated/'+ currentChannel +'.png');
      message.channel.send( {
        files: [
          "generated/"+ currentChannel +".png" 
        ]
      });
    }
  }

  if (command.startsWith(prefix4)) {   //miohelp
    console.log ( currentDate + ' ' + message.author.tag + ': miohelp');
    message.channel.send("```miosays: Make Mio say something.\nmioquote: Make Mio say something pseudorandom.\nmioreply: Reply to someone else's message with this to make Mio say what they said.\nmiohelp: Display this message.\nmiofortune: Make Mio say something pseudorandom, Unix style.\nmio8ball: Shake Mio and she will answer your question.\ncheck: Lists your Discord post id. Check those digits!\nwonderful: Have a wonderful day!\nhappy: Have a happy day!```");
  };

  if (command.startsWith(prefix5)) {    //miofortune
    console.log ( currentDate + ' ' + message.author.tag + ': miofortune');
    code = exec('fortune | ./mioSays.sh generated/ufortune.png');
    message.channel.send( {
      files: [
        "generated/ufortune.png"
      ]
    });
  };

  if (command.startsWith(prefix6)) {   //mio8ball
    console.log ( currentDate + ' ' + message.author.tag + ': mio8ball');
    var random = Math.floor(Math.random() * ballOpts.length);
    code = exec('echo ' + ballOpts[random] + ' | ./mioSays.sh generated/8ball.png');
    message.channel.send( {
      files: [
        "generated/8ball.png"
      ]
    });
  }

  if (command.startsWith(prefix7)) {    //Dubs Checkem Feature, aka sends message id
    message.channel.send(message.id);
    console.log(currentDate + ' ' + message.author.tag + ': check ');
  };

  if (command.startsWith(prefix8)) {   //wonderful
    console.log ( currentDate + ' ' + message.author.tag + ': Have a Wonderful Day!');
    message.channel.send( {
      files: [
        "static/wonderful.png"
      ]
    });
  };

  if (command.startsWith(prefix9)) {   //happy
    console.log ( currentDate + ' ' + message.author.tag + ': Have a Happy Day!');
    message.channel.send( {
      files: [
        "static/happy.png"
      ]
    });
  }

});

client.login("NjUwMjE5MTUzNzM4ODI1NzMw.Gd5NcR.gbRhuOxXbgCKSfdU97NFykH5fXHykJI92XXf74"); //App token. Remove upon git commit.
