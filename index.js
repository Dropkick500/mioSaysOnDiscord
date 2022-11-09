/*
MioSays Discord Bot v1.3
https://github.com/Dropkick500
MioSays shell program courtesy of Keptan
https://github.com/keptan/MioSays
*/
const exec = require("child_process").execSync;   //execSync used for interacting with the shell program
const fs = require('fs');
const Discord = require("discord.js");   //Base Discord API
const client = new Discord.Client({ intents: ["GUILDS", "DIRECT_MESSAGES", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

const prefix = ("miosays ");
const prefix2 = ("mioquote");   //Setting Prefixes
const prefix3 = ("miohelp");
const prefix4 = ("wonderful");
const prefix5 = ("check");
const prefix6 = ("happy");

var currentDate = '[' + new Date().toUTCString() + ']';   //Sets Timestamp variable
var stLength = 0;
var precurrentChannel = "";    //Channel name variable initialization

client.on("ready", () => {
  console.log( currentDate + ' Bot Running.');
  client.user.setActivity("Janken With Yuuko. Type 'miohelp'");
});

client.on("messageCreate", (message) => {
  client.user.setActivity("Janken With Yuuko. Type 'miohelp'");
  if(message.guild == null) {   //Checks if DMs, since DMs have no guilds
    currentChannel = message.author.tag; //if the message is contained within a DM designate author tag as filename
  }
  else{   //else designate server name as filename 
    precurrentChannel = message.guild.name;    //precurrentChannel is the current server name unsanitized
    if (precurrentChannel.includes(" ")) {
      var currentChannel = precurrentChannel.replace(/ /g, "+");    // "/ /g" is a global regex, function replaces all spaces with pluses
    }
    else {
      var currentChannel = precurrentChannel;   //If requirements are not met, no sanitization is needed and precurrentChannel is pushed to currentChannel
    }
  }
  var preCommand = message.content;
  var command = preCommand.substring(0, 9).toLowerCase(); //takes the prefix length and makes case insensitive
  if (command.startsWith(prefix)) { 
    var args = message.content.slice(prefix.length).trim().split(",").toString();   //Separates the message itself from the prefix and turns the array into a string
    stLength = args.length;   //Measures string length
    if(message.guild == null){
      console.log ( currentDate + ' ' + message.author.tag + ': Generating image that says: ' + args);
    }
    else{
      console.log ( currentDate + ' ' + message.author.tag + ': Generating image that says: ' + args + " On Server '" + message.guild.name + "'");
    }
    fs.writeFileSync('s.txt', args, function (err) {
      if (err) throw err;
      console.log('s.txt Written'); //Writes Arguments to a file
    });
    code = exec('cat s.txt | ./mioSays.sh '+ currentChannel +'.png');   //Pushes argument file to the terminal command
    message.channel.send( {
      files: [
        "./"+ currentChannel +".png" 
      ]
    });
  };
  if (command.startsWith(prefix2)) {
    console.log ( currentDate + ' ' + message.author.tag + ': Generating Quote');
    code = exec('/usr/games/fortune mioquotes | ./mioSays.sh fortune.png');
    message.channel.send( {
      files: [
        "./fortune.png"
      ]
    });
  };
  if (command.startsWith(prefix3)) {
    console.log ( currentDate + ' ' + message.author.tag + ': Sending HelpFile');
    message.channel.send( {
      files: [
        "./help.png"
      ]
    });
  };
  if (command.startsWith(prefix4)) {
    console.log ( currentDate + ' ' + message.author.tag + ': Have a Wonderful Day!');
    message.channel.send( {
      files: [
        "wonderful.png"
      ]
    });
  };
  if (command.startsWith(prefix6)) {
    console.log ( currentDate + ' ' + message.author.tag + ': Have a Happy Day!');
    message.channel.send( {
      files: [
        "happy.png"
      ]
    });
  }
  if (command.startsWith(prefix5)) {
    message.channel.send(message.id);
    console.log(currentDate + ' ' + message.author.tag + ' Is checking them digits.');
  };
});

client.login(""); //Place bot token here.
